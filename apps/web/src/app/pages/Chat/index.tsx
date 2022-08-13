// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Message from '../../components/Message';
import './chat.css';

export default function Chat() {
  // const { id } = useParams();// get the id of param
  const navigate = useNavigate();

  const AddMessage = () => {
    // add message
  };
  return (
    <>
      <Header typeOfHeader="modify" />
      <div className="ticket-chat-page">
        <div className="ticket-chat-page-content">
          <div className="title-content">
            <h1> Título da reclamação</h1>
            <select name="status" id="status-select">
              <option value="" disabled selected>Selecione um status</option>
              <option value="1">teste</option>
            </select>
          </div>
          <div className="message-list">
            <div className="first-message">
              <div className="top-content">
                <div className="name-email">
                  <h3><strong>Felipe Araújo</strong></h3>
                  <span>felipe.araujo@estudante.ifms.edu.br</span>
                </div>
                <h5 className="no-wrap">17/07/2022 às 16:30</h5>
              </div>
              <div className="body-content">
                <strong>
                  Durante uma aula de engenharia de software,
                  foi possível observar que o software x não estava
                  instalado na máquina do lab y, por conta disso, não
                  foi possível realizar a aula
                </strong>
              </div>
            </div>
            <Message />
          </div>
          <div className="type-new-message-for-response">
            <textarea name="message" id="message" />
            <div className="button-add-message-container">
              <Button
                label="Enviar"
                onClick={AddMessage}
                type="button"
                buttonClassStyle="button-login"
              />
              <Button
                label="Voltar"
                onClick={() => navigate('/user')}
                type="button"
                buttonClassStyle="button-login button-back-home"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
