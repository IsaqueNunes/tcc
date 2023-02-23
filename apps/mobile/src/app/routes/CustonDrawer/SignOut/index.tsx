import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { style } from "./styles";

export default function SignOut() {
  const navigation = useNavigation<any>();

  async function logOut() {
    await GoogleSignin.signOut();
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    }))
  }

  return (
    <TouchableOpacity style={style.container} onPress={logOut}>
      <Ionicons name='exit-outline' size={22} color={'black'} />
      <Text style={style.text}>Sair</Text>
    </TouchableOpacity>
  )
}
