import './header.css';
import Image from '../Image';
import Row from '../Row';

export default function Header() {
  return (
    <header className="header-content">
      <Row>
        <Image source="main-logo.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
        <p className="header-logo-description">
          <strong>Instituto Federal</strong>
          <br />
          Mato Grosso do Sul
        </p>
      </Row>
      <p className="header-logo-description">teste</p>
      {/* provavelmente irá ser um botão */}
    </header>
  );
}
