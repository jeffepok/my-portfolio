function getMonthInWords(date: Date) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
  }

  export function getPrettyDate(date: Date){
    let month = getMonthInWords(date)
    return `${date.getDate()}. ${month}, ${date.getFullYear()}`
  }