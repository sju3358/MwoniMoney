export function moneyFormat(number: any): string {
  const numberString = number.toString();
  const parts = numberString.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function dateFormat(origindate: string): string {
  const date = new Date(origindate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}
