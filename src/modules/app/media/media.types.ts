// =============================================================================
// Admin Media Module — Types
// =============================================================================

export interface DbMedia {
    id: number;
    filename: string;
    original_name: string;
    storage_path: string;
    mime_type: string;
    file_size: number;
    width: number | null;
    height: number | null;
    alt_text: string | null;
    created_at: string;
    updated_at: string;
}
