import { Control, useController } from "react-hook-form";
import { View, Text, TextInput } from "react-native"
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import { commonStyles } from "../../styles/styles";
import { style } from "./styles";

type Props = {
  label: string,
  value: FormValidatorDto,
  control: Control,
  id: string,
  setValue: (value: FormValidatorDto) => void
}

export default function TextArea({ label, value, setValue, control, id }: Props) {
  const { field } = useController({
    control,
    name: id,
    defaultValue: value
  })
  return (
    <View style={style.textAreaContainer}>
      <Text style={commonStyles.labelInput}>{label}</Text>

      <TextInput
        style={value.isValid ? style.textAreaInput : style.textAreaInputWithError}
        multiline={true}
        numberOfLines={2}
        value={field.value}
        onChangeText={field.onChange} />
    </View>
  )
}
