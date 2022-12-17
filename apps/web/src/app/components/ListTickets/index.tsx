import { Ticket } from '@prisma/client';
import { FilterTicketDto } from 'libs/models/filter-ticket-dto';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropdownDto }  from 'libs/models/dropdown-dto';
import Button from '../Button';
import Header from '../Header';
import Image from '../Image';
import './list-tickets.css';
import { getData, postData } from '../../services/ApiService';
import Tickets from './Tickets';
import Select from '../Select';
import Input from '../Input';
import SearchButton from '../SearchButton';

type ListTicketsProps = {
  isAdminRoute: boolean,
};

export default function ListTickets({ isAdminRoute }: ListTicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [searchTicket, setSearchTicket] = useState<string>('');

  const [selectedOption, setSelectedOption] = useState<'title' | 'content'>('title');
  const optionsToSelect: DropdownDto[] = [{label: 'Título', value: 'title'}, {label: 'Descrição', value: 'content'}]
  const navigate = useNavigate();
  const user_data: any = JSON.parse(localStorage.getItem('authData') || '');
  const usuario_administrativo = (user_data.email as string).includes('tecnico.ifms');
  const id = user_data.id;

  const RedirectToCreateTicket = () => {
    navigate('/user/create-ticket');
  };

  useEffect(() => {
    async function pegarDados() {
      const ehAdministrativoVendo = isAdminRoute && usuario_administrativo
      let endPoint = '/tickets' + (ehAdministrativoVendo ? '' : '/by-user/');
      let retorno = await getData(endPoint, ehAdministrativoVendo ? '' : id);
      setTickets(retorno.data);
    }
    pegarDados();

  }, []);

  const searchByTitleOrDescription = async () => {
    const filterOptions: FilterTicketDto = {
      filter: selectedOption,
      contentToSearch: searchTicket,
    };
    let retorno = await postData('/tickets/filter', filterOptions);

    setTickets(retorno.data);
  };

  const setSelectedOptionSelect = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <section className="user-main-content">

      <Header typeOfHeader={isAdminRoute ? 'admin' : 'user'} />

      <div className="ticket-list-content">
        <div className="ticket-title-content">
          <h1 className="ticket-title">Reclamações</h1>

          {!isAdminRoute && (
            <Button type="button" onClick={RedirectToCreateTicket} label="Nova Reclamação" buttonClassStyle="button-login ticket" />
          )}

        </div>
        <div className="ticket-list-search-content">

          <Input value={searchTicket} onChange={setSearchTicket} placeholder={"Procure pela sua reclamação"} />

          <div className="buttons-container">
            <SearchButton onClick={searchByTitleOrDescription}  />

            <Select selectedOption={selectedOption} setSelectedOptionSelect={setSelectedOptionSelect} options={optionsToSelect}  />

          </div>
        </div>

        <Tickets tickets={tickets} />
      </div>
    </section>
  );
}
