import { Ticket } from '@prisma/client';
import { FilterTicketDto } from 'libs/models/filter-ticket-dto';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownDto } from 'libs/models/dropdown-dto';
import { User, IsAdmin, getUser } from '../../util/constants';
import { getData, postData } from '../../services/ApiService';
import Button from '../Button';
import Header from '../Header';
import Tickets from './Tickets';
import Select from '../Select';
import Input from '../Input';
import SearchButton from '../SearchButton';
import './list-tickets.css';

export default function ListTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTicket, setSearchTicket] = useState<string>('');
  const user = useMemo(() => getUser(), []);

  const [selectedOption, setSelectedOption] = useState<'title' | 'content'>('title');
  const optionsToSelect: DropdownDto[] = [{ label: 'Título', value: 'title' }, { label: 'Descrição', value: 'content' }]
  const navigate = useNavigate();

  const RedirectToCreateTicket = () => {
    navigate('/user/create-ticket');
  };

  useEffect(() => {
    async function pegarDados() {
      let endPoint = '/tickets' + (IsAdmin ? '' : '/by-user/');
      let body = IsAdmin ? '' : user.email
      let retorno = await getData(endPoint, body);
      setTickets(retorno.data);
    }
    pegarDados();

  }, []);

  const searchByTitleOrDescription = async () => {
    const filterOptions: FilterTicketDto = {
      filter: selectedOption,
      contentToSearch: searchTicket,
      userEmail: User.email
    };
    let retorno = await postData('/tickets/filter', filterOptions);

    setTickets(retorno.data);
  };

  const setSelectedOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="user-main-content">

      <Header typeOfHeader={IsAdmin ? 'admin' : 'user'} />

      <div className="ticket-list-content">
        <div className="ticket-title-content">
          <h1 className="ticket-title">Reclamações</h1>

          {!IsAdmin &&
            <Button type="button" onClick={RedirectToCreateTicket} label="Nova Reclamação" buttonClassStyle="button-login ticket" />
          }

        </div>
        <div className="ticket-list-search-content">

          <Input value={searchTicket} onChange={setSearchTicket} placeholder={"Procure pela sua reclamação"} />

          <div className="buttons-container">

            <SearchButton onClick={searchByTitleOrDescription} />

            <Select selectedOption={selectedOption} setSelectedOptionSelect={setSelectedOptionSelect} options={optionsToSelect} />

          </div>
        </div>

        <Tickets tickets={tickets} />

      </div>
    </section>
  );
}
