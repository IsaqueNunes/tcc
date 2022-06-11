import Footer from '../Footer';
import Header from '../Header';

type SharedProps = {
  children: React.ReactNode;
};

export default function SharedHeaderFooter({ children }: SharedProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
