import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Button from "../../components/Button";
import Ticket from "../../components/Tickets/Ticket";
import { DropdownDto } from "../../models/DropdownDto";
import { UserInformationDto } from "../../models/UserHome/UserHomeDto";
import api from "../../services/api";
import { getData, postData } from "../../services/ApiService";
import { greetingToTimeOfDay } from "../../shared/util/validator";
import { commonStyles } from "../../styles/styles";
import CardsCounting from "./CardsCounting";
import { common, styles } from "./styles";


export default function Home() {
  const [userInformation, setUserInformation] = useState<UserInformationDto>();
  const [user, setUser] = useState<User>();
  const navigation = useNavigation<any>();

  useEffect(() => {
    async function getDataFromUser() {
      const currentUser = await GoogleSignin.getCurrentUser();
      setUser(currentUser)
      let retorno = await getData('/tickets/user-ticket-information/', currentUser.user.email);
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
      <Text style={styles.greetingTitle}>{`${greetingToTimeOfDay()}, ${user?.user?.name}`}</Text>

      <Text style={[commonStyles.titleBlack, { marginBottom: 20 }]}>Suas reclamações...</Text>

      {userInformation?.cardsCounting &&
        <CardsCounting countingData={userInformation.cardsCounting} />
      }

      <Text style={styles.lastTicketCommented}>Última reclamação comentada</Text>
      {userInformation &&
        (
          userInformation?.lastMessageCommented === null ? (
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
        )
      }

    </View>
  )
}
