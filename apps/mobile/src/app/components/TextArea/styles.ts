import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

const common = StyleSheet.create({
  textArea: {
    ...commonStyles.input,
    height: 150,
    textAlignVertical: 'top',
  }
})

export const style = StyleSheet.create({
  textAreaContainer: {
    marginTop: 20,
  },
  textAreaInput: {
    ...common.textArea
  },
  textAreaInputWithError: {
    ...common.textArea,
    borderColor: 'red'
  }
});
