export function twoDigitsFormat(number) {
    if (number < 10) {
        return '0' + number;
    } else {
        return number;
    }
}

export function convertToString(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return twoDigitsFormat(day) + '.' + twoDigitsFormat(month) + '.' + year;
}