export interface DbTranslation {
    id: number;
    entity_type: string;
    entity_id: number;
    language: string;
    field_name: string;
    field_value: string;
    created_at: string;
    updated_at: string;
}

export interface DbTranslationRow extends DbTranslation {
    entity_name: string;
}
