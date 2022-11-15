import { User } from "@prisma/client";
import { MessageWithUser } from "./message-with-user";

export type TicketMessage = {
  id: number
  title: string
  content: string
  status: string
  createdAt: Date
  closedAt: Date | null
  userId: string
  Message: MessageWithUser[];
  user: User;
};
