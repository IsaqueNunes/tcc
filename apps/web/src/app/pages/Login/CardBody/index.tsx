import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import GoogleButton from "../../../components/GoogleButton";
import Buttons from "./Buttons";
import './card-body.css';
import Inputs from "./Inputs";

export default function CardBody() {
  const navigate = useNavigate();
  const CheckLogin = () => {
    const isAdmin = false;
    navigate(isAdmin ? 'admin/tickets' : '/user/my-tickets');
  };

  return (
    <div className="card-body">

      <GoogleButton />

      <Divider content={"Ou"} />

      <Inputs />

      <Buttons />
    </div>
  )
}
