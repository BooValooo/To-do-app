function getFirstDayOfMonth(year, month) {
    // Month is 0-indexed in JavaScript, so we subtract 1
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, and so on
    return dayOfWeek;
  }

  export default getFirstDayOfMonth