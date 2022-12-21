import Button from '../../../components/Button';
import Image from '../../../components/Image';
import './meet-ifms.css'

export default function MeetIfms() {
  const RedirectToIfms = () => {
    window.location.href = 'https://www.ifms.edu.br/';
  };

  return (
    <div className="conhecer-instituicao">
      <div className="logo-container">
        <div className="center-image">
          <Image
            source="home-ifms-logo.svg"
            width="100px"
            height="150px"
            nameLazyLoad="Ifms Logo"
          />
        </div>
        <h2 className="center-logo-style">Instituto Federal</h2>
        <h6 className="center-logo-style">Mato Grosso do Sul</h6>
      </div>

      <p className="new-here">
        Novo por aqui?
      </p>

      <Button
        label="Conhecer a instituicao"
        onClick={RedirectToIfms}
        type="button"
        buttonClassStyle="card-redirect-ifms-site"
      />
    </div>
  )
}
