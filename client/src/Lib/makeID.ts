export function generateRandomId() {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    const randomString = Math.random().toString(36).substring(2, 4).toUpperCase();
    const randomId = `BABAG${randomNum}${randomString}`;
    return randomId;
}
