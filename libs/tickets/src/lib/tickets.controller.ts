import {
  Body, Controller, Get, Param, Patch, Post, Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { FilterTicketDto } from '../../../models/filter-ticket-dto';
import { SearchUserExistsTicketDto } from '../../../models/search-user-exists-ticket-dto';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) { }

  @Post()
  public create(@Body() { title, content, userId }: Prisma.TicketUncheckedCreateInput) {
    return this.ticketsService.create({ title, content, userId });
  }

  @Post('filter')
  public filterTicketsByFilterChoosed(@Body() { filter, contentToSearch }: FilterTicketDto) {
    return this.ticketsService.filterTicketsByFilterChoosed({ filter, contentToSearch });
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

  @Get('tickets-by-filter/:filter')
  public getTicketsByFilter(@Param('filter') filter: string) {
    return this.ticketsService.getTicketsByFilter(filter);
  }

  @Get('by-user/:id')
  public findByUser(@Param('id') id: string) {
    return this.ticketsService.findByUser(id);
  }

  @Get('user-ticket-information/:id')
  public findUserInformationsById(@Param('id') id: string) {
    return this.ticketsService.userInformation(id);
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
