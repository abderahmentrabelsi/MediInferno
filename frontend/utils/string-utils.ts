export function snakeCaseToHumanReadable(str: string): string {
  return str.replace(/_/g, ' ');
}

export function snakeCaseToTitleCase(str: string): string {
  return snakeCaseToHumanReadable(str)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
