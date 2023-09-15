import * as yup from 'yup';

export const SearchValidationSchema = yup.object().shape({
  search: yup.string().required('É necessário informar o título ou a descrição que deseja buscar.'),
  filter: yup.string().required('É necessário informar um valor para o filtro')
})

export const CreateTicketValidationSchema = yup.object().shape({
  title: yup.string().required('É necessário informar o título da reclamação.'),
  content: yup.string().required('É necessário informar o conteúdo da reclamação. É por meio dela que compreenderemos o seu problema.')
})

export const SendMessageValidationSchema = yup.object().shape({
  content: yup.string().required(),
  status: yup.string().required()
})
