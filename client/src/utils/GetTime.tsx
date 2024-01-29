export const generateTimeArray = (): string[] => {
    const timeArray: string[] = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Set start time to midnight

    for (let i = 0; i < 96; i++) {
        // 96 intervals represent 24 hours with 15-minute intervals
        const time = new Date(startTime.getTime() + i * 15 * 60 * 1000);
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
        timeArray.push(timeString);
    }

    return timeArray;
};

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


export const mobileCodes = ["+91", "+1", "+44", "+81", "+86", "+33", "+49", "+7", "+55", "+61"];
