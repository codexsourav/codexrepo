export const setStorage = (key: string, data: any) => {
    return localStorage.setItem(key, data);
}

export const getStorage = (key: string) => {
    return localStorage.getItem(key);
}

export const clearStorage = () => {
    return localStorage.clear();
}