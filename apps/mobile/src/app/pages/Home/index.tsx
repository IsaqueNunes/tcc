import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Ticket from "../../components/Tickets/Ticket";
import { DropdownDto } from "../../models/DropdownDto";
import { UserInformationDto } from "../../models/UserHome/UserHomeDto";
import { getData } from "../../services/ApiService";
import { greetingToTimeOfDay } from "../../shared/util/validator";
import { commonStyles } from "../../styles/styles";
import CardsCounting from "./CardsCounting";
import { common, styles } from "./styles";


export default function Home() {
  const [userInformation, setUserInformation] = useState<UserInformationDto>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function getDataFromUser() {
      let retorno = await getData('/tickets/user-ticket-information/', '83d931d4-3f38-4f88-ab17-8fc7ffbfda9a');
      const responseDatabase: UserInformationDto = retorno.data;
      setUserInformation(responseDatabase);
    }

    getDataFromUser();
  }, []);

  function navigateToCreateTicket() {
    navigation.navigate('CreateTicket');
  }
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.greetingTitle}>{greetingToTimeOfDay() + ', Rafael'}</Text>

      <Text style={[commonStyles.titleBlack, { marginBottom: 20 }]}>Suas reclamações...</Text>

      {userInformation?.cardsCounting &&
        <CardsCounting countingData={userInformation.cardsCounting} />
      }

      <Text style={styles.lastTicketCommented}>Última reclamação comentada</Text>
      {userInformation &&
        !(userInformation?.lastMessageCommented) ? (
        <View>
          <Text style={common.size12}>Nenhuma reclamação comentada ainda</Text>

          <Text style={styles.createNewTicketMessage}>Deseja criar uma reclamação?</Text>

          <Button label={"Criar"} icon={'arrowright'} onClick={navigateToCreateTicket} />
        </View>
      ) : (
        <Ticket
          id={userInformation?.lastMessageCommented?.ticketId.toString()}
          title={userInformation?.lastMessageCommented?.ticket.title}
          content={userInformation?.lastMessageCommented?.ticket.content}
          status={userInformation?.lastMessageCommented?.ticket.status} />
      )
      }

    </View>
  )
}
