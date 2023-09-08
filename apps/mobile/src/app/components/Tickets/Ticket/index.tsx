import { CommonActions, useNavigation } from "@react-navigation/native";
import { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export type TicketProps = {
  id: string,
  title: string,
  content: string,
  status: string,
  isFirstTicket?: boolean
}

let colorFromStatus = {
  'EM_ANALISE': '#3092EC',
  'ABERTO': '#FAE52D',
  'FINALIZADO': '#93FA2D'
}

const Ticket = ({ id, title, content, status, isFirstTicket = false }: TicketProps) => {
  const navigation = useNavigation();
  console.log(title)

  function createStatus(): string {
    const newStatusMessage = (status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase()).replaceAll('_', ' ');
    return newStatusMessage;
  }

  function redirectToChatTicket() {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'Chat', params: { id } }]
    }))
  }

  const style = styles(colorFromStatus[status], isFirstTicket);

  return (
    <TouchableOpacity style={style.ticketContainer} onPress={redirectToChatTicket}>
      <View style={style.ticketMessageContainer}>
        <Text style={style.ticketTitle}>{title}</Text>
      </View>
      <View style={style.ticketMessageContentContainer}>
        <Text style={style.ticketContent} numberOfLines={2}>{content}</Text>
        <View style={style.statusContainer}>
          <View style={style.statusColor} />
          <Text>{createStatus()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default memo(Ticket);
