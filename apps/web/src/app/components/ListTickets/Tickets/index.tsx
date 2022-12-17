import { Ticket } from "@prisma/client";
import { useNavigate } from "react-router-dom";
import { colorStatus, nameStatus }  from 'libs/models/status';
import Card from "../../Card";
import './tickets.css';

type Status = "ABERTO" | "EM_ANALISE" | "FINALIZADO";

type Props = {
    tickets: Ticket[];
}

export default function Tickets({tickets}:Props) {
const navigate = useNavigate();
  const RedirectToTicketContent = (ticketId: number) => {
      const ticketIdConverted = ticketId.toString();
      navigate('/chat/'.concat(ticketIdConverted));
    };

    return(
      <div className="list-card">
          {tickets.map((ticket: Ticket) => (
            <Card
            key={ticket.id}
            titleCard={ticket.title}
            bodyContent={ticket.content}
            hexColorStatus={colorStatus[ticket.status as Status]}
            nameStatus={nameStatus[ticket.status as Status]}
            onClickCard={() => RedirectToTicketContent(ticket.id)}
            />
            ))}
        </div>
    )
}
