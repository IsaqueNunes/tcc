import { CreateTicketDto } from "../models/CreateTicket/CreateTicketDto";
import { FilterTicketDto } from "../models/ListTicket/FilterTicketDto";
import { SearchTicketDto } from "../models/ListTicket/SearchTicketDto";
import { getData, postData } from "./ApiService";

export async function getCommonUserInformation(userEmail: string) {
  return getData('/tickets/user-ticket-information/', userEmail);
}

export async function createTicket(ticket: CreateTicketDto) {
  return postData('/tickets', ticket);
}

export async function getInitialDataFromTicketList(searchTicket: SearchTicketDto) {
  return postData('/tickets/tickets-by-filter/', searchTicket);
}

export async function getDataFromFilterInTicketList(filterOptions: FilterTicketDto) {
  return postData('/tickets/filter', filterOptions);
}
