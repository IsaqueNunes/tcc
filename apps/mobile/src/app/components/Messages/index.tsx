import { FlatList } from "react-native";
import { MessageWithUser } from "../../models/Chat/message-with-user";
import Message from "./Message";

type MessagesProp = {
  messages: MessageWithUser[]
}

export default function Messages({ messages }: MessagesProp) {
  const renderItem = ({ item }) => (
    <Message key={item.id} username={item.user.name} email={item.user.email} data={item.time.toString()} content={item.content} />
  );

  return (
    <FlatList
      style={{ marginTop: 10 }}
      data={messages}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  )
}
