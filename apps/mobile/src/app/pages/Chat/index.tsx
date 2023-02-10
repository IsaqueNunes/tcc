import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text, View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import Input from '../../components/Input';
import { useEffect, useState } from 'react';
import { getData } from '../../services/ApiService';
import { MessageWithUser } from '../../models/Chat/message-with-user';
import { TicketMessage } from '../../models/Chat/ticket-message';
import { commonStyles } from '../../styles/styles';
import Message from '../../components/Messages/Message';
import Messages from '../../components/Messages';
import TextArea from '../../components/TextArea';
import { FormValidatorDto } from '../../models/FormValidator/FormValidatorDto';
import Button from '../../components/Button';

type ParamList = {
  params: {
    id: string;
  };
};

export default function Chat() {
  const navigator = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { id } = route.params;
  const [ticket, setTicket] = useState<TicketMessage>();
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [messageContent, setMessageContent] = useState<FormValidatorDto>(new FormValidatorDto());

  useEffect(() => {
    async function loadMessageScreen() {
      let retorno = await getData('/tickets/', id);
      setTicket(retorno.data);
      setMessages(retorno.data.Message);
    }

    loadMessageScreen();
  }, []);

  function sendMessage() {
    if (messageFieldIsNotEmpty()) {
      // TODO: send message to backend and add it to message useState list
    } else {
      Alert.alert('É necessário informar o conteúdo da mensagem para enviá-la.')
    }
  }

  function messageFieldIsNotEmpty() {
    const messageContentIsNotEmpty = messageContent.value !== '';

    setMessageContent({ ...messageContent, isValid: messageContentIsNotEmpty });

    return messageContentIsNotEmpty;
  }

  function backToLastPage() {
    navigator.goBack();
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.mainContent}>
      <Text style={commonStyles.titleBlack}>{ticket?.title}</Text>

      <Message
        username={ticket?.user?.name}
        email={ticket?.user?.email}
        data={ticket?.createdAt.toLocaleString()}
        content={ticket?.content}
        isMainMessage
      />

      <Messages messages={messages} />

      <TextArea label={''} value={messageContent} setValue={setMessageContent} />

      <View style={{ flex: 1, flexDirection: 'row', marginTop: 50, justifyContent: 'space-between' }}>
        <Button label={'Enviar'} width='45%' backgroundColor='#3B7DED' onClick={sendMessage} />
        <Button label={'Voltar'} width='45%' backgroundColor='#C82733' onClick={backToLastPage} />
      </View>
    </KeyboardAvoidingView>
  )
}
