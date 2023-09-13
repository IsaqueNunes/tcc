import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 5,
    width: '100%',
  },
  textInputWithError: {
    ...commonStyles.input,
    borderColor: 'red'
  }
});
