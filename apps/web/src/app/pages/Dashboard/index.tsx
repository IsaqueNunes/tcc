import { useState } from 'react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';
import './dashboard.css';

export const UserData = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823,
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345,
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555,
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555,
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234,
  },
];

export default function Dashboard() {
  const [userData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
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
          />
        </div>
      </div>
      <div className="charts-container">
        <div style={{ width: 700 }}>
          <LineChart chartData={userData} />
        </div>
        <div style={{ width: 400 }}>
          <PieChart chartData={userData} />
        </div>
      </div>
    </>
  );
}
