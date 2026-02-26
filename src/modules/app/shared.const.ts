export {
    ProductStatus, PRODUCT_STATUS_LABELS, PRODUCT_STATUS_VARIANTS,
    OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_VARIANTS,
} from "../../shared-keys";

export const CZECH_DIACRITICS_REPLACEMENTS: [string, string][] = [
    ['á', 'a'], ['Á', 'a'], ['č', 'c'], ['Č', 'c'], ['ď', 'd'], ['Ď', 'd'],
    ['é', 'e'], ['É', 'e'], ['ě', 'e'], ['Ě', 'e'], ['í', 'i'], ['Í', 'i'],
    ['ň', 'n'], ['Ň', 'n'], ['ó', 'o'], ['Ó', 'o'], ['ř', 'r'], ['Ř', 'r'],
    ['š', 's'], ['Š', 's'], ['ť', 't'], ['Ť', 't'], ['ú', 'u'], ['Ú', 'u'],
    ['ů', 'u'], ['Ů', 'u'], ['ý', 'y'], ['Ý', 'y'], ['ž', 'z'], ['Ž', 'z'],
];
