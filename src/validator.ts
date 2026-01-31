type ValidatorFn = (value: any) => string | null;
type TransformerFn = (value: any) => any;
type TypeFn = () => void;

const validators = new Map<any, Record<string, ValidatorFn[]>>();
const transformers = new Map<any, Record<string, TransformerFn[]>>();
const typeMetadata = new Map<Function, Record<string, TypeFn>>();

type Constructor<T> = { new (): T };

function addValidator(target: any, propertyKey: string, validator: ValidatorFn) {
  if (!validators.has(target.constructor)) validators.set(target.constructor, {});
  const targetValidators = validators.get(target.constructor)!;
  if (!targetValidators[propertyKey]) targetValidators[propertyKey] = [];
  targetValidators[propertyKey].push(validator);
}

function addTransformer(target: any, propertyKey: string, transformer: TransformerFn) {
  if (!transformers.has(target.constructor)) transformers.set(target.constructor, {});
  const targetTransformers = transformers.get(target.constructor)!;
  if (!targetTransformers[propertyKey]) targetTransformers[propertyKey] = [];
  targetTransformers[propertyKey].push(transformer);
}

// --- Validátory ---
export function MinLength(length: number) {
  return function (target: any, propertyKey: string) {
    addValidator(target, propertyKey, (value: any) =>
      typeof value === "string" && value.length >= length ? null : `Must have at least ${length} characters`
    );
  };
}

export function MaxLength(length: number) {
  return function (target: any, propertyKey: string) {
    addValidator(target, propertyKey, (value: any) =>
      typeof value === "string" && value.length <= length ? null : `Must have at most ${length} characters`
    );
  };
}

export function Required() {
  return function (target: any, propertyKey: string) {
    addValidator(target, propertyKey, (value: any) => {
      if (value === null || value === undefined) return `${propertyKey} is required`;
      if (typeof value === "string" && value.trim() === "") return `Cannot be empty`;
      return null;
    });
  };
}

export function Range(min: number, max: number) {
  return function (target: any, propertyKey: string) {
    addValidator(target, propertyKey, (value: any) => {
      if (typeof value !== "number") return `Must be a number`;
      if (value < min || value > max) return `Must be between ${min} and ${max}`;
      return null;
    });
  };
}

export function Custom(validator: (value: any) => string | null) {
  return function (target: any, propertyKey: string) {
    addValidator(target, propertyKey, validator);
  };
}

// --- Transformátory ---
export function Transform(transformer: TransformerFn) {
  return function (target: any, propertyKey: string) {
    addTransformer(target, propertyKey, transformer);
  };
}

// --- Typ metadata ---
export function Type(typeFn: TypeFn) {
   return function (target: any, propertyKey: string) {
       if (!typeMetadata.has(target.constructor)) typeMetadata.set(target.constructor, {});

      const targetMeta = typeMetadata.get(target.constructor)!;
      if (!targetMeta[propertyKey]) targetMeta[propertyKey] = typeFn;
  };
}


// --- Aplikace transformátorů (rekurzivně) ---
export function applyTransformers(obj: any): any {
  if (!obj || typeof obj !== 'object') return;

  const targetTransformers = transformers.get(obj.constructor) || {};
  for (const [key, fns] of Object.entries(targetTransformers)) {
    let value = obj[key];
    for (const fn of fns) value = fn(value);
    obj[key] = value;
  }

  return obj
}

export class ValidationError {
  constructor(public errors: Record<string, string[]>, public values: Record<string, any>) {
  }
}

// --- Validace (rekurzivně) ---
export function validate(obj: any): boolean {
  if (!obj || typeof obj !== 'object') return false;

  const targetValidators = validators.get(obj.constructor) || {};
  let errors: Record<string, string[]> = {};
  
  for (const [propertyKey, fns] of Object.entries(targetValidators)) {
    const value = obj[propertyKey];
    for (const fn of fns) {
      const result = fn(value);
      if (result) {
        if (!errors[propertyKey]) errors[propertyKey] = [];
        errors[propertyKey].push(result);
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors, obj);
  }
  return true;
}


// --- Mapování plain object → třída (rekurzivně) ---
export function transformValidate<T extends object>(cls: Constructor<T> | undefined, plain: Record<string, any>): T {
  if (!cls || !plain || typeof plain !== 'object') return plain as any;

  const instance = new cls();
  const meta = typeMetadata.get(cls) || {};

  for (const key of Object.keys(plain)) {
    const value = plain[key];

    if (meta[key] && value && typeof value === 'object') {
      const nestedCls = meta[key]() as unknown as Constructor<any>;

      if (Array.isArray(value)) {
        (instance as Record<string, any>)[key] = value.map(v => transformValidate(nestedCls, v));
      } else {
        (instance as Record<string, any>)[key] = transformValidate(nestedCls, value);
      }
    } else {
      (instance as Record<string, any>)[key] = value;
    }
  }

  let transformed = applyTransformers(instance);
  validate(transformed);

  return transformed;
}