import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const styles = (width) => StyleSheet.create({
  textInputContainer: {
    marginBottom: 10,
    width: width
  },
  textInputWithError: {
    ...commonStyles.input,
    borderColor: 'red'
  }
});
