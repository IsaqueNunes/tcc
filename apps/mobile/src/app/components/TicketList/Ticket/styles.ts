import { StyleSheet } from "react-native";
import { commonStyles } from "../../../styles/styles";

export const styles = (statusColor, firstTicket) => StyleSheet.create({
  ticketContainer: {
    width: '100%',
    borderRadius: 4,
    borderLeftColor: statusColor,
    padding: 10,
    marginTop: firstTicket ? 0 : 20,
    marginBottom: 5,
    flexDirection: 'column',
    ...commonStyles.defaultShadow,
    borderLeftWidth: 4,

  },
  ticketMessageContainer: {
  },
  ticketTitle: {
    ...commonStyles.titleBlack,
    fontSize: 18,
  },
  ticketMessageContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  ticketContent: {
    width: '70%'
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusColor: {
    height: 10,
    width: 10,
    backgroundColor: statusColor,
    marginRight: 5,
    borderRadius: 50,
  },
});
