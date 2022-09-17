/* eslint-disable jsx-a11y/no-autofocus */
import { Prisma, Ticket } from '@prisma/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './create-ticket.css';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setDescription] = useState<string>('');
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const ticket: Prisma.TicketUncheckedCreateInput = {
    title,
    content,
    userId: '04b3109e-2b82-49fc-b4f4-0f94c5148907',
  };

  const addTicket = () => {
    fetch('/api/tickets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(ticket),
    })
      .then((_) => _.json())
      .then((newTicket: Ticket) => {
        setTickets([...tickets, newTicket]);
      });

    navigate('/user');
  };

  return (
    <>
      <Header typeOfHeader="modify" />
      <div className="main-ticket-content">
        <h1 className="ticket-create-title">Registrar reclamação</h1>
        <form className="input-group">
          <label className="width-adjust-100" htmlFor="title">
            Título
            <br />
            <input
              id="title"
              name="title"
              className="input-ticket-style"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label className="width-adjust-100" htmlFor="title">
            Explique-nos o que aconteceu:
            <br />
            <textarea
              style={{ resize: 'none' }}
              className="input-ticket-style"
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </form>
        <div className="button-group">
          <Button
            label="Cadastrar"
            onClick={addTicket}
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
    </>
  );
}
