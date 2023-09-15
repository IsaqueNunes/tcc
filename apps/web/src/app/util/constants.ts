import { UserData } from "../models/User/userData";

export const User: UserData = JSON.parse(localStorage.getItem('authData') as string);

export function getUser() {
  const user: UserData = JSON.parse(localStorage.getItem('authData') as string);
  return user;
}

export const IsAdmin: boolean = getUser()?.email?.includes('tecnico.ifms');
