import { User } from "@react-native-google-signin/google-signin";
import { UserDto } from "../models/UserHome/UserDto";

export type UserContextType = {
  user: UserDto;
  login: () => Promise<User>;
  getCurrentUser: () => Promise<User>;
};
