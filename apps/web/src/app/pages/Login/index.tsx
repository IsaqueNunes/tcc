import './login.css';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import Button from '../../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const CheckLogin = () => {
    navigate('/user');
  };
  const Test = () => {
    console.log('authentication');
  };

  return (
    <section className="login-content">
      <div className="card-login">
        <div className="card-header">
          <h1 className="title-login">Entrar</h1>
          <h6 className="subtitle-login">Preencha seus dados para entrar</h6>
        </div>
        <div className="card-body">
          <div className="card-oauth-google" onClick={Test} role="button" aria-hidden="true">
            <Image source="google-logo.svg" width="25px" height="25px" nameLazyLoad="Google logo" />
            <span>
              Entrar com o
              <strong> Google</strong>
            </span>
          </div>
          <div className="divider"> Ou </div>
          <div className="input-controller">
            <input className="input-style" type="text" placeholder="Cpf/E-mail" />
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
