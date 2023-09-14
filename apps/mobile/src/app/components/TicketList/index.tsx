import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { styles } from "./styles";
import Tickets from "../../components/Tickets";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useForm } from "react-hook-form";
import { SearchValidationSchema } from '../../shared/util/yupResolvers';
import { InferType } from "yup";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import { useTicketListData } from "../../hooks/useTicketListData";
import Select from "../Select";
import ErrorMessage from "../ErrorMessage";

type ParamList = {
  params: {
    filter: string
  }
}

export type SearchValidationSchema = InferType<typeof SearchValidationSchema>;

export default function TicketList() {
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const { getValues, control, formState: { errors }, handleSubmit } = useForm<SearchValidationSchema>({ resolver: yupResolver(SearchValidationSchema) });

  const { data, isLoading, refetch } = useTicketListData({ filter: route.params?.filter ?? getValues().filter, search: getValues().search });

  return (
    <View style={styles.homeContainer}>
      <View style={{ marginTop: 10 }}>
        <Input
          placeholder={'Ex: Programas faltando'}
          control={control}
          error={errors?.search !== undefined}
          id={"search"}
        />

        {errors?.search && (
          <ErrorMessage message={errors.search.message} />
        )}


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, }}>

          <Select
            items={[
              { label: 'Título', value: 'title' },
              { label: 'Descrição', value: 'content' }
            ]}
            name={"filter"}
            control={control}
            error={errors?.filter !== undefined}
          />


          <Button style={{ width: '20%', backgroundColor: 'white', justifyContent: 'center', borderWidth: 1 }} onPress={handleSubmit(refetch)}>
            <AntDesign name={'search1'} size={24} color={'black'} />
          </Button>

        </View>
        {errors?.filter && (
          <ErrorMessage message={errors.filter.message} />
        )}
        {!isLoading && (
          <Tickets tickets={data.data} />
        )}
      </View>
    </View>
  )
}
