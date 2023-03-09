import { UserData } from "../models/User/userData";

export const User: UserData = JSON.parse(localStorage.getItem('authData') as string);

export const IsAdmin: boolean = User?.email?.includes('tecnico.ifms');
