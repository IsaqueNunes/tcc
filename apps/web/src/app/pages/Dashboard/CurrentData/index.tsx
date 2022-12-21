import './current-data.css';

type Props = {
  name: string,
  email: string,
}

export default function CurrentData({ name, email }: Props) {
  return (
    <div className="current-data">
      <h1>Dados Atuais</h1>
      <h3>{name}</h3>
      <h4>{email}</h4>
    </div>
  );
}
