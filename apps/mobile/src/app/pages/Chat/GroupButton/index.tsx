import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import Button from "../../../components/Button";
import { style } from "./styles";

type Props = {
  sendMessage: () => void,
  isFinishedStatus?: boolean,
}

export default function GroupButton({ sendMessage, isFinishedStatus = false }: Props) {
  const navigation = useNavigation<any>();

  async function backToLastPage() {
    navigation.navigate('TicketList');
  }

  return (
    isFinishedStatus ? (
      <Button label={'Voltar'} width='100%' backgroundColor='#C82733' onClick={backToLastPage} />
    ) : (
      <View style={style.groupButtonContainer}>
        <Button label={'Enviar'} width='45%' backgroundColor='#3B7DED' onClick={sendMessage} />
        <Button label={'Voltar'} width='45%' backgroundColor='#C82733' onClick={backToLastPage} />
      </View>
    )
  )
}
