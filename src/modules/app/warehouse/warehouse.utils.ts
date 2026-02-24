import { CardSection, Icon, escapeHtml, map } from "../../../components";
import { DbWarehouse, WarehouseStatus, WAREHOUSE_STATUS_LABELS, WAREHOUSE_STATUS_VARIANTS, MovementType, MOVEMENT_TYPE_LABELS, MOVEMENT_TYPE_VARIANTS } from "./warehouse.types";
import { DbProduct } from "../shared";
import {
    updateProductTotalStock as repoUpdateProductTotalStock,
    insertStockMovement,
    upsertWarehouseStock,
} from "./warehouse.repository";

export function formatWarehouseDate(dateStr: string): string {
    if (!dateStr || dateStr.length < 10) return '-';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(8, 10);
    const d = Number(day);
    const m = Number(month);
    if (d > 0 && m > 0) return `${d}. ${m}. ${year}`;
    return '-';
}

export function updateProductTotalStock(productId: number): void {
    repoUpdateProductTotalStock(productId);
}

export function recordStockMovement(
    warehouseId: number,
    productId: number,
    quantity: number,
    type: string,
    note: string
): void {
    insertStockMovement(warehouseId, productId, quantity, type, note);
    upsertWarehouseStock(warehouseId, productId, quantity);
    updateProductTotalStock(productId);
}

export function getWarehouseFormContent(request: Request, data?: Record<string, string>, error?: string, isEdit: boolean = false): string {
    return `
        ${error ? `<div class="alert alert-danger mb-4">${escapeHtml(error)}</div>` : ''}
        <form method="post" class="admin-form">
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: "Informace o skladu",
                        children: `
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">N\u00e1zev skladu *</label>
                                    <input type="text" name="name" class="form-control" value="${escapeHtml(data?.name ?? '')}" required placeholder="nap\u0159. Hlavn\u00ed sklad Praha">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">K\u00f3d skladu *</label>
                                    <input type="text" name="code" class="form-control" value="${escapeHtml(data?.code ?? '')}" required placeholder="nap\u0159. SKLAD-1">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Adresa</label>
                                    <textarea name="address" class="form-control" rows="3" placeholder="Cel\u00e1 adresa skladu">${escapeHtml(data?.address ?? '')}</textarea>
                                </div>
                            </div>
                        `
                    })}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: "Nastaven\u00ed",
                        children: `
                            <div class="mb-3">
                                <label class="form-label">Stav</label>
                                <select name="status" class="form-select">
                                    <option value="active" ${(data?.status ?? 'active') === 'active' ? 'selected' : ''}>Aktivn\u00ed</option>
                                    <option value="inactive" ${data?.status === 'inactive' ? 'selected' : ''}>Neaktivn\u00ed</option>
                                </select>
                            </div>
                        `
                    })}
                    ${CardSection({
                        children: `
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn-add w-100 justify-content-center">
                                    ${Icon({ name: isEdit ? 'check-lg' : 'plus-lg' })}
                                    ${isEdit ? 'Ulo\u017eit zm\u011bny' : 'Vytvo\u0159it sklad'}
                                </button>
                                <a href="/admin/warehouse" class="btn btn-outline-tf btn-sm text-center">Zp\u011bt na seznam</a>
                            </div>
                        `
                    })}
                </div>
            </div>
        </form>
    `;
}

export function getMovementFormContent(
    request: Request,
    warehouses: DbWarehouse[],
    products: DbProduct[],
    data?: Record<string, string>,
    error?: string,
    success?: string
): string {
    const preSelectedWarehouse = parseUrlQuery<{ warehouse_id?: string }>(request.query)?.warehouse_id ?? data?.warehouse_id ?? '';

    return `
        ${error ? `<div class="alert alert-danger mb-4">${escapeHtml(error)}</div>` : ''}
        ${success ? `<div class="alert alert-success mb-4">${escapeHtml(success)}</div>` : ''}
        <form method="post" class="admin-form">
            <div class="row g-4">
                <div class="col-md-8">
                    ${CardSection({
                        title: "Pohyb z\u00e1sob",
                        children: `
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Sklad *</label>
                                    <select name="warehouse_id" class="form-select" required>
                                        <option value="">Vyberte sklad</option>
                                        ${map(warehouses, (w) => `
                                            <option value="${w.id}" ${String(preSelectedWarehouse) === String(w.id) ? 'selected' : ''}>
                                                ${escapeHtml(w.name)} (${escapeHtml(w.code)})
                                            </option>
                                        `)}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Produkt *</label>
                                    <select name="product_id" class="form-select" required>
                                        <option value="">Vyberte produkt</option>
                                        ${map(products, (p) => `
                                            <option value="${p.id}" ${String(data?.product_id ?? '') === String(p.id) ? 'selected' : ''}>
                                                ${escapeHtml(p.name)}
                                            </option>
                                        `)}
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Typ pohybu *</label>
                                    <select name="type" class="form-select" required>
                                        <option value="receipt" ${(data?.type ?? 'receipt') === 'receipt' ? 'selected' : ''}>P\u0159\u00edjem</option>
                                        <option value="issue" ${data?.type === 'issue' ? 'selected' : ''}>V\u00fddej</option>
                                        <option value="transfer" ${data?.type === 'transfer' ? 'selected' : ''}>P\u0159evod</option>
                                        <option value="adjustment" ${data?.type === 'adjustment' ? 'selected' : ''}>Korekce</option>
                                    </select>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Mno\u017estv\u00ed (ks) *</label>
                                    <input type="number" name="quantity" class="form-control" value="${escapeHtml(data?.quantity ?? '')}" required>
                                    <small class="text-muted-tf">Kladn\u00e9 = p\u0159\u00edjem, z\u00e1porn\u00e9 = v\u00fddej</small>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Pozn\u00e1mka</label>
                                    <textarea name="note" class="form-control" rows="3" placeholder="Voliteln\u00e1 pozn\u00e1mka k pohybu">${escapeHtml(data?.note ?? '')}</textarea>
                                </div>
                            </div>
                        `
                    })}
                </div>
                <div class="col-md-4">
                    ${CardSection({
                        title: "N\u00e1pov\u011bda",
                        children: `
                            <p class="text-muted-tf small"><strong>P\u0159\u00edjem</strong> \u2014 P\u0159\u00edchod zbo\u017e\u00ed do skladu</p>
                            <p class="text-muted-tf small"><strong>V\u00fddej</strong> \u2014 Expedice zbo\u017e\u00ed ze skladu</p>
                            <p class="text-muted-tf small"><strong>P\u0159evod</strong> \u2014 P\u0159esun mezi sklady</p>
                            <p class="text-muted-tf small mb-0"><strong>Korekce</strong> \u2014 Oprava po inventu\u0159e</p>
                        `
                    })}
                    ${CardSection({
                        children: `
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn-add w-100 justify-content-center">
                                    ${Icon({ name: 'check-lg' })}
                                    Zaznamenat pohyb
                                </button>
                                <a href="/admin/warehouse" class="btn btn-outline-tf btn-sm text-center">Zp\u011bt na sklady</a>
                            </div>
                        `
                    })}
                </div>
            </div>
        </form>
    `;
}

export function getWarehouseStatusLabel(status: string): string {
    return WAREHOUSE_STATUS_LABELS[status as WarehouseStatus] ?? status;
}

export function getWarehouseStatusVariant(status: string): 'success' | 'warning' {
    return WAREHOUSE_STATUS_VARIANTS[status as WarehouseStatus] ?? 'warning';
}

export function getMovementTypeLabel(type: string): string {
    return MOVEMENT_TYPE_LABELS[type as MovementType] ?? type;
}

export function getMovementTypeVariant(type: string): 'success' | 'danger' | 'info' | 'warning' {
    return MOVEMENT_TYPE_VARIANTS[type as MovementType] ?? 'info';
}
