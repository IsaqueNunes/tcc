import './counting-card.css';

type Props = {
  label: string,
  counting: string
}

export default function CountingCard({ label, counting }: Props) {
  return (
    <div className="ticket-counting-card">
      <span className="text-card">{label}</span>
      <p className="counting-card">
        {counting}
      </p>
    </div>
  );
}
