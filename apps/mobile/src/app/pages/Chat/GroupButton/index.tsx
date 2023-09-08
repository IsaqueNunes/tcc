import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import Button from "../../../components/Button";
import { commonStyles } from "../../../styles/styles";
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
      <Button style={{ backgroundColor: '#C82733' }} onPress={backToLastPage}>
        <Text style={commonStyles.text}>Voltar</Text>
      </Button>
    ) : (
      <View style={style.groupButtonContainer}>
        <Button style={{ backgroundColor: '#3B7DED', width: '40%' }} onPress={sendMessage}>
          <Text style={commonStyles.text}>Enviar</Text>
        </Button>
        <Button style={{ backgroundColor: '#C82733', width: '40%' }} onPress={backToLastPage}>
          <Text style={commonStyles.text}>Voltar</Text>
        </Button>
      </View>
    )
  )
}
