export function getMapFromArray<T>(arr: T[], keys: (keyof T)[]): Map<string, T> {
    const result = new Map()
    arr.forEach(item => {
        const keyValues = keys.map(key => item[key]).join("_");
        result.set(keyValues, item); // Puedes adaptar el valor a lo que necesites
    });
    return result;
}


export function getMapGroupFromArray<T>(arr: T[], keys: (keyof T)[]): Map<string, T> {
    const result = new Map()
    arr.forEach(item => {
        const keyValues = keys.map(key => item[key]).join("_");
        const items = result.get(keyValues) || []
        result.set(keyValues, [...items, item]); // Puedes adaptar el valor a lo que necesites
    });
    return result;
}