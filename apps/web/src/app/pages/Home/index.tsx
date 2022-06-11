// import { useNavigate } from 'react-router-dom';
import Row from '../../components/Row';
import Image from '../../components/Image';
import Header from '../../components/Header';

import './index.css';
import Footer from '../../components/Footer';

export default function Home() {
  // const navigate = useNavigate();

  const RedirectToIfms = () => {
    window.location.href = 'https://www.ifms.edu.br/';
  };

  return (
    <>
      <Header />
      <Row className="background-home">
        <section className="main-content">
          <div className="conhecer-instituicao">
            <div className="logo-container">
              <div className="center-image">
                <Image source="home-ifms-logo.svg" width="100px" height="150px" nameLazyLoad="Ifms Logo" />
              </div>
              <h2>Instituto Federal</h2>
              <h6>Mato Grosso do Sul</h6>
            </div>

            <p className="new-here">Novo por aqui?</p>

            <button
              className="card-redirect-ifms-site"
              type="button"
              onClick={RedirectToIfms}
            >
              Conhecer a instituição
            </button>
          </div>
          <div className="conteudo-informativo">
            <h1>
              Encontrou algum problema de hardware ou
              <br />
              software na instituição e deseja resolvê-lo em
              <br />
              menor tempo possível?
            </h1>
            <h3>Nós temos a sua solução!</h3>
            <h5>
              Clique no botão à direita superior
              <br />
              para entrar com sua conta de estudante
              <br />
              e faça a sua reclamação.
            </h5>
          </div>
        </section>
      </Row>
      <Footer />
    </>
  );
}
