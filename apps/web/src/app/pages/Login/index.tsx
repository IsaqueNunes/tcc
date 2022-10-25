/* eslint-disable jsx-a11y/no-autofocus */ // Permite auto focus
import './login.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import GoogleButton from '../../components/GoogleButton';

export default function Login() {
  const navigate = useNavigate();
  const CheckLogin = () => {
    const isAdmin = false;
    navigate(isAdmin ? 'admin/tickets' : '/user/my-tickets');
  };

  return (
    <section className="login-content">
      <div className="card-login">
        <div className="card-header">
          <h1 className="title-login">Entrar</h1>
          <h6 className="subtitle-login">Preencha seus dados para entrar</h6>
        </div>
        <div className="card-body">
          <GoogleButton />
          <div className="divider"> Ou </div>
          <div className="input-controller">
            <input className="input-style" autoFocus type="text" placeholder="Cpf/E-mail" />
            <input className="input-style" type="text" placeholder="Senha" />
          </div>
          <div className="button-container">
            <Button
              label="Entrar"
              onClick={CheckLogin}
              type="button"
              buttonClassStyle="button-login"
            />
            <Button
              label="Voltar"
              onClick={() => navigate('/')}
              type="button"
              buttonClassStyle="button-login button-back-home"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
