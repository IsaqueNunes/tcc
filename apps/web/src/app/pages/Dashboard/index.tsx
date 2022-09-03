import { useState } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import './dashboard.css';

export const UserData = [
  {
    id: 1,
    month: 'Janeiro',
    ticketCounting: 15,
  },
  {
    id: 2,
    month: 'Fevereiro',
    ticketCounting: 5,
  },
  {
    id: 3,
    month: 'Março',
    ticketCounting: 22,
  },
  {
    id: 4,
    month: 'Abril',
    ticketCounting: 13,
  },
  {
    id: 5,
    month: 'Maio',
    ticketCounting: 18,
  },
  {
    id: 6,
    month: 'Junho',
    ticketCounting: 15,
  },
  {
    id: 7,
    month: 'Julho',
    ticketCounting: 3,
  },
  {
    id: 8,
    month: 'Agosto',
    ticketCounting: 7,
  },
  {
    id: 9,
    month: 'Setembro',
    ticketCounting: 0,
  },
  {
    id: 10,
    month: 'Outubro',
    ticketCounting: 26,
  },
  {
    id: 11,
    month: 'Novembro',
    ticketCounting: 10,
  },
  {
    id: 12,
    month: 'Dezembro',
    ticketCounting: 34,
  },
];

export default function Dashboard() {
  const [userData] = useState({
    labels: UserData.map((data) => data.month),
    datasets: [
      {
        label: 'Reclamações Totais',
        data: UserData.map((data) => data.ticketCounting),
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
  return (
    <>
      <Header typeOfHeader="admin" />
      <div className="dashboard-main-content">
        <div className="column-top-data">
          <div className="current-data">
            <h1>Dados Atuais</h1>
            <h3 className="user-name">Paulo Ricardo</h3>
            <h4>Paulo.Ricardo@gmail.com</h4>
            <span>Último Acesso em: 16/06/2022 às 14:38</span>
          </div>
          <div className="tickets-opened-card">
            <span className="text-card">Reclamações em Aberto</span>
            <p className="counting-card">3</p>
          </div>
          <div className="tickets-resolved-card">
            <span className="text-card">Reclamações Resolvidas</span>
            <p className="counting-card">112</p>
          </div>
          <div className="last-ticket-commented">
            <h3>Última reclamação comentada</h3>
            <Card
              isFromDashboard
              titleCard="Título da reclamação"
              subtitle="Subtítulo, se necessário"
              bodyContent="Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut  labore et dolore magna
              aliqua. Neque laoreet suspendisse interdum
              consectetur libero id faucibus nisl tincidunt.."
              hexColorStatus="#FAE52D"
              nameStatus="Em análise"
              onClickCard={() => { }}
            />
          </div>
        </div>
      </div>
      <div className="charts-container">
        <div style={{ width: '50%' }}>
          <LineChart chartData={userData} />
        </div>
        <div style={{ width: '30%' }}>
          <PieChart chartData={userData} />
        </div>
      </div>
    </>
  );
}
