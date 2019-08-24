export function isEmpty(val) {
    return val.trim().length === 0;
}

export function isValidEmail(val) {
    return val.includes('@');
}