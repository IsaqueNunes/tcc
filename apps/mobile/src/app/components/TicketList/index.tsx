import { DrawerActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { TicketProps } from "../../components/Tickets/Ticket";
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from "./styles";
import { getData, postData } from "../../services/ApiService";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import Tickets from "../../components/Tickets";
import { SearchTicketDto } from "../../models/ListTicket/SearchTicketDto";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { FilterTicketDto } from "../../models/ListTicket/FilterTicketDto";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FilterDto } from "../../models/ListTicket/FilterDto";
import { useQuery } from "react-query";

type ParamList = {
  params: {
    filter: string
  }
}

export default function TicketList() {
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  const [inputForm, setInputForm] = useState<FormValidatorDto>(new FormValidatorDto());
  const user = GoogleSignin.getCurrentUser();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<FilterDto>('title');
  const [items, setItems] = useState([
    { label: 'Título', value: 'title' },
    { label: 'Descrição', value: 'content' }
  ]);
  const { data, isLoading, refetch } = useQuery('getTicketList', async () => {
    if (inputForm.value === '') {
      const listAll = await getInitialData();
      return listAll.data;
    }

    const listByFilter = await getDataByFilter();
    return listByFilter.data;
  })

  const getInitialData = async () => {
    const searchTicket: SearchTicketDto = {
      filter: route.params?.filter ?? '',
      emailFromUser: (await user).user.email
    }

    const result = await postData('/tickets/tickets-by-filter/', searchTicket);
    return result;
  };

  const getDataByFilter = async () => {
    const filterOptions: FilterTicketDto = {
      filter: value,
      contentToSearch: inputForm.value,
      userEmail: (await user).user.email
    };
    const result = await postData('/tickets/filter', filterOptions);
    return result;
  };

  if (isLoading) return (<></>);

  return (
    <View style={styles.homeContainer}>
      <View style={{ marginTop: 10 }}>

        <Input label={""} value={inputForm} setValue={setInputForm} placeholder={'Pesquisar por'} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={''}
            zIndex={1000}
            containerStyle={{ width: '75%' }}
          />
          {/* Move this component */}


          <Button style={{ width: '20%', backgroundColor: 'rgba(192,192,192,0.25)', justifyContent: 'center' }} onPress={() => refetch()}>
            <AntDesign name={'search1'} size={24} color={'black'} />
          </Button>

        </View>
        <Tickets tickets={data} />
      </View>
    </View>
  )
}
