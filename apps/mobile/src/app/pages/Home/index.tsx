import { GoogleSignin, User } from "@react-native-google-signin/google-signin";
import { View, Text } from "react-native";
import Ticket from "../../components/Tickets/Ticket";
import { getData } from "../../services/ApiService";
import { commonStyles } from "../../styles/styles";
import CardsCounting from "../../components/CardsCounting";
import { styles } from "./styles";
import NotFoundTicket from "../../components/NotTicketFound";
import { useQuery } from "react-query";

export default function Home() {
  const { data, isLoading } = useQuery('userInformations', async () => {
    const response = await getData('/tickets/user-ticket-information/', 'rafael.veiga@estudante.ifms.edu.br');
    // implementation error
    return response;
  });

  if (isLoading) return <></>

  return (
    <View style={styles.homeContainer}>
      <Text style={[commonStyles.titleBlack, { marginBottom: 20 }]}>Suas reclamações...</Text>

      <CardsCounting countingData={data?.data?.cardsCounting} />

      <Text style={styles.lastTicketCommented}>Última reclamação comentada</Text>

      {
        data?.data?.lastMessageCommented === null ? (
          <NotFoundTicket />
        ) : (
          <Ticket
            id={data?.data?.lastMessageCommented?.ticketId.toString()}
            title={data?.data?.lastMessageCommented?.ticket.title}
            content={data?.data?.lastMessageCommented?.ticket.content}
            status={data?.data?.lastMessageCommented?.ticket.status} />
        )
      }
    </View>
  )
}
