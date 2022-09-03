import './message.css';

type MessageProps = {
  messageContent: string,
  messageCreatedDate: string
};

export default function Message({ messageContent, messageCreatedDate }: MessageProps) {
  return (
    <div className="message">
      <div className="top-content">
        <div className="name-email">
          <h3><strong>Felipe Araújo</strong></h3>
          <span>felipe.araujo@estudante.ifms.edu.br</span>
        </div>
        <h5 className="no-wrap">{messageCreatedDate}</h5>
      </div>
      <div className="body-content">
        {messageContent}
      </div>
    </div>
  );
}
