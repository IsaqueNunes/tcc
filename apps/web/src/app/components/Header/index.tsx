import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import Image from '../Image';
import Row from '../Row';
import Button from '../Button';

function AdminHeader() {
  const navigate = useNavigate();
  const Logout = () => {
    navigate('/');
  };
  const Dashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="header-content logged">
      <div className="redirectToFirstPage" onClick={Dashboard} role="button" aria-hidden="true">
        <Image source="main-logo-colored.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
      </div>
      <Row className="list-items">
        <Link className="list-item" to="/dashboard">Dashboard</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="my-tickets">Visualizar Reclamações</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="/profile">Perfil</Link>
        <Button label="Sair" buttonClassStyle="button-logout" onClick={Logout} type="button" />
      </Row>
    </header>
  );
}

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

  const RedirectToUserPage = () => {
    navigate('/user');
  };
  return (
    <header className="header-content logged">
      <div className="redirectToFirstPage" onClick={RedirectToUserPage} role="button" aria-hidden="true">
        <Image source="main-logo-colored.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
      </div>
      <Row className="list-items">
        <Link className="list-item" to="/user/my-tickets">Minhas Reclamações</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="/user/create-ticket">Reclamar</Link>
        <div className="vertical-line" />
        <Link className="list-item" to="/user/profile">Perfil</Link>
        <Button label="Sair" buttonClassStyle="button-logout" onClick={Logout} type="button" />
      </Row>
    </header>
  );
}

type HeaderProps = {
  typeOfHeader: 'modify' | 'default' | 'admin';
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
    case 'admin':
      return (
        <AdminHeader />
      );
    // no default
  }
}
