import { Prisma, User } from '@prisma/client';
import axios from 'axios';
import { SearchUserExistsTicketDto } from 'libs/models/search-user-exists-ticket-dto';
import { MessageWithStatusDto } from 'libs/models/message-with-status-dto';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Message from '../../components/Message';
import './chat.css';

type TicketMessage = {
  id: number
  title: string
  content: string
  status: string
  createdAt: Date
  closedAt: Date | null
  userId: string
  Message: MessageWithUser[];
  user: User;
};

type MessageWithUser = {
  id?: number | undefined
  content: string
  time?: string | Date | undefined;
  user?: User
  userId: string
  ticketId: number
  repliedMessageId?: number | null | undefined
  Message?: Prisma.MessageUncheckedCreateNestedManyWithoutRepliedMessageInput | undefined;
};

function ConvertDate(data: string): string {
  const date = new Date(data).toLocaleDateString();
  const time = new Date(data).toLocaleTimeString();

  return `${date} ${time}`;
}

export default function Chat() {
  const { id } = useParams();
  const user_data = JSON.parse(localStorage.getItem('authData') || '');
  const navigate = useNavigate();
  const [canSeeMessage, setCanSeeThisMessage] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [ticket, setTicket] = useState<TicketMessage>();
  const [description, setDescription] = useState<string>('');
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const isAdmin = (user_data.email as string).includes('@estudante.ifms.edu.br');

  useEffect(() => {
    if(!isAdmin) {
    const userToSearch: SearchUserExistsTicketDto = {
      email: user_data.email,
      id: Number(id)
    }
      fetch('/api/tickets/can-see-message', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(userToSearch),

      }).then((_) => _.json())
      .then((response) => {
        if(!response) {
          navigate('/user/my-tickets');
        } else {
          setCanSeeThisMessage(true);
          setSelectedOption(ticket?.status || '');
        }
      } )
  }

  }, [])

  useEffect(() => {
    fetch('/api/tickets/'.concat(id != null ? id : ''))
      .then((_) => _.json())
      .then(setTicket);
      setMessages(ticket?.Message || []);
  }, [id, ticket?.Message, ticket?.status]);

  const AddMessage = () => {
    const message: MessageWithStatusDto = {
      content: description,
      userId: user_data.id,
      repliedMessageId: ticket?.Message.length === 0 ? null
        : ticket?.Message[(ticket?.Message?.length || 1) - 1].id,
      ticketId: Number(id),
      time: new Date(),
      status: selectedOption
    };
    fetch('/api/message', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(message),
    })
      .then((_) => _.json());

    setMessages([...messages, message]);
    setDescription('');
  };

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
           <select
              name="filter"
              value={selectedOption}
              onChange={setSelectedOptionSelect}
              className="filter-button"
              aria-label="State"
              id="filter-options"
              placeholder="Filter options"
            >
              <option value="ABERTO">Aberto</option>
              <option value="EM_ANALISE">Em Análise</option>
              <option value="FINALIZADO">Concluído</option>
            </select>

          </div>
          <div className="message-list">
            <div className="first-message">
              <div className="top-content">
                <div className="name-email">
                  <h3><strong>{ticket?.user?.name}</strong></h3>
                  <span>{ticket?.user?.email}</span>
                </div>
                <h5 className="no-wrap">{ConvertDate(ticket?.createdAt.toString() as string)}</h5>
              </div>
              <div className="body-content">
                <strong>
                  {ticket?.content}
                </strong>
              </div>
            </div>
            {messages?.map((message: MessageWithUser) => (
              <Message
                key={message.id}
                messageContent={message.content}
                messageCreatedDate={ConvertDate(message?.time?.toString() || '')}
                messageAuthorName={message?.user?.name || ''}
                messageEmailAuthor={message?.user?.email || ''}
              />
            ))}
          </div>
          <div className="type-new-message-for-response">
            <textarea
              name="message"
              id="message"
              aria-label="message-send-content"
              onChange={(event) => setDescription(event.target.value)}
              value={description}
            />
            <div className="button-add-message-container">
              <Button
                label="Enviar"
                onClick={AddMessage}
                type="button"
                buttonClassStyle="button-login"
              />
              <Button
                label="Voltar"
                onClick={backToListPage}
                type="button"
                buttonClassStyle="button-login button-back-home"
              />
            </div>
          </div>
        </div>
      </div>
    </>
    ) : <></>
  );
}
