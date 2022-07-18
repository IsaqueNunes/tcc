import './card.css';

type CardProps = {
  titleCard: string;
  subtitle?: string;
  isFromDashboard?: boolean;
  bodyContent: string;
  hexColorStatus: string;
  nameStatus: string;
};

export default function Card({
  titleCard, subtitle, bodyContent, hexColorStatus, nameStatus, isFromDashboard,
}: CardProps) {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  if (!isFromDashboard) {
    return (
      <div className="card-content" style={{ borderLeftColor: `#${randomColor}` }}>
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
  return (
    <div className="admin-card-content" style={{ borderLeftColor: `#${randomColor}` }}>
      <div className="card-title">
        <h1 className="admin-card-title">{titleCard}</h1>
        <h5 className="admin-card-subtitle">{subtitle}</h5>
      </div>
      <div className="admin-card-body">
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
  isFromDashboard: false,
};
