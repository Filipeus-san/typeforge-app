import { Required, MinLength, MaxLength, Transform } from "../../../validator";

export class AdminUserForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    first_name: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(100)
    last_name: string = '';

    @Transform((v: string) => v?.trim()?.toLowerCase())
    @Required()
    email: string = '';

    @MinLength(6)
    password: string = '';

    is_admin: string = '';
}
