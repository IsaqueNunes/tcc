import { StyleSheet } from "react-native";

export const styles = (width) => StyleSheet.create({
  textInputContainer: {
    marginBottom: 10,
    width: width
  },
  textInput: {
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 10,
    paddingLeft: 10
  },
  label: {
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
  },
});
