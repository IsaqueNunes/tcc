import './card.css';

type CardProps = {
  titleCard: string;
  subtitle?: string;
  bodyContent: string;
  hexColorStatus: string;
  nameStatus: string;
};

export default function Card({
  titleCard, subtitle, bodyContent, hexColorStatus, nameStatus,
}: CardProps) {
  return (
    <div className="card-content">
      <div className="card-title">
        <h1>{titleCard}</h1>
        <h5>{subtitle}</h5>
      </div>
      <div className="card-body">
        <p>
          {bodyContent}
        </p>

        <div className="card-status">
          <div className="hex-status-circle" style={{ backgroundColor: hexColorStatus }} />
          <span>{nameStatus}</span>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  subtitle: '',
};
