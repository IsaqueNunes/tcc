import {
  Body, Controller, Get, Param, Patch, Post, Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilterTicketDto } from '../../../models/filter-ticket-dto';
import { SearchUserExistsTicketDto } from '../../../models/search-user-exists-ticket-dto';
import { SearchTicketDto } from '../../../models/search-ticket-dto';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from 'libs/models/create-ticket-dto';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) { }

  @Post()
  public create(@Body() { title, content, email }: CreateTicketDto) {
    return this.ticketsService.create({ title, content, email });
  }

  @Post('filter')
  public filterTicketsByFilterChoosed(@Body() { filter, contentToSearch, userEmail }: FilterTicketDto) {
    return this.ticketsService.filterTicketsByFilterChoosed({ filter, contentToSearch, userEmail });
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() { title, content }: Prisma.TicketUncheckedUpdateInput) {
    return this.ticketsService.update(+id, { title, content });
  }

  @Patch(':id/:status')
  public changeStatus(@Param('id') id: string, @Param('status') status: string) {
    return this.ticketsService.changeStatus(+id, status.trim().toLocaleUpperCase());
  }

  @Get(':id')
  public find(@Param('id') id: string) {
    return this.ticketsService.find(Number(id));
  }

  @Post('tickets-by-filter')
  public getTicketsByFilter(@Body() searchFilter: SearchTicketDto) {
    return this.ticketsService.getTicketsByFilter(searchFilter);
  }

  @Get('by-user/:id')
  public findByUser(@Param('id') id: string) {
    return this.ticketsService.findByUser(id);
  }

  @Get('user-ticket-information/:email')
  public findUserInformationsById(@Param('email') email: string) {
    return this.ticketsService.userInformation(email);
  }

  @Post('can-see-message')
  public verifyIfUserParticipateThisTicket(@Body() { email, id }: SearchUserExistsTicketDto) {
    return this.ticketsService.verifyIfUserParticipateThisTicket(email, id);
  }

  @Get('admin-dashboard-information/:id')
  public adminDashboardInformation(@Param('id') id: string) {
    return this.ticketsService.adminDashboardInformation(id);
  }

  @Get()
  public list() {
    return this.ticketsService.list();
  }
}
