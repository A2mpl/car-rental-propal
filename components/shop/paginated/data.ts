/**
 * Smart page range: always shows first + last page,
 * current page ±1, with ellipsis gaps in between.
 * E.g. for page 5 of 10: [1, …, 4, 5, 6, …, 10]
 */
export function getPageRange(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range: (number | 'ellipsis')[] = [1];

  if (current > 3) range.push('ellipsis');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) range.push(i);

  if (current < total - 2) range.push('ellipsis');

  range.push(total);

  return range;
}
