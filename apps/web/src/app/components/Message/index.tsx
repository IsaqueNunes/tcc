import './message.css';

export default function Message() {
  return (
    <div className="message">
      <div className="top-content">
        <div className="name-email">
          <h3><strong>Felipe Araújo</strong></h3>
          <span>felipe.araujo@estudante.ifms.edu.br</span>
        </div>
        <h5 className="no-wrap">17/07/2022 às 16:30</h5>
      </div>
      <div className="body-content">
        Durante uma aula de engenharia de software,
        foi possível observar que o software x não estava
        instalado na máquina do lab y, por conta disso, não
        foi possível realizar a aula
      </div>
    </div>
  );
}
