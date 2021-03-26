interface Pagination {
  total: number,
  range: number,
  currentIndex: number,
}

export const paginator: (pagination: Pagination) => number[] = ({
  total,
  range,
  currentIndex,
}) => {
  let numbered = [];
  const last = currentIndex + range

  // Validate
  if (currentIndex > total || range < 1) {
    throw new Error("Paginator failure: Unexpected input!");
  } else if (currentIndex == total) {
    // Show range
    return paginator({
      total,
      range,
      currentIndex: currentIndex - range,
    }) 
  }

  // Mutate range when exceeds total
  if (last > total) {
    range = total - currentIndex
  }

  // Spread values to range
  for (let i = 0, x = currentIndex; i < range; i++, x++) {
    numbered.push(x)
  }

  // Show dots when too long (represented by -1)
  if (last < total) {
    numbered.push(-1)
  }

  // Last page is always available
  numbered.push(total)

  return numbered;
}

export const arrowDisableStyleHandler = (disable: boolean) => disable && 'opacity-30 cursor-not-allowed'