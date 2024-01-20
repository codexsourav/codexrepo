import axios from "axios"

export const sendOtp = async ({ otp, mobile }: { otp: string, mobile: string }): Promise<boolean> => {
    try {
        const requests = await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.FAT2SMS}&variables_values=${otp}&route=otp&numbers=${mobile}`)
        return true;
    } catch (error) {
        throw error;
    }
}