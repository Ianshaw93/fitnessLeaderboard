// This function will add a leading zero if the number is less than 10
function pad(number: number) {
    return number < 10 ? '0' + number : number;
  }
  
  // This function will return a string in the format 'YYYY-MM-DD'
export default function getCurrentDate() {
    const date = new Date();
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate());
  }