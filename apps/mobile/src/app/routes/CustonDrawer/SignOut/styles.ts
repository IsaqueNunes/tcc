import { StyleSheet } from "react-native";
import { commonStyles } from "../../../styles/styles";

export const style = StyleSheet.create({
  container: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    ...commonStyles.textBlack,
    marginLeft: 5
  }

})
