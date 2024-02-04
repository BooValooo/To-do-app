function getDaysInMonth(year, month) {
    // Month is 0-indexed in JavaScript, so we add 1
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
  }

  export default getDaysInMonth