import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../Image';
import Row from '../Row';
import Button from '../Button';

function LoginDefaultHeader() {
  const navigate = useNavigate();
  const Login = () => {
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
      <Button type="button" label="Entrar" onClick={Login} buttonClassStyle="button-login-home" />
    </header>
  );
}

function ModifyHeader() {
  const navigate = useNavigate();
  const Logout = () => {
    navigate('/');
  };
  return (
    <header className="header-content logged">
      <Image source="main-logo-colored.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
      <Row className="list-items">
        <Link className="list-item" to="list-tickets">Listagem</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="create-ticket">Reclamar</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="/about">Sobre</Link>
        <Button label="Sair" buttonClassStyle="button-logout" onClick={Logout} type="button" />
      </Row>
    </header>
  );
}

type HeaderProps = {
  typeOfHeader: 'modify' | 'default';
};

export default function Header({ typeOfHeader }: HeaderProps) {
  switch (typeOfHeader) {
    case 'modify':
      return (
        <ModifyHeader />
      );
    case 'default':
      return (
        <LoginDefaultHeader />
      );
    // no default
  }
}
