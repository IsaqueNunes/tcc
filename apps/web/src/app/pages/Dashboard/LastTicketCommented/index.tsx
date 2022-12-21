import { Ticket } from '@prisma/client';
import { colorStatus, nameStatus } from 'libs/models/status';
import Card from '../../../components/Card';
import './last-ticket-commented.css';

type Props = {
  ticket: Ticket
}

type Status = "ABERTO" | "EM_ANALISE" | "FINALIZADO";

export default function LastTicketCommented({ ticket }: Props) {
  return (
    <div className="last-ticket-commented">
      {ticket != null ?
        <>
          <h3>Última reclamação comentada</h3>
          <Card
            isFromDashboard
            titleCard={ticket.title}
            subtitle=""
            bodyContent={ticket.content}
            hexColorStatus={colorStatus[ticket.status as Status]}
            nameStatus={nameStatus[ticket.status as Status]}
            onClickCard={() => { }}
          />
        </>
        :
        <h3 className="text-with-no-commented-tickets">
          Nenhuma reclamação comentada, ainda.
        </h3>
      }
    </div>
  )
}
