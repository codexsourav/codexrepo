export function generateOTP(): string {
    const otp: number = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
}

