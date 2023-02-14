import { CommonActions, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { style } from './styles';

type Props = {
  label: string,
  counting: string
}

export default function CardCounting({ label, counting }: Props) {
  const navigation = useNavigation<any>();
  const labelToFilter = {
    'Criadas': '',
    'Em Aberto': 'ABERTO',
    'Em Progresso': 'EM_ANALISE',
    'Resolvidas': 'FINALIZADO'
  }

  function redirectoToListTicketBasedLabelFiltered() {
    navigation.dispatch(CommonActions.reset({
      index: 0,
      routes: [{ name: 'TicketList', params: { filter: labelToFilter[label] } }]
    }))
  }

  return (
    <TouchableOpacity style={style.cardContainer} onPress={redirectoToListTicketBasedLabelFiltered}>
      <Text style={style.label}>{label}</Text>
      <Text style={style.counting}>{counting}</Text>
    </TouchableOpacity>
  )
}
