import { TextInput, Text, View } from "react-native";
import { styles } from './styles'

type Props = {
  label: string,
  value: string,
  width?: any,
  placeholder?: string,
  setValue: (value: string) => void
}

export default function Input({ value, setValue, label, width = '100%', placeholder = '' }: Props) {
  const style = styles(width);
  return (
    <View style={style.textInputContainer}>
      {label &&
        <Text style={style.label}>{label}</Text>
      }
      <TextInput style={style.textInput} value={value} placeholder={placeholder} onChangeText={setValue} />
    </View>
  )
}
