export const generateTimeArray = (): string[] => {
    const timeArray = [];
    const startTime = new Date();
    startTime.setHours(0, 0, 0, 0); // Set start time to midnight

    for (let i = 0; i < 288; i++) {
        // 288 intervals represent 24 hours with 5-minute intervals
        const time = new Date(startTime.getTime() + i * 5 * 60 * 1000);
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


