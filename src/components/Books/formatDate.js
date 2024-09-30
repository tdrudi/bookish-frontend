function formatDate(string) {
    const date = new Date(string);
    // Get the date components
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // Get the full year 
    const year = date.getUTCFullYear();
    // Get the month
    const month = months[date.getUTCMonth()];
    // Get the day of the month 
    const day = date.getUTCDate();
    return `${month} ${day}, ${year}`;
}
export default formatDate;