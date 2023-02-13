import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

const common = StyleSheet.create({
  textArea: {
    ...commonStyles.input,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  }
})

export const style = StyleSheet.create({
  textAreaContainer: {
  },
  textAreaInput: {
    ...common.textArea
  },
  textAreaInputWithError: {
    ...common.textArea,
    borderColor: 'red'
  }
});
