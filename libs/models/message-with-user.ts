import { Prisma, User } from "@prisma/client";

export type MessageWithUser = {
  id?: number | undefined
  content: string
  time?: string | Date | undefined;
  user?: User
  ticketId: number
  repliedMessageId?: number | null | undefined
  Message?: Prisma.MessageUncheckedCreateNestedManyWithoutRepliedMessageInput | undefined;
};
