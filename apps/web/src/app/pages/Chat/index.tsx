import { Message as MessageType, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Message from '../../components/Message';
import './chat.css';

interface TicketMessage {
  id: number
  title: string
  content: string
  status: string
  createdAt: Date
  closedAt: Date | null
  userId: string
  Message: MessageType[];
}

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<TicketMessage>();
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    fetch('/api/tickets/'.concat(id != null ? id : ''))
      .then((_) => _.json())
      .then(setTicket);
  }, [id]);

  const AddMessage = () => {
    const message: Prisma.MessageUncheckedCreateInput = {
      content: description,
      userId: 'c9668c52-40ce-4fd9-bc6d-555c6e8dbce9',
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
  };
  return (
    <>
      <Header typeOfHeader="modify" />
      <div className="ticket-chat-page">
        <div className="ticket-chat-page-content">
          <div className="title-content">
            <h1>
              {' '}
              {ticket?.title}
            </h1>
            <select name="status" id="status-select">
              <option value="" disabled selected>Selecione um status</option>
              <option value="1">teste</option>
            </select>
          </div>
          <div className="message-list">
            <div className="first-message">
              <div className="top-content">
                <div className="name-email">
                  <h3><strong>Felipe Araújo</strong></h3>
                  <span>felipe.araujo@estudante.ifms.edu.br</span>
                </div>
                <h5 className="no-wrap">{ticket?.createdAt?.toString()}</h5>
              </div>
              <div className="body-content">
                <strong>
                  {ticket?.content}
                </strong>
              </div>
            </div>
            {ticket?.Message.map((message: MessageType) => (
              <Message
                messageContent={message.content}
                messageCreatedDate={message.time.toString()}
              />
            ))}
          </div>
          <div className="type-new-message-for-response">
            <textarea
              name="message"
              id="message"
              onChange={(event) => setDescription(event.target.value)}
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
                onClick={() => navigate('/user')}
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
