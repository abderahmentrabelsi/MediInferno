export function snakeCaseToHumanReadable(str: string): string {
  return str.replace(/_/g, ' ');
}

export function snakeCaseToTitleCase(str: string): string {
  return snakeCaseToHumanReadable(str)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function randomString(length = 5): string {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
