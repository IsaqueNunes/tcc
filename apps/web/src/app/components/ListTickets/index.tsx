import { Ticket } from '@prisma/client';
import { FilterTicketDto } from 'libs/models/filter-ticket-dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Card from '../Card';
import Header from '../Header';
import Image from '../Image';
import './list-tickets.css';

type ListTicketsProps = {
  isAdminRoute: boolean,
};

export default function ListTickets({ isAdminRoute }: ListTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTicket, setSearchTicket] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<'title' | 'content'>('title');
  const id = '04b3109e-2b82-49fc-b4f4-0f94c5148907';
  const navigate = useNavigate();

  const RedirectToCreateTicket = () => {
    navigate('/user/create-ticket');
  };

  const RedirectToTicketContent = (ticketId: number) => {
    const ticketIdConverted = ticketId.toString();
    navigate('/chat/'.concat(ticketIdConverted));
  };

  useEffect(() => {
    if (isAdminRoute) {
      fetch('/api/tickets')
        .then((_) => _.json())
        .then(setTickets);
    } else {
      fetch('/api/tickets/by-user/'.concat(id != null ? id : ''), {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      })
        .then((_) => _.json())
        .then(setTickets);
    }
  }, [isAdminRoute]);

  const searchByTitleOrDescription = () => {
    const filterOptions: FilterTicketDto = {
      filter: selectedOption,
      contentToSearch: searchTicket,
    };
    fetch('/api/tickets/filter', {
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body:
        JSON.stringify(filterOptions),
    })
      .then((_) => _.json())
      .then(setTickets);
  };

  const setSelectedOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="user-main-content">
      <Header typeOfHeader="user" />
      <div className="ticket-list-content">
        <div className="ticket-title-content">
          <h1 className="ticket-title">Reclamações</h1>
          {!isAdminRoute && (
            <Button type="button" onClick={RedirectToCreateTicket} label="Nova Reclamação" buttonClassStyle="button-login ticket" />
          )}
        </div>
        <div className="ticket-list-search-content">
          <input
            type="search"
            placeholder="Procure pela sua reclamação"
            className="input-search"
            onChange={(event) => setSearchTicket(event.target.value)}
          />
          <div className="buttons-container">
            <div className="search-button" onClick={searchByTitleOrDescription} role="button" aria-hidden="true">
              <Image source="search.svg" width="20" height="20" nameLazyLoad="search icon" />
            </div>
            {/* <div className="filter-button">
              <Image source="filter.svg" width="13" height="10" nameLazyLoad="filter icon" />
              Filtrar
            </div> */}
            <select
              name="filter"
              value={selectedOption}
              onChange={setSelectedOptionSelect}
              className="filter-button"
              aria-label="State"
              id="filter-options"
              placeholder="Filter options"
            >
              <option value="title">Título</option>
              <option value="content">Descrição</option>
            </select>
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
