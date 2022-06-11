import './header.css';
import { useNavigate } from 'react-router-dom';
import Image from '../Image';
import Row from '../Row';
import Button from '../Button';

function Login() {
  const navigate = useNavigate();
  navigate('/login');
}

function LoginDefaultHeader() {
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
      <Button type="button" label="Entrar" onClick={Login} buttonClassStyle="button-login" />
    </header>
  );
}

function ModifyHeader() {
  return (
    <header className="header-content">
      <p>teste</p>
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
