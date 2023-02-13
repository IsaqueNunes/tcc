import { View, Text, TextInput } from "react-native"
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { commonStyles } from "../../styles/styles";
import { style } from "./styles";

type Props = {
  label: string,
  value: FormValidatorDto,
  setValue: (value: FormValidatorDto) => void
}

export default function TextArea({ label, value, setValue }: Props) {
  return (
    <View style={style.textAreaContainer}>
      <Text style={commonStyles.labelInput}>{label}</Text>

      <TextInput
        style={value.isValid ? style.textAreaInput : style.textAreaInputWithError}
        multiline={true}
        numberOfLines={2}
        value={value.value}
        onChangeText={(text) => setValue({ ...value, value: text })} />
    </View>
  )
}
