import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { TypeOfUser } from "../models/enums/TypeOfUser";
import { UserDto } from "../models/UserHome/UserDto";
import { getTypeOfUser } from "../shared/util/validator";

export default function useCurrentUser() {
  const [user, setUser] = useState<UserDto>({ loadingUser: true, userData: undefined, typeOfUser: TypeOfUser.None });
  useEffect(() => {
    async function getCurrentUser() {
      const currentUser = await GoogleSignin.getCurrentUser();
      setUser({
        userData: currentUser,
        loadingUser: false,
        typeOfUser:
          currentUser ?
            getTypeOfUser(currentUser.user.email) :
            TypeOfUser.None
      });
    }

    getCurrentUser();
  }, []);

  return { user }
}
