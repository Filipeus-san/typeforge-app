import { Required, MinLength, MaxLength, Transform } from "../../../validator";

export class CustomerForm {
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

    @Transform((v: string) => v?.trim())
    phone: string = '';

    @Transform((v: string) => v?.trim())
    company: string = '';

    @Transform((v: string) => v?.trim())
    shipping_address: string = '';

    @Transform((v: string) => v?.trim())
    billing_address: string = '';

    @Transform((v: string) => v?.trim())
    notes: string = '';

    status: string = 'active';
}
