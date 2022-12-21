import Button from "apps/web/src/app/components/Button";
import { useNavigate } from "react-router-dom";
import './buttons.css'

export default function Buttons() {
  const navigate = useNavigate();
  const CheckLogin = () => {
    const isAdmin = false;
    navigate(isAdmin ? 'admin/tickets' : '/user/my-tickets');
  };

  return (
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
  );
}
