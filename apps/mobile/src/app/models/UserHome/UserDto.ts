import { User } from "@react-native-google-signin/google-signin";
import { TypeOfUser } from "../enums/TypeOfUser";

export type UserDto = {
  userData: User | undefined,
  loadingUser: boolean,
  typeOfUser?: TypeOfUser
}
