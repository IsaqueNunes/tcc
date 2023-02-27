import { UserData } from "../models/User/userData";

export function ConvertDate(data: string): string {
  const date = new Date(data).toLocaleDateString();
  const time = new Date(data).toLocaleTimeString();

  return `${date} ${time}`;
}

export const User: UserData = JSON.parse(localStorage.getItem('authData') as string);
