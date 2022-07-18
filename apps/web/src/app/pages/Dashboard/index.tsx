import Card from '../../components/Card';
import Header from '../../components/Header';
import './dashboard.css';

export default function Dashboard() {
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
    </>
  );
}
