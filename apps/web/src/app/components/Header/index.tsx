import './header.css';
import Image from '../Image';
import Row from '../Row';
import Button from '../Button';

export default function Header() {
  const Teste = (): void => {
    console.log('teste');
  };

  return (
    <header className="header-content">
      <Row>
        <Image source="main-logo.svg" width="50px" height="50px" nameLazyLoad="Ifms Logo" />
        <p className="header-logo-description">
          <strong>Instituto Federal</strong>
          <br />
          Mato Grosso do Sul
        </p>
      </Row>
      <Button type="button" label="Entrar" onClick={Teste} />
    </header>
  );
}
