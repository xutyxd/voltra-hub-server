
export function isValidISODate(stringDate: unknown): boolean {
    // Check it is a string
    if (typeof stringDate !== 'string') {
        return false;
    }
    // Must match YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(stringDate)) {
        return false;
    }
    const [year, month, day] = stringDate.split("-").map(Number);
    // JS months are 0-based: 0 = Jan, 11 = Dec
    const date = new Date(year, month - 1, day);
  
    // Check if date components match exactly
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
}