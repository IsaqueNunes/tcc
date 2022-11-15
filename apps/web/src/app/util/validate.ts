export function ConvertDate(data: string): string {
  const date = new Date(data).toLocaleDateString();
  const time = new Date(data).toLocaleTimeString();

  return `${date} ${time}`;
}
