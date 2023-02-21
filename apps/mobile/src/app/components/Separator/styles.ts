import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20
  },
  line: {
    height: 2,
    width: '40%',
    backgroundColor: 'black'
  },
  textInsideLines: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    ...commonStyles.textBlack
  }
})
