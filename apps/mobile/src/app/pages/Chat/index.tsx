import {
  Alert,
  Keyboard,
  SafeAreaView,
  Text, View
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { useEffect, useRef, useState } from 'react';
import { getData, postData } from '../../services/ApiService';
import { MessageWithUser } from '../../models/Chat/message-with-user';
import { TicketMessage } from '../../models/Chat/ticket-message';
import { commonStyles } from '../../styles/styles';
import Message from '../../components/Messages/Message';
import Messages from '../../components/Messages';
import TextArea from '../../components/TextArea';
import { FormValidatorDto } from '../../models/FormValidator/FormValidatorDto';
import GroupButton from './GroupButton';
import { MessageWithStatusDto } from '../../models/Chat/message-with-status-dto';
import Select from '../../components/Select';
import { GoogleSignin, User } from '@react-native-google-signin/google-signin';
import { ADMIN_EMAIL_VALID } from '../../shared/util/constants';

type ParamList = {
  params: {
    id: string;
  };
};

export default function Chat() {
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { id } = route.params;
  const [ticket, setTicket] = useState<TicketMessage>();
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>();
  const [status, setStatus] = useState<string>();
  const [scrollToLastMessage, setScrollToLastMessage] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<FormValidatorDto>(new FormValidatorDto());
  const items = [{ label: 'Aberto', value: 'ABERTO' }, { label: 'Em Análise', value: 'EM_ANALISE' }, { label: 'Concluído', value: 'FINALIZADO' }]

  useEffect(() => {
    async function loadMessageScreen() {
      let retorno = await getData('/tickets/', id);
      setTicket(retorno.data);
      const user = (await GoogleSignin.getCurrentUser()).user;
      const isAdminEmail = user.email.includes(ADMIN_EMAIL_VALID);
      setUserIsAdmin(isAdminEmail);
      setMessages(retorno.data.Message);
      setStatus(retorno.data.status)
    }

    loadMessageScreen();
  }, []);

  async function validateToSendMessage() {
    if (messageFieldIsNotEmpty()) {
      setMessageContent({ ...messageContent, isValid: true, value: '' });
      setScrollToLastMessage(true);
      Keyboard.dismiss();
      await sendMessage();
    } else {
      setScrollToLastMessage(false);
      Alert.alert('É necessário informar o conteúdo da mensagem para enviá-la.')
    }
  }

  function messageFieldIsNotEmpty() {
    const messageContentIsNotEmpty = messageContent.value !== '';

    setMessageContent({ ...messageContent, isValid: messageContentIsNotEmpty });

    return messageContentIsNotEmpty;
  }

  async function sendMessage() {
    const message = createModelMessage();

    await postData('/message', message);

    setMessages([...messages, message]);
  }

  const createModelMessage = (): MessageWithStatusDto => {
    const message: MessageWithStatusDto = {
      content: messageContent.value,
      user: {
        id: ticket?.userId,
        email: ticket?.user.email,
        name: ticket?.user.name,
      },
      repliedMessageId: ticket?.Message.length === 0 ? null
        : ticket?.Message[(ticket?.Message?.length || 1) - 1].id,
      ticketId: Number(id),
      time: new Date(),
      status: status
    };

    return message;
  }

  return (
    <SafeAreaView
      style={styles.mainContent}
    >

      <View style={[styles.messageDisplayContainer, { flex: status === 'FINALIZADO' ? 9 : 7 }]}>

        <Text style={commonStyles.titleBlack}>{ticket?.title}</Text>

        <Message
          username={ticket?.user?.name}
          email={ticket?.user?.email}
          data={ticket?.createdAt.toLocaleString()}
          content={ticket?.content}
          isMainMessage
        />

        <Messages messages={messages} />
      </View>

      {status &&
        <View style={[styles.sendMessageDisplayContainer, { flex: status === 'FINALIZADO' ? 1 : 3 }]}>
          {userIsAdmin &&
            <Select items={items} value={status} setValue={setStatus} />
          }
          {status !== 'FINALIZADO' &&
            <View>
              <TextArea label={''} value={messageContent} setValue={setMessageContent} />
            </View>
          }

          <GroupButton isFinishedStatus={status === 'FINALIZADO'} sendMessage={validateToSendMessage} />
        </View>
      }
    </SafeAreaView>
  )
}
