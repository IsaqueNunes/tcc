import { Message, Ticket } from '@prisma/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import './dashboard.css';
import { ChartDataDto } from 'libs/models/chart-data-dto';
import { AdminDashboardInformationDto } from 'libs/models/admin-dashboard-information-dto';
import { useNavigate } from 'react-router-dom';
import { colorStatus, nameStatus } from 'libs/models/status';

export class AdminDashboardClass implements AdminDashboardInformationDto {
  openingTicketsCounting!: number;

  solvedTicketsCounting!: number;

  lastMessageCommented!: Message & { ticket: Ticket; };

  chartData!: ChartDataDto[];
}

export default function Dashboard() {
  const navigate = useNavigate();
  type Status = "ABERTO" | "EM_ANALISE" | "FINALIZADO";
  const user_data: any = JSON.parse(localStorage.getItem('authData') || '');
  const usuario_invalido = !(user_data.email as string).includes('tecnico.ifms');

  if(usuario_invalido) {
    navigate('/user/my-tickets')
  }

  const [data, setData] = useState<AdminDashboardClass>(new AdminDashboardClass());
  const [userData, setUserData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      axios.get('http://localhost:3333/api/tickets/admin-dashboard-information/'.concat(user_data.id != null ? user_data.id : ''))
        .then((response) => {
          const responseDatabase: AdminDashboardClass = response.data;
          setData(responseDatabase);
          setLoading(false);
          if (responseDatabase.chartData !== undefined) {
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
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const mesComUmChamadoPelomenos = () => {

    data?.chartData.forEach((elemento) => {
      if(elemento.ticketCounting > 0) {
       return true;
      }
      return false;
    });

    return false;
  }

  return (
    !loading && !usuario_invalido ? (
      <>
        <Header typeOfHeader={'admin'} />
        <div className="dashboard-main-content">
          <div className="column-top-data">
            <div className="current-data">
              <h1>Dados Atuais</h1>
              <h3 className="user-name">{user_data.name}</h3>
              <h4>{user_data.email}</h4>
            </div>
            <div className="tickets-opened-card">
              <span className="text-card">Reclamações em Aberto</span>
              <p className="counting-card">
                {' '}
                {data?.openingTicketsCounting}
                {' '}
              </p>
            </div>
            <div className="tickets-resolved-card">
              <span className="text-card">Reclamações Resolvidas</span>
              <p className="counting-card">
                {' '}
                {data?.solvedTicketsCounting}
                {' '}
              </p>
            </div>
            <div className="last-ticket-commented">
              {data?.lastMessageCommented?.ticket != null ?
              <>
                <h3>Última reclamação comentada</h3>
                  <Card
                    isFromDashboard
                    titleCard={data?.lastMessageCommented.ticket.title || ''}
                    subtitle=""
                    bodyContent={data?.lastMessageCommented.ticket.content || ''}
                    hexColorStatus={colorStatus[data?.lastMessageCommented.ticket.status as Status]}
                    nameStatus={nameStatus[data?.lastMessageCommented.ticket.status as Status]}
                    onClickCard={() => { }}
                    />
                </>
                :
                <h3 className="text-with-no-commented-tickets">
                  Nenhuma reclamação comentada, ainda.
                </h3>
              }
            </div>
          </div>
        </div>
        <div className="charts-container">
          <div style={{ width: '50%' }}>
            <LineChart chartData={userData} />
          </div>
          {mesComUmChamadoPelomenos() &&
            <div style={{ width: '30%' }}>
              <PieChart chartData={userData} />
            </div>
          }
        </div>
      </>
    ) : (<></>)
  );
}
