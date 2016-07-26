function numberComparator (a, b) {
  return b - a
}

export default function bsearch (array, needle, cmp = numberComparator) {
  let a = 0
  let z = array.length - 1

  while (a < z) {
    let i = (a + z) >> 1

    if (cmp(array[i], needle) > 0) {
      a = i + 1
    } else if (cmp(array[i], needle) < 0) {
      z = i - 1
    } else {
      return i
    }
  }

  return a
}
