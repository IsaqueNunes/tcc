import { Prisma, User } from '@prisma/client';
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
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketMessage>();
  const [description, setDescription] = useState<string>('');
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const isAdmin = true; // TODO: add request to verify when user is admin

  useEffect(() => {
    fetch('/api/tickets/'.concat(id != null ? id : ''))
      .then((_) => _.json())
      .then(setTicket);
    setMessages(ticket?.Message || []);
  }, [id, ticket?.Message]);

  const AddMessage = () => {
    const message: Prisma.MessageUncheckedCreateInput = {
      content: description,
      userId: '156de89d-5458-45c7-9939-170ed851aea2',
      repliedMessageId: ticket?.Message.length === 0 ? null
        : ticket?.Message[(ticket?.Message?.length || 1) - 1].id,
      ticketId: Number(id),
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

  const backToListPage = () => {
    if (isAdmin) { navigate('/admin/tickets'); } else { navigate('/user/my-tickets'); }
  };

  return (
    <>
      <Header typeOfHeader="user" />
      <div className="ticket-chat-page">
        <div className="ticket-chat-page-content">
          <div className="title-content">
            <h1>
              {' '}
              {ticket?.title}
            </h1>
            {isAdmin && (
            <select name="status" id="status-select" aria-label="status-select">
              <option disabled defaultValue="">Selecione um status</option>
              <option value="1">Aberto</option>
              <option value="2">Em análise</option>
              <option value="3">Concluído</option>
            </select>
            )}

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
  );
}
