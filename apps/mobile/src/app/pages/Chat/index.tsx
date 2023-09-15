import {
  SafeAreaView,
  Text, View
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { useMemo, } from 'react';
import { TicketMessage } from '../../models/Chat/ticket-message';
import { commonStyles } from '../../styles/styles';
import Message from '../../components/Messages/Message';
import Messages from '../../components/Messages';
import Input from '../../components/Input';
import GroupButton from './GroupButton';
import { MessageWithStatusDto } from '../../models/Chat/message-with-status-dto';
import Select from '../../components/Select';
import { FieldErrors, useForm } from 'react-hook-form';
import { addMessage, getChatInformation } from '../../services/ChatService';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SendMessageValidationSchema } from '../../shared/util/yupResolvers';
import { InferType } from 'yup';
import { useQuery } from 'react-query';

type ParamList = {
  params: {
    id: string;
  };
};

type SendMessageValidationType = InferType<typeof SendMessageValidationSchema>;

export default function Chat() {
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  console.log('teste')
  const { id } = route.params;
  const items = useMemo(() =>
    [{ label: 'Aberto', value: 'ABERTO' }, { label: 'Em Análise', value: 'EM_ANALISE' }, { label: 'Concluído', value: 'FINALIZADO' }],
    []);
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<SendMessageValidationType>({
    resolver: yupResolver(SendMessageValidationSchema),
    defaultValues: { content: '', status: '' }
  });

  const { data, isLoading, refetch } = useQuery<TicketMessage, Error>('getChatMessage', async () => {
    const response = await getChatInformation(id);

    if (response.status !== 200)
      throw new Error("Failed to fetch!");

    setValue('status', response.data.status)
    return await response.data;
  });

  const onError = (error: FieldErrors<SendMessageValidationType>) => {
    console.log(error)
  }
  async function sendMessage(data: SendMessageValidationType) {
    const message = createModelMessage(data);

    await addMessage(message);

    setValue("content", "")

    refetch();
  }

  const createModelMessage = (formData: SendMessageValidationType) => {
    // implementation error
    const message: MessageWithStatusDto = {
      content: formData.content,
      userEmail: 'rafael.veiga@estudante.ifms.edu.br',
      repliedMessageId: isNotFirstMessage() ? data?.Message[data?.Message.length - 1].id : null,
      ticketId: Number(id),
      time: new Date(),
      status: formData.status
    };

    return message;
  }

  const isNotFirstMessage = () => {
    return data?.Message.length !== 0;
  }

  return (
    !isLoading ? (
      <SafeAreaView
        style={styles.mainContent}>
        <View style={[styles.messageDisplayContainer, { flex: watch("status") === "FINALIZADO" ? 9 : 8 }]}>


          <Text style={commonStyles.titleBlack}>{data?.title}</Text>

          <Message
            username={data?.user?.name}
            email={data?.user?.email}
            data={data?.createdAt.toLocaleString()}
            content={data?.content}
            isMainMessage
          />

          <Messages messages={data.Message} />
        </View>

        <View style={[styles.sendMessageDisplayContainer, { flex: watch("status") === "FINALIZADO" ? 1 : 2 }]}>
          {/* implementation error of Admin */}
          {false &&
            <Select items={items} defaultValue={watch("status")} name={'status'} control={control} />
          }
          {watch("status") !== 'FINALIZADO' &&
            <View>
              <Input control={control} id={'content'} error={errors.content !== undefined} />
            </View>
          }

          <GroupButton isFinishedStatus={watch("status") === 'FINALIZADO'} sendMessage={handleSubmit(sendMessage, onError)} />
        </View>
      </SafeAreaView>
    ) : (<></>)
  )
}
