import { TextInput, Text, View } from "react-native";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { commonStyles } from "../../styles/styles";
import { styles } from './styles'

type Props = {
  label: string,
  value: FormValidatorDto,
  width?: any,
  placeholder?: string,
  setValue: (value: FormValidatorDto) => void
}

export default function Input({ value, setValue, label, width = '100%', placeholder = '' }: Props) {
  const style = styles(width);
  return (
    <View style={style.textInputContainer}>
      {label &&
        <Text style={commonStyles.labelInput}>{label}</Text>
      }
      <TextInput style={value.isValid ? commonStyles.input : style.textInputWithError} value={value.value} placeholder={placeholder} onChangeText={(text) => setValue({ ...value, value: text })} />
    </View>
  )
}
