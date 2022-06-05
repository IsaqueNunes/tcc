import './header.css';
import { useNavigate } from 'react-router-dom';
import Image from '../Image';
import Row from '../Row';
import Button from '../Button';

export default function Header() {
  const navigate = useNavigate();
  const Login = (): void => {
    navigate('/login');
  };

  return (
    <header className="header-content">
      <Row id="oficial-logo">
        <Image source="main-logo.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
        <p className="header-logo-description">
          <strong>Instituto Federal</strong>
          <br />
          Mato Grosso do Sul
        </p>
      </Row>
      <Button type="button" label="Entrar" onClick={Login} />
    </header>
  );
}
