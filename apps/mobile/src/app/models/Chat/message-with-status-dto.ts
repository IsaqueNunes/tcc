import { Prisma } from "@prisma/client";

export type MessageWithStatusDto = {
  id?: number | undefined;
  content: string;
  time?: string | Date | undefined;
  userEmail: string;
  ticketId: number;
  Message?: Prisma.MessageUncheckedCreateNestedManyWithoutRepliedMessageInput | undefined;
  repliedMessageId?: number | null | undefined;
  status: string;
}
