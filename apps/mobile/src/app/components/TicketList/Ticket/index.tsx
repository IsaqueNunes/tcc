import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export type TicketProps = {
  id: string,
  title: string,
  content: string,
  status: string
}

export default function Ticket({ title, content, status }: TicketProps) {
  return (
    <TouchableOpacity style={styles.ticketContainer}>
      <View style={styles.ticketMessageContainer}>
        <Text style={styles.ticketTitle}>{title}</Text>
      </View>
      <View style={styles.ticketMessageContentContainer}>
        <Text style={styles.ticketContent} numberOfLines={2}>{content}</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusColor} />
          <Text>{status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
