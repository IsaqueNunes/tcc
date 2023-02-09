import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  textBlack: {
    color: 'black'
  },
  titleBlack: {
    fontSize: 22,
    color: 'black',
    fontWeight: 'bold'
  },
  defaultShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
  },
  labelInput: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    alignSelf: 'stretch',
    borderRadius: 10,
    paddingLeft: 10
  }
});
