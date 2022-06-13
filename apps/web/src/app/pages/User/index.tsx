import Button from '../../components/Button';
import Header from '../../components/Header';
import './user.css';

export default function User() {
  return (
    <section className="user-main-content">
      <Header typeOfHeader="modify" />
      <div className="ticket-list-content">
        <h1 className="ticket-title">Reclamações</h1>
        <Button type="button" onClick={() => { }} label="" buttonClassStyle="button-login ticket" />
        {/* <input type="text" /> */}
      </div>
    </section>
  );
}
