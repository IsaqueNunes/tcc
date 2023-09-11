import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useQuery } from "react-query";
import CardCounting from "../../components/CardCounting";
import Ticket from "../../components/Tickets/Ticket";
import { getData } from "../../services/ApiService";
import ChartTicketsByMonth from "./ChartTicketsByMonth";
import { styles } from "./styles";

export default function Dashboard() {
  const { data, isLoading } = useQuery('dashboardInformation', async () => await getData('/tickets/admin-dashboard-information/', '46ed718f-8030-4872-a8a6-8f2930ae35e9'))

  return (
    <View>
      {isLoading ? (<View></View>) : (
        <ScrollView>
          <Text style={[styles.chartTitle, { marginTop: 20 }]}>Reclamações{"\n"}por mês</Text>

          <ChartTicketsByMonth chartData={data.data.chartData} />

          <View style={styles.ticketCountingContainer}>
            <CardCounting label="Em Aberto" counting={data.data.openingTicketsCounting.toString()} />
            <CardCounting label="Resolvidas" counting={data.data.solvedTicketsCounting.toString()} />
          </View>

          <View style={styles.lastTicketCommentedContainer}>
            <Text style={styles.lastTicketCommentedTitle}>Última reclamação comentada</Text>

            <Ticket
              content={data.data.lastMessageCommented.ticket.content}
              id={data.data.lastMessageCommented.ticket.id.toString()}
              title={data.data.lastMessageCommented.ticket.title}
              status={data.data.lastMessageCommented.ticket.status}
            />
          </View>

        </ScrollView>
      )}
    </View>
  )
};
