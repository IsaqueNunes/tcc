import * as yup from 'yup';

export const SearchValidationSchema = yup.object().shape({
  search: yup.string().required('É necessário informar o título ou a descrição que deseja buscar.'),
  filter: yup.string().required('É necessário informar um valor para o filtro')
})
