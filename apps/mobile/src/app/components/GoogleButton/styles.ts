import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const style = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#c4c4c4',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontWeight: 'bold',
    marginLeft: 20,
    ...commonStyles.textBlack
  }
});
