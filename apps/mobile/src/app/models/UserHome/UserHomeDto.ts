import { DropdownDto } from '../DropdownDto';
import { Message, Ticket } from "@prisma/client";

export type UserInformationDto = {
  cardsCounting: DropdownDto[],
  lastMessageCommented: Message & {
    ticket: Ticket;
  }
}
