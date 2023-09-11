import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { createContext, ReactNode, useContext, useState } from 'react';
import { UserContextType } from '../@types/@types.user';
import { TypeOfUser } from '../models/enums/TypeOfUser';
import { UserDto } from '../models/UserHome/UserDto';
import { getTypeOfUser } from '../shared/util/validator';
import { storage } from '../storage/mmkv';

export const UserContext = createContext<UserContextType | null>(null);

type Props = {
  children: ReactNode
}

export default function UserContextProvider({ children }: Props) {
  const [user, setUser] = useState<UserDto>({ loadingUser: true, userData: undefined, typeOfUser: TypeOfUser.None });

  async function login() {
    await GoogleSignin.hasPlayServices();
    const user: User = await GoogleSignin.signIn();
    setUser({
      loadingUser: false,
      userData: user,
      typeOfUser: user ?
        getTypeOfUser(user.user.email) :
        TypeOfUser.None
    });

    return user;
  }

  async function getCurrentUser() {
    const user = await GoogleSignin.getCurrentUser();

    return user;
  }

  return (
    <UserContext.Provider value={{ login, user, getCurrentUser }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
}
