import { View, FlatList } from "react-native";
import Ticket, { TicketProps } from "./Ticket";

type Props = {
  tickets: TicketProps[]
}

export default function TicketList({ tickets }: Props) {
  const renderItem = ({ item, index }) => (
    <Ticket id={item.id} title={item.title} content={item.content} status={item.status} isFirstTicket={index === 0} />
  );


  return (
    <FlatList
      style={{ marginTop: 20, height: '75%' }}
      data={tickets}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
