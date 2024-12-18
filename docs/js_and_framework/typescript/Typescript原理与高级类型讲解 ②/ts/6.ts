enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
namespace Month {
  export function isSummer(month: Month) {
    switch (month) {
      case Month.June:
      case Month.July:
      case Month.August:
        return true;
      default:
        return false
    }
  }
}
console.log(Month.isSummer(Month.January)) // false
console.log(Month.isSummer(Month.July))