import { StyleSheet } from "react-native";
import { commonStyles } from "../../styles/styles";

export const common = StyleSheet.create({
  size12: {
    fontSize: 12
  }
});

export const styles = StyleSheet.create({
  homeContainer: {
    padding: 20,
  },
  greetingTitle: {
    ...commonStyles.titleBlack,
    fontSize: 24,
    marginVertical: 20
  },
  lastTicketCommented: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 15,
    ...commonStyles.textBlack
  },
});
