import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Image from '../../components/Image';
import './user.css';

export default function User() {
  return (
    <section className="user-main-content">
      <Header typeOfHeader="modify" />
      <div className="ticket-list-content">
        <div className="ticket-title-content">
          <h1 className="ticket-title">Reclamações</h1>
          <Button type="button" onClick={() => { }} label="Nova Reclamação" buttonClassStyle="button-login ticket" />
        </div>
        <div className="ticket-list-search-content">
          <input type="search" placeholder="Procure pela sua reclamação" className="input-search" />
          <div className="buttons-container">
            <div className="search-button">
              <Image source="search.svg" width="20" height="20" nameLazyLoad="search icon" />
            </div>
            <div className="filter-button">
              <Image source="filter.svg" width="13" height="10" nameLazyLoad="filter icon" />
              Filtrar
            </div>
          </div>
        </div>
        <div className="list-card">
          <Card
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
    </section>
  );
}
