import Row from '../../components/Row';
import Header from '../../components/Header';

import './home.css';
import Footer from '../../components/Footer';
import MeetIfms from './MeetIfms';
import InformativeContent from './InformativeContent';

export default function Home() {
  return (
    <>
      <Header typeOfHeader={'login'} />
      <Row className="background-home">
        <section className="main-content">

          <MeetIfms />

          <InformativeContent />

        </section>
      </Row>
      <Footer />
    </>
  );
}
