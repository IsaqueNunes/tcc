import { View, FlatList } from "react-native";
import Ticket, { TicketProps } from "./Ticket";

type Props = {
  tickets: TicketProps[]
}

export default function TicketList({ tickets }: Props) {
  const renderItem = ({ item }) => (
    <Ticket id={item.id} title={item.title} content={item.content} status={item.status} />
  );


  return (
    <FlatList
      data={tickets}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
