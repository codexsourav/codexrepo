export function generateOTP(): string {
    const otp: number = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

export function generateRandomPaymentId(length = 15) {
    const prefix = 'BABAG';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let paymentId = prefix;

    for (let i = prefix.length; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        paymentId += characters.charAt(randomIndex);
    }

    return paymentId;
}

