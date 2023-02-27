import { Injectable } from '@nestjs/common';
import {
  Prisma, PrismaClient, PrismaPromise, Ticket,
} from '@prisma/client';
import { FilterTicketDto } from 'libs/models/filter-ticket-dto';
import { AdminDashboardInformationDto } from 'libs/models/admin-dashboard-information-dto';
import { UserInformationDto } from 'libs/models/user-information-dto';
import { DropdownDto } from 'libs/models/dropdown-dto';
import { ChartDataDto } from 'libs/models/chart-data-dto';
import { SearchTicketDto } from 'libs/models/search-ticket-dto';
import { CreateTicketDto } from 'libs/models/create-ticket-dto';

@Injectable()
export class TicketsService {
  private prisma = new PrismaClient();

  public async create(ticket: CreateTicketDto): Promise<Ticket> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: ticket.email
      }
    })

    const finalTicket: Prisma.TicketUncheckedCreateInput = {
      content: ticket.content,
      title: ticket.title,
      userId: user.id
    }

    return this.prisma.ticket.create({ data: { ...finalTicket } });
  }

  public update(
    id: number,
    updatedTicket: Prisma.TicketUncheckedUpdateInput,
  ): Promise<Ticket> {
    return this.prisma.ticket.update({
      where: { id },
      data: { ...updatedTicket },
    });
  }

  public changeStatus(id: number, status: string) {
    if (status === 'FINALIZADO') {
      this.prisma.ticket.update({
        where: { id },
        data: {
          status,
          closedAt: new Date(),
        },
      });
    }

    this.prisma.ticket.update({
      where: { id },
      data: { status }
    });
  }

  public find(id: number): Promise<Ticket> {
    return this.prisma.ticket.findUnique({
      where: { id },
      include: {
        Message:
        {
          include: {
            user: true
          }
        },
        user: true
      },
    });
  }

  public async getTicketsByFilter(searchFilter: SearchTicketDto): Promise<Ticket[]> {
    let tickets: Ticket[] = [];
    const user = await this.prisma.user.findFirst({
      where: {
        email: searchFilter.emailFromUser
      }
    })

    if (searchFilter.emailFromUser.includes('@estudante.ifms.edu.br')) {
      const ticketsFiltered = await this.prisma.ticket.findMany({
        orderBy: { createdAt: 'desc' },
        where: {
          userId: user.id
        }
      });
      tickets.push(...ticketsFiltered);
    } else {
      const ticketsFiltered = await this.prisma.ticket.findMany();
      tickets.push(...ticketsFiltered);
    }

    if (searchFilter.filter !== '') {
      tickets = tickets.filter(ticket => ticket.status === searchFilter.filter);
    }

    return tickets;
  }

  public findFirst(id: number): Promise<Ticket> {
    return this.prisma.ticket.findFirst({
      where: { id }
    });
  }

  public list(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  public async filterTicketsByFilterChoosed(
    { filter, contentToSearch, userEmail }: FilterTicketDto,
  ): Promise<Ticket[]> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: userEmail
      }
    })

    return this.prisma.ticket.findMany({
      where: {
        ...(contentToSearch !== '' ? {
          [filter]: {
            contains: contentToSearch,
            mode: 'insensitive',
          },
        } : {}),
        ...(userEmail.includes("@estudante.ifms.edu.br") ? { userId: user.id } : {})
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public findByUser(email: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        user: { email },
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  public async verifyIfUserParticipateThisTicket(email: string, id: number): Promise<boolean> {
    const findTicket = await this.prisma.ticket.findFirst({
      where: {
        user: { email },
        id: id
      }
    });

    return findTicket !== null;
  }

  public async adminDashboardInformation(id: string): Promise<AdminDashboardInformationDto> {
    const openingTicketsCounting = await this.prisma.ticket.count({
      where: {
        status: 'ABERTO',
      },
    });

    const lastMessageCommented = await this.prisma.message.findFirst({
      include: {
        ticket: true,
      },
      where: { user: { id } },
      orderBy: {
        time: 'desc',
      },
      take: 1,
    });

    const solvedTicketsCounting = await this.prisma.ticket.count({
      where: {
        status: 'FINALIZADO',
      },
    });

    const dictionaryMonths = {
      0: 'Janeiro',
      1: 'Fevereiro',
      2: 'Marco',
      3: 'Abril',
      4: 'Maio',
      5: 'Junho',
      6: 'Julho',
      7: 'Agosto',
      8: 'Setembro',
      9: 'Outubro',
      10: 'Novembro',
      11: 'Dezembro',
    };

    const ticketList = await this.prisma.ticket.findMany({

    });


    const countingByMonth = new Array<number>(12);
    const chartData: ChartDataDto[] = [];
    for (let i = 0; i < countingByMonth.length; i += 1) {
      let counterOfOccurences = 0;
      ticketList.forEach((ticket: Ticket) => {
        if (ticket.createdAt.getMonth() === i) {
          counterOfOccurences += 1;
        }
      });
      chartData.push(
        {
          id: i + 1,
          ticketCounting: counterOfOccurences,
          month: dictionaryMonths[i],
        },
      );
    }

    const returnedData: AdminDashboardInformationDto = {
      openingTicketsCounting,
      solvedTicketsCounting,
      lastMessageCommented,
      chartData,
    };

    return returnedData;
  }

  public async userInformation(email: string): Promise<UserInformationDto> {
    const currentUser = await this.prisma.user.findFirst({
      where: { email: email }
    })
    const createdTicketCounting = await this.prisma.ticket.count({
      where: {
        userId: currentUser.id
      },
    });
    const openingTicketsCounting = await this.prisma.ticket.count({
      where: {
        status: 'ABERTO',
        userId: currentUser.id
      },
    });

    const inProgressTicketCounting = await this.prisma.ticket.count({
      where: {
        status: 'EM_ANALISE',
        userId: currentUser.id
      },
    });

    const solvedTicketsCounting = await this.prisma.ticket.count({
      where: {
        status: 'FINALIZADO',
        userId: currentUser.id
      },
    });

    const lastMessageCommented = await this.prisma.message.findFirst({
      include: {
        ticket: true,
      },
      where: { user: { id: currentUser.id } },
      orderBy: {
        time: 'desc',
      },
      take: 1,
    });

    const cardsCounting: DropdownDto[] = [
      { label: 'Criadas', value: createdTicketCounting.toString() },
      { label: 'Em Aberto', value: openingTicketsCounting.toString() },
      { label: 'Em Progresso', value: inProgressTicketCounting.toString() },
      { label: 'Resolvidas', value: solvedTicketsCounting.toString() },
    ]

    const data: UserInformationDto = {
      cardsCounting,
      lastMessageCommented
    }

    return data;
  }
}
