import { Required, MinLength, MaxLength, Transform } from "../../../validator";

export class WarehouseForm {
    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(2)
    @MaxLength(200)
    name: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    @MinLength(1)
    @MaxLength(50)
    code: string = '';

    @Transform((v: string) => v?.trim())
    address: string = '';

    status: string = 'active';
}

export class StockMovementForm {
    @Required()
    warehouse_id: string = '';

    @Required()
    product_id: string = '';

    @Required()
    quantity: string = '0';

    @Required()
    type: string = 'receipt';

    @Transform((v: string) => v?.trim())
    note: string = '';
}
