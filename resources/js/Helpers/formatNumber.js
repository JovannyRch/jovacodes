//Create a function to format a number
export function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}
