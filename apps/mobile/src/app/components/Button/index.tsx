import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { TouchableOpacity } from 'react-native'

import { styles } from "./styles";

type Props = {
  label: string,
  onClick?: () => void,
  navigation?: string
}

export default function Button({ label, onClick, navigation = '' }: Props) {
  const navigate = useNavigation<any>();

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={navigation ? navigate.navigate(navigation) : onClick}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  )
}
