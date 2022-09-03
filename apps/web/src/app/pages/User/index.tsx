// import { User as UserModel } from '@prisma/client';
// import { useEffect, useState } from 'react';

import { Ticket } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Image from '../../components/Image';
import './user.css';

export default function User() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();

  const RedirectToCreateTicket = () => {
    navigate('create-ticket');
  };

  const RedirectToTicketContent = (ticketId: number) => {
    const ticketIdConverted = ticketId.toString();
    navigate('/chat/'.concat(ticketIdConverted));
  };

  useEffect(() => {
    fetch('/api/tickets')
      .then((_) => _.json())
      .then(setTickets);
  }, []);

  return (
    <section className="user-main-content">
      <Header typeOfHeader="modify" />
      <div className="ticket-list-content">
        <div className="ticket-title-content">
          <h1 className="ticket-title">Reclamações</h1>
          <Button type="button" onClick={RedirectToCreateTicket} label="Nova Reclamação" buttonClassStyle="button-login ticket" />
        </div>
        <div className="ticket-list-search-content">
          <input type="search" placeholder="Procure pela sua reclamação" className="input-search" />
          <div className="buttons-container">
            <div className="search-button">
              <Image source="search.svg" width="20" height="20" nameLazyLoad="search icon" />
            </div>
            <div className="filter-button">
              <Image source="filter.svg" width="13" height="10" nameLazyLoad="filter icon" />
              Filtrar
            </div>
          </div>
        </div>
        <div className="list-card">
          {tickets.map((ticket: Ticket) => (
            <Card
              key={ticket.id}
              titleCard={ticket.title}
              bodyContent={ticket.content}
              hexColorStatus="#FAE52D"
              nameStatus={ticket.status}
              onClickCard={() => RedirectToTicketContent(ticket.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
