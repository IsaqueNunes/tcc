import { Prisma, Ticket } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../services/ApiService';
import { User, IsAdmin } from '../../util/constants';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import './create-ticket.css';

export default function CreateTicket() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setDescription] = useState<string>('');

  useEffect(() => {
    function denyUserIfRouteNotMatch() {
      if (IsAdmin) {
        navigate('/admin/tickets')
      }
    }

    denyUserIfRouteNotMatch();
  }, []);

  const addTicket = async () => {
    const ticket: Prisma.TicketUncheckedCreateInput = {
      title,
      content,
      userId: User.id,
    };

    await postData('/tickets', ticket);

    navigate('/user/my-tickets');
  };

  return (
    !IsAdmin ? (
      <>
        <Header typeOfHeader={'user'} />
        <div className="main-ticket-content">
          <h1 className="ticket-create-title">Registrar reclamação</h1>
          <form className="input-group">

            <label className="width-adjust-100" htmlFor="title">
              Título
              <Input value={title} onChange={setTitle} />
            </label>

            <label className="width-adjust-100" htmlFor="title">
              Explique-nos o que aconteceu:
              <TextArea value={content} onChange={setDescription} />
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
