import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState(false);
  useEffect(() => {
    async function getCurrentUser() {
      setLoadingUser(true);
      const currentUser = await GoogleSignin.getCurrentUser();
      setUser(currentUser);
      setLoadingUser(false);
    }

    getCurrentUser();
  }, []);

  return { user, loadingUser }
}
