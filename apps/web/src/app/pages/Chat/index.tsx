// import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Message from '../../components/Message';
import './chat.css';

export default function Chat() {
  // const { id } = useParams();// get the id of param
  return (
    <>
      <Header typeOfHeader="modify" />
      <div className="ticket-chat-page">
        <div className="ticket-chat-page-content">
          <h1> Título da reclamação</h1>
          <div className="message-list">
            <div className="first-message">
              <div className="top-content">
                <div className="name-email">
                  <h3><strong>Felipe Araújo</strong></h3>
                  <span>felipe.araujo@estudante.ifms.edu.br</span>
                </div>
                <h5>17/07/2022 às 16:30</h5>
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
        </div>
      </div>
    </>
  );
}
