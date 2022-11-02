/* eslint-disable jsx-a11y/no-autofocus */
import { Prisma, Ticket } from '@prisma/client';
// import { TypeOfHeader } from 'libs/enum/type-of-header-enum';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './create-ticket.css';

export default function CreateTicket() {
  const navigate = useNavigate();
  const user_data: any = JSON.parse(localStorage.getItem('authData') || '');
  const usuario_invalido = !(user_data.email as string).includes('@estudante.ifms.edu.br');
  if(usuario_invalido) {
    navigate('/admin/tickets')
  }
  const [title, setTitle] = useState<string>('');
  const [content, setDescription] = useState<string>('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  // const isNotAdminUser = false;
  // TODO: verify if logged user is not admin, and it's, redirect to normal admin page

  const ticket: Prisma.TicketUncheckedCreateInput = {
    title,
    content,
    userId: user_data.id,
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

    navigate('/user/my-tickets');
  };

  return (
    !usuario_invalido ? (
      <>
      <Header typeOfHeader={'user'} />
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
            onClick={() => navigate('/user/my-tickets')}
            type="button"
            buttonClassStyle="button-login button-back-home"
          />
        </div>
      </div>
    </>)
      :
      <></>
    );
}
