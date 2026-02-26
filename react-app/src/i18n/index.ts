import * as cs from './cs';

type Translations = typeof cs;
type Namespace = keyof Translations;

export function useT<N extends Namespace>(namespace: N): Translations[N] {
  return cs[namespace];
}

export function getT<N extends Namespace>(namespace: N): Translations[N] {
  return cs[namespace];
}
