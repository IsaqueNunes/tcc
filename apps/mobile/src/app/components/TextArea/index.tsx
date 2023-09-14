import { Control, useController } from "react-hook-form";
import { View, Text, TextInput } from "react-native"
import { commonStyles } from "../../styles/styles";
import { style } from "./styles";

type Props = {
  defaultValue?: string,
  errors?: boolean,
  label: string,
  control: Control,
  id: string,
}

export default function TextArea({ defaultValue = '', errors = false, label, control, id }: Props) {
  const { field } = useController({
    control,
    name: id,
    defaultValue: defaultValue
  })
  return (
    <View style={style.textAreaContainer}>
      <Text style={commonStyles.labelInput}>{label}</Text>

      <TextInput
        style={errors ? style.textAreaInputWithError : style.textAreaInput}
        multiline={true}
        numberOfLines={2}
        value={field.value}
        onChangeText={field.onChange} />
    </View>
  )
}
