import { FilterDto } from "./FilterDto"

export type FilterTicketDto = {
  filter: FilterDto,
  contentToSearch: string
  userEmail: string
}
