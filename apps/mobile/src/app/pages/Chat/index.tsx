import {
  Alert,
  Keyboard,
  SafeAreaView,
  Text, View
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { BaseSyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
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
import { ArrayPath, DeepPartial, DefaultValues, ErrorOption, Field, FieldArray, FieldError, FieldErrors, FieldValues, FormState, Path, RegisterOptions, SubmitErrorHandler, SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form';
import { addMessage, getChatInformation } from '../../services/ChatService';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SendMessageValidationSchema } from '../../shared/util/yupResolvers';
import { InferType } from 'yup';

type ParamList = {
  params: {
    id: string;
  };
};

type SendMessageValidationType = InferType<typeof SendMessageValidationSchema>;

export default function Chat() {
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { id } = route.params;
  const [ticket, setTicket] = useState<TicketMessage>();
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(true);
  const [status, setStatus] = useState<string>();
  const items = useMemo(() =>
    [{ label: 'Aberto', value: 'ABERTO' }, { label: 'Em Análise', value: 'EM_ANALISE' }, { label: 'Concluído', value: 'FINALIZADO' }],
    []);
  const { control, handleSubmit } = useForm<SendMessageValidationType>({
    resolver: yupResolver(SendMessageValidationSchema),
    defaultValues: { content: '', status: '' }
  });

  useEffect(() => {
    async function loadMessageScreen() {
      let retorno = await getChatInformation(id);
      setTicket(retorno.data);
      const user = await GoogleSignin.getCurrentUser();
      const isAdminEmail = user.user.email.includes(ADMIN_EMAIL_VALID);
      setUserIsAdmin(isAdminEmail);
      setMessages(retorno.data.Message);
      setStatus(retorno.data.status)
    }

    loadMessageScreen();
  }, []);

  const onError = (error: FieldErrors<SendMessageValidationType>) => {
    console.log(error)
  }
  async function sendMessage(data: SendMessageValidationType) {
    const message = createModelMessage(data);

    await addMessage(message);

    setMessages([...messages, message]);
  }

  const createModelMessage = (data: SendMessageValidationType) => {
    console.log(ticket?.Message[ticket?.Message.length - 1].id)
    // implementation error
    const message: MessageWithStatusDto = {
      content: data.content,
      userEmail: 'rafael.veiga@estudante.ifms.edu.br',
      repliedMessageId: isNotFirstMessage() ? ticket?.Message[ticket?.Message.length - 1].id : null,
      ticketId: Number(id),
      time: new Date(),
      status: data.status || status
    };

    return message;
  }

  const isNotFirstMessage = () => {
    return ticket?.Message.length !== 0;
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
            <Select items={items} defaultValue={status} name={'status'} control={control} />
          }
          {status !== 'FINALIZADO' &&
            <View>
              <TextArea label={''} control={control} id={'content'} />
            </View>
          }

          <GroupButton isFinishedStatus={status === 'FINALIZADO'} sendMessage={handleSubmit(sendMessage, onError)} />
        </View>
      }
    </SafeAreaView>
  )
}
