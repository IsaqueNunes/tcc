/* eslint-disable jsx-a11y/no-autofocus */ // Permite auto focus
import './login.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import GoogleButton from '../../components/GoogleButton';
import Divider from '../../components/Divider';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

export default function Login() {
  const navigate = useNavigate();
  const CheckLogin = () => {
    const isAdmin = false;
    navigate(isAdmin ? 'admin/tickets' : '/user/my-tickets');
  };

  return (
    <section className="login-content">
      <div className="card-login">

        <CardHeader />

        <CardBody />

      </div>
    </section>
  );
}
