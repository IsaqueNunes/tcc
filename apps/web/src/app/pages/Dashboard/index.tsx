import { Message, Ticket } from '@prisma/client';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './dashboard.css';
import { ChartDataDto } from 'libs/models/chart-data-dto';
import { AdminDashboardInformationDto } from 'libs/models/admin-dashboard-information-dto';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../services/ApiService';
import CurrentData from './CurrentData';
import CountingCard from './CountingCard';
import LastTicketCommented from './LastTicketCommented';
import Charts from './Charts';

export class AdminDashboardClass implements AdminDashboardInformationDto {
  openingTicketsCounting!: number;

  solvedTicketsCounting!: number;

  lastMessageCommented!: Message & { ticket: Ticket; };

  chartData!: ChartDataDto[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  const user_data: any = JSON.parse(localStorage.getItem('authData') || '');
  const usuario_invalido = !(user_data.email as string).includes('tecnico.ifms');

  if (usuario_invalido) {
    navigate('/user/my-tickets')
  }

  const [data, setData] = useState<AdminDashboardClass>(new AdminDashboardClass());
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getDataFromDashboard() {
      let retorno = await getData('/tickets/admin-dashboard-information/', user_data.id);
      const responseDatabase: AdminDashboardClass = retorno.data;
      setData(responseDatabase);
      setLoading(false);

      setUserData({
        labels: responseDatabase?.chartData.map((
          data,
        ): string => data.month || ''),
        datasets: [
          {
            label: 'Reclamações Totais',
            data: responseDatabase?.chartData.map((data) => data.ticketCounting || 0),
            backgroundColor: [
              'rgba(75,192,192,1)',
              '#ecf0f1',
              '#50AF95',
              '#f3ba2f',
              '#2a71d0',
            ],
            borderColor: 'black',
            borderWidth: 2,
          },
        ],
      });
    }

    getDataFromDashboard();
  }, []);

  return (
    !loading && !usuario_invalido ? (
      <>
        <Header typeOfHeader={'admin'} />
        <div className="dashboard-main-content">
          <div className="column-top-data">

            <CurrentData name={user_data.name} email={user_data.email} />

            <CountingCard label={'Reclamações em Aberto'} counting={data?.openingTicketsCounting.toString()} />

            <CountingCard label={'Reclamações Resolvidas'} counting={data?.solvedTicketsCounting.toString()} />

            <LastTicketCommented ticket={data?.lastMessageCommented?.ticket} />

          </div>
        </div>

        <Charts userData={userData} />
      </>
    ) : (<></>)
  );
}
