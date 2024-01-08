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


