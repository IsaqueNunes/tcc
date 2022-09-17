import './message.css';

type MessageProps = {
  messageContent: string,
  messageCreatedDate: string,
  messageAuthorName: string,
  messageEmailAuthor: string
};

export default function Message({
  messageContent, messageCreatedDate, messageAuthorName, messageEmailAuthor,
}: MessageProps) {
  return (
    <div className="message">
      <div className="top-content">
        <div className="name-email">
          <h3><strong>{messageAuthorName}</strong></h3>
          <span>{messageEmailAuthor}</span>
        </div>
        <h5 className="no-wrap">{messageCreatedDate}</h5>
      </div>
      <div className="body-content">
        {messageContent}
      </div>
    </div>
  );
}
