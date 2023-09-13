import { Control, useController } from "react-hook-form";
import { TextInput, Text, View } from "react-native";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { commonStyles } from "../../styles/styles";
import { styles } from './styles'

type Props = {
  label: string,
  value: string,
  placeholder?: string,
  control: Control,
  id: string,
  error?: boolean
}

export default function Input({ value, label, placeholder = '', control, id, error = false }: Props) {
  const { field } = useController({
    control,
    defaultValue: value,
    name: id
  });
  return (
    <View style={styles.textInputContainer}>
      {label &&
        <Text style={commonStyles.labelInput}>{label}</Text>
      }
      <TextInput style={error ? styles.textInputWithError : commonStyles.input} value={field.value} placeholder={placeholder} onChangeText={field.onChange} />
    </View>
  )
}
