import { Prisma, User } from "@prisma/client";

export type MessageWithStatusDto = {
  id?: number | undefined;
  content: string;
  time?: string | Date | undefined;
  user?: User;
  ticketId: number;
  Message?: Prisma.MessageUncheckedCreateNestedManyWithoutRepliedMessageInput | undefined;
  repliedMessageId?: number | null | undefined;
  status: string;
}
