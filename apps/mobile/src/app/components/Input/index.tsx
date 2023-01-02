import { TextInput, Text, View } from "react-native";
import { styles } from './styles'

type Props = {
  label: string,
  value: string,
  setValue: (value: string) => void
}

export default function Input({ value, setValue, label }: Props) {
  return (
    <View style={styles.textInputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.textInput} value={value} onChangeText={setValue} />
    </View>
  )
}
