export const futureTime = (min: number): Date => {
    let now: Date = new Date();
    now.setMinutes(now.getMinutes() + min);
    now = new Date(now);
    return now;
}

export function isDateUpToCurrent(dateToCheck: string | number | Date): boolean {
    const currentDate: Date = new Date();
    const inputDate = new Date(dateToCheck);
    return inputDate <= currentDate;
}

export const datetoDays = (date1: string | number | Date, date2: string | number | Date): number => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    if (isNaN(firstDate.getTime()) || isNaN(secondDate.getTime())) {
        // Handle invalid date strings
        throw new Error("Invalid date format");
    }

    const timeDifference = Math.abs(secondDate.getTime() - firstDate.getTime());

    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
};



export const getCashBack = (purchaseAmount: number, cashbackPercentage: number) => {
    return (purchaseAmount * cashbackPercentage) / 100;
}