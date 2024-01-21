export function generateRandomId(length = 15) {
    const prefix = 'BABAG';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let paymentId = prefix;

    for (let i = prefix.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        paymentId += characters.charAt(randomIndex);
    }

    return paymentId;
}
