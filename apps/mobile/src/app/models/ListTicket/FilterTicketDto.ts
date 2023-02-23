export type FilterTicketDto = {
  filter: 'title' | 'content'
  contentToSearch: string
  userEmail: string
}
