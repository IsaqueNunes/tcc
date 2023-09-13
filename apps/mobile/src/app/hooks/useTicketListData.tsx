import { useQuery } from 'react-query';
import { SearchValidationSchema } from '../components/TicketList';
import { FilterDto } from '../models/ListTicket/FilterDto';
import { FilterTicketDto } from '../models/ListTicket/FilterTicketDto';
import { SearchTicketDto } from '../models/ListTicket/SearchTicketDto';
import { postData } from '../services/ApiService';

const getInitialData = async ({ filter }: { filter: string }) => {
  const searchTicket: SearchTicketDto = {
    filter: filter ?? '',
    emailFromUser: 'rafael.veiga@estudante.ifms.edu.br'
  }
  // implementation error
  const result = await postData('/tickets/tickets-by-filter/', searchTicket);
  return result;
};

const getDataByFilter = async ({ search, filter }: SearchValidationSchema) => {
  if (!search && !filter) {
    const initialData = await getInitialData({ filter });
    return initialData;
  }

  const filterOptions: FilterTicketDto = {
    filter: filter as FilterDto,
    contentToSearch: search,
    userEmail: 'rafael.veiga@estudante.ifms.edu.br'
  };
  // implementation error
  const result = await postData('/tickets/filter', filterOptions);
  return result;
};


export const useTicketListData = (data: SearchValidationSchema) => {
  return useQuery(['getTicketList', data], async () => getDataByFilter(data));
}

