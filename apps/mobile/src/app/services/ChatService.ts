import { MessageWithStatusDto } from "../models/Chat/message-with-status-dto";
import { getData, postData } from "./ApiService";

export async function getChatInformation(ticketId: string) {
  return getData('/tickets/', ticketId);
}

export async function addMessage(message: MessageWithStatusDto) {
  await postData('/message', message);
}
