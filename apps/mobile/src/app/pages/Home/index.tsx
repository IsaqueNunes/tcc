import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Ticket from "../../components/Tickets/Ticket";
import { greetingToTimeOfDay } from "../../shared/util/validator";
import { commonStyles } from "../../styles/styles";
import CardsCounting from "./CardsCounting";
import { common, styles } from "./styles";


export default function Home() {
  const hasNotCommentedYet = true;
  const navigation = useNavigation<any>();

  function navigateToCreateTicket() {
    navigation.navigate('CreateTicket');
  }
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.greetingTitle}>{greetingToTimeOfDay() + ', Rafael'}</Text>

      <Text style={[commonStyles.titleBlack, { marginBottom: 20 }]}>Suas reclamações...</Text>

      <CardsCounting />

      <Text style={styles.lastTicketCommented}>Última reclamação comentada</Text>

      {hasNotCommentedYet ? (
        <View>
          <Text style={common.size12}>Nenhuma reclamação comentada ainda</Text>

          <Text style={styles.createNewTicketMessage}>Deseja criar uma reclamação?</Text>

          <Button label={"Criar"} icon={'arrowright'} onClick={navigateToCreateTicket} />
        </View>
      ) : (
        <Ticket id={""} title={""} content={""} status={""} />
      )}
    </View>
  )
}
