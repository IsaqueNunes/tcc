import { User } from "@react-native-google-signin/google-signin"
import { View, Image, Text } from "react-native"
import { style } from "./styles"

type Props = {
  currentUser: User
}

export default function UserHeader({ currentUser }: Props) {
  return (
    <View style={style.headerContainer}>
      <Image style={style.image} source={{ uri: currentUser.user.photo }} />
      <View>
        <Text style={{ fontSize: 16 }}>{currentUser.user.name}</Text>
        <Text style={{ maxWidth: 200, fontSize: 12 }}>{currentUser.user.email}</Text>
      </View>
    </View>
  )
}
