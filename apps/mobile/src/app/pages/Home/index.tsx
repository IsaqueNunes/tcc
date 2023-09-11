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
import CardsCounting from "../../components/CardsCounting";
import { common, styles } from "./styles";
import NotFoundTicket from "../../components/NotTicketFound";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useQuery } from "react-query";



export default function Home() {
  const { data, isLoading } = useQuery('userInformations', async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    const response = await getData('/tickets/user-ticket-information/', currentUser.user.email);
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
