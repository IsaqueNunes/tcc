import { StyleSheet } from "react-native";
import { commonStyles } from "../../../styles/styles";

const common = StyleSheet.create({
  mainMessageContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...commonStyles.defaultShadow,
    borderRadius: 4,
  }
})

export const style = StyleSheet.create({
  ticketContentMessageContainer: {
    ...common.mainMessageContainer
  },
  ticketLowerMessageContainer: {
    ...common.mainMessageContainer,
    width: '90%'
  },
  ticketContentContainer: {
    marginTop: 5,
  },
  username: {
    ...commonStyles.textBlack,
    fontWeight: 'bold',
    fontSize: 16
  },
  email: {
    fontSize: 14
  },
  data: {
    fontSize: 12
  },
  message: {
    ...commonStyles.textBlack,
    fontWeight: 'bold',
  }
});
