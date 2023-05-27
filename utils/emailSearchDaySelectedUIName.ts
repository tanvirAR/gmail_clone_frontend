export default function getDays(days: number): string  {
    let daysInTextFormat;
    if (days === 1) {
      daysInTextFormat = "1 day";
    } else if (days === 3) {
      daysInTextFormat = "3 days";
    } else if (days === 7) {
      daysInTextFormat = "7 days";
    } else if (days === 14) {
      daysInTextFormat = "14 days";
    } else if (days === 31) {
      daysInTextFormat = "1 month";
    } else if (days === 62) {
      daysInTextFormat = "2 months";
    } else if (days === 31 * 6) {
      daysInTextFormat = "6 months";
    } else if (days === 365) {
      daysInTextFormat = "1 year";
    }

    return daysInTextFormat || '';

}