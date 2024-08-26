export default function formatDateToMDY(date: Date): string {
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}
