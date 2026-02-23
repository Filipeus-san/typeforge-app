import { Required, MinLength, MaxLength, Transform, Custom } from "../../../validator";

export class LoginForm {
    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    email: string = '';

    @Required()
    @MinLength(6)
    password: string = '';
}

export class RegisterForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    firstName: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    lastName: string = '';

    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    @Custom((v: string) => {
        if (!v || !regexTest(v, "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")) return "Neplatny format emailu";
        return null;
    })
    email: string = '';

    @Required()
    @MinLength(6)
    password: string = '';

    @Required()
    passwordConfirm: string = '';
}
