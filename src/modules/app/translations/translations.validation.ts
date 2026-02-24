import { Required, Transform } from "../../../validator";

export class TranslationForm {
    @Transform((v: string) => v?.trim())
    @Required()
    entity_type: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    entity_id: string = '';

    @Transform((v: string) => v?.trim())
    @Required()
    language: string = '';
}
