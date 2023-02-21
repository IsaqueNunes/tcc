import { DrawerActions, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { TicketProps } from "../../components/Tickets/Ticket";
import { commonStyles } from "../../styles/styles";
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from "./styles";
import { getData, postData } from "../../services/ApiService";
import { FormValidatorDto } from "../../models/FormValidator/FormValidatorDto";
import Tickets from "../../components/Tickets";

type ParamList = {
  params: {
    filter: string
  }
}

export default function TicketList() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<ParamList, 'params'>>();
  // const { filter } = route.params;
  const [tickets, setTickets] = useState<TicketProps[]>([]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('title');
  const [items, setItems] = useState([
    { label: 'Título', value: 'title' },
    { label: 'Descrição', value: 'content' }
  ]);

  useEffect(() => {
    async function getTickets() {
      if (route.params?.filter) {
        let retorno = await getData('/tickets/tickets-by-filter/', route.params?.filter);
        setTickets(retorno.data);
      } else {
        let retorno = await getData('/tickets', '');
        setTickets(retorno.data);
      }
    }

    getTickets();
  }, []);

  const [searchTicket, setSearchTicket] = useState<FormValidatorDto>(new FormValidatorDto());

  return (
    <View style={styles.homeContainer}>
      <View style={{ marginTop: 10 }}>

        <Input label={""} value={searchTicket} setValue={setSearchTicket} placeholder={'Pesquisar por'} />

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

          <Button
            label={""}
            icon={"search1"}
            backgroundColor="transparent"
            width="20%"
            onlyIcon
          />

        </View>
        <Tickets tickets={tickets} />
      </View>
    </View>
  )
}
