import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { VictoryLabel, VictoryPie } from "victory-native";
import CardCounting from "../../components/CardCounting";
import Ticket from "../../components/Tickets/Ticket";
import { AdminDashboardDto } from "../../models/Dashboard/AdminDashboardDto";
import { getData } from "../../services/ApiService";
import ChartTicketsByMonth from "./ChartTicketsByMonth";
import { styles } from "./styles";

export default function Dashboard() {
  const [data, setData] = useState<AdminDashboardDto>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getDataFromDashboard() {
      let retorno = await getData('/tickets/admin-dashboard-information/', '46ed718f-8030-4872-a8a6-8f2930ae35e9');
      const responseDatabase: AdminDashboardDto = retorno.data;
      setData(responseDatabase)
      setLoading(false);
    }

    getDataFromDashboard();
  }, []);

  return (
    <View>
      {loading ? (<View></View>) : (
        <ScrollView>
          <Text style={[styles.chartTitle, { marginTop: 20 }]}>Reclamações{"\n"}por mês</Text>

          <ChartTicketsByMonth chartData={data.chartData} />

          <View style={styles.ticketCountingContainer}>
            <CardCounting label="Em Aberto" counting={data.openingTicketsCounting.toString()} />
            <CardCounting label="Resolvidas" counting={data.solvedTicketsCounting.toString()} />
          </View>

          <View style={styles.lastTicketCommentedContainer}>
            <Text style={styles.lastTicketCommentedTitle}>Última reclamação comentada</Text>

            <Ticket
              content={data.lastMessageCommented.ticket.content}
              id={data.lastMessageCommented.ticket.id.toString()}
              title={data.lastMessageCommented.ticket.title}
              status={data.lastMessageCommented.ticket.status}
            />
          </View>

        </ScrollView>
      )}
    </View>
  )
};
