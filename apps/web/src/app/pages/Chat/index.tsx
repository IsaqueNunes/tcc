import { SearchUserExistsTicketDto } from 'libs/models/search-user-exists-ticket-dto';
import { AuthDataDto } from 'libs/models/auth-data-dto';
import { DropdownDto} from 'libs/models/dropdown-dto';
import { MessageWithUser } from 'libs/models/message-with-user';
import { TicketMessage } from 'libs/models/ticket-message';
import { MessageWithStatusDto } from 'libs/models/message-with-status-dto';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConvertDate } from '../../util/validate';
import './chat.css';
import { getData, postData } from '../../services/ApiService';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Messages from '../../components/Messages';
import HeaderMessage from './HeaderMessage';
import TextArea from '../../components/TextArea';

export default function Chat() {
  const { id } = useParams();
  const user_data: AuthDataDto = JSON.parse(localStorage.getItem('authData') || '');
  const navigate = useNavigate();
  const [canSeeMessage, setCanSeeThisMessage] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [ticket, setTicket] = useState<TicketMessage>();
  const [description, setDescription] = useState<string>('');
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const optionsToSelect: DropdownDto[] =
    [{label: 'Aberto', value: 'ABERTO'}, {label: 'Em Análise', value: 'EM_ANALISE'}, {label: 'Concluído', value: 'FINALIZADO'}]
  const isAdmin = (user_data.email as string).includes('tecnico.ifms');

  function scrollMessageDiv() {
    // const element = document.getElementById('message-list') as HTMLElement;
    // element.scrollTo(
    //   {top: element.scrollHeight,
    // behavior: 'auto'});
  }

  useEffect(() => {
    async function verifyIfUserCanSeeMessage() {
      if(!isAdmin) {
        const userToSearch: SearchUserExistsTicketDto = {
          email: user_data.email,
          id: Number(id)
        }

        let retorno = await postData('tickets/can-see-message', userToSearch);

        if(!(retorno.data)) {
          navigate('/user/my-tickets');
          } else {
            setCanSeeThisMessage(true);
          }
      }
    }

    verifyIfUserCanSeeMessage();
  }, []);

  useEffect(() => {
    async function GetTickets() {
      let retorno = await getData('/tickets/', id);
      setTicket(retorno.data);
      scrollMessageDiv();
      setSelectedOption(retorno.data.status);
      setMessages(retorno.data.Message);
    }

    GetTickets();
  }, []);


  const AddMessage = async () => {
    if(description !== '') {
      const message = createModelMessage();

      await postData('/message', message);

      setMessages([...messages, message]);
      setDescription('');
      // scrollMessageDiv();
    }
  };

  const createModelMessage = (): MessageWithStatusDto  => {
      const message: MessageWithStatusDto = {
        content: description,
        user: {
          id: user_data.id,
          email: user_data.email,
          name: user_data.name,
        },
        repliedMessageId: ticket?.Message.length === 0 ? null
          : ticket?.Message[(ticket?.Message?.length || 1) - 1].id,
        ticketId: Number(id),
        time: new Date(),
        status: selectedOption
      };

      return message;
  }

  const setSelectedOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const backToListPage = () => {
    if (isAdmin) { navigate('/admin/tickets'); } else { navigate('/user/my-tickets'); }
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
            {ticket?.status !== "FINALIZADO" && isAdmin ?
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

              <TextArea value={description} onChange={setDescription}  />

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
