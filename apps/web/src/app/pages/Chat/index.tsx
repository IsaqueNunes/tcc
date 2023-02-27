import { SearchUserExistsTicketDto } from 'libs/models/search-user-exists-ticket-dto';
import { DropdownDto } from 'libs/models/dropdown-dto';
import { MessageWithUser } from 'libs/models/message-with-user';
import { TicketMessage } from 'libs/models/ticket-message';
import { MessageWithStatusDto } from 'libs/models/message-with-status-dto';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getData, postData } from '../../services/ApiService';
import { ConvertDate } from '../../util/validate';
import { User, IsAdmin } from '../../util/constants';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Messages from '../../components/Messages';
import HeaderMessage from './HeaderMessage';
import TextArea from '../../components/TextArea';
import './chat.css';

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [canSeeMessage, setCanSeeThisMessage] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [ticket, setTicket] = useState<TicketMessage>();
  const [description, setDescription] = useState<string>('');
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const optionsToSelect: DropdownDto[] =
    [{ label: 'Aberto', value: 'ABERTO' }, { label: 'Em Análise', value: 'EM_ANALISE' }, { label: 'Concluído', value: 'FINALIZADO' }]

  useEffect(() => {
    async function verifyIfUserCanSeeMessage() {
      if (!IsAdmin) {
        const userToSearch: SearchUserExistsTicketDto = {
          email: User.email,
          id: Number(id)
        }

        let retorno = await postData('tickets/can-see-message', userToSearch);

        if (!(retorno.data)) {
          navigate('/user/my-tickets');
        } else {
          setCanSeeThisMessage(true);
        }
      }
    }

    verifyIfUserCanSeeMessage();
  }, []);

  useEffect(() => {
    async function searchDataFromChat() {
      let retorno = await getData('/tickets/', id);
      setTicket(retorno.data);
      setSelectedOption(retorno.data.status);
      setMessages(retorno.data.Message);
    }

    searchDataFromChat();
  }, []);


  const AddMessage = async () => {
    if (description !== '') {
      const message = createModelMessage();

      await postData('/message', message);

      const messageWithUser: MessageWithUser = {
        ...message,
        user: {
          email: User.email,
          name: User.name,
          id: User.id,
        }
      }

      setMessages([...messages, messageWithUser]);
      setDescription('');
    }
  };

  const createModelMessage = (): MessageWithStatusDto => {
    const message: MessageWithStatusDto = {
      content: description,
      userEmail: User.email,
      repliedMessageId: ticket?.Message.length === 0 ? null
        : ticket?.Message[(ticket?.Message?.length || 1) - 1].id,
      ticketId: Number(id),
      time: new Date(),
      status: selectedOption,
    };

    return message;
  }

  const setSelectedOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const backToListPage = () => {
    navigate(-1);
  };

  return (
    canSeeMessage ? (
      <>

        <Header typeOfHeader={'user'} />

        <div className="ticket-chat-page">
          <div className="ticket-chat-page-content">
            <div className="title-content">
              <h1>
                {' '}
                {ticket?.title}
              </h1>
              {ticket?.status !== "FINALIZADO" && IsAdmin ?
                (

                  <Select
                    selectedOption={selectedOption}
                    setSelectedOptionSelect={setSelectedOptionSelect}
                    options={optionsToSelect} />

                ) :
                (<></>)
              }

            </div>

            <HeaderMessage
              name={ticket?.user?.name as string}
              email={ticket?.user?.email as string}
              data={ConvertDate(ticket?.createdAt.toString() as string)}
              content={ticket?.content as string}
            />

            <Messages messages={messages} />

            <div className="type-new-message-for-response">
              {ticket?.status === "FINALIZADO" ? (
                <Button
                  label="Voltar"
                  onClick={backToListPage}
                  type="button"
                  buttonClassStyle="button-login button-back-home width-100"
                />
              ) : (
                <>

                  <TextArea value={description} onChange={setDescription} />

                  <div className="button-add-message-container">
                    <Button
                      label="Enviar"
                      onClick={AddMessage}
                      type="button"
                      buttonClassStyle="button-login" />

                    <Button
                      label="Voltar"
                      onClick={backToListPage}
                      type="button"
                      buttonClassStyle="button-login button-back-home" />

                  </div>
                </>
              )
              }
            </div>
          </div>
        </div>
      </>
    ) : <></>
  );
}
