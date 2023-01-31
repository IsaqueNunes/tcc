import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const styles = StyleSheet.create({
  chartTitle: {
    textAlign: 'center',
    ...commonStyles.titleBlack
  },
  ticketCountingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  lastTicketCommentedContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  lastTicketCommentedTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
    ...commonStyles.textBlack
  }
});
