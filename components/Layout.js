import { Container } from '@material-ui/core';
import Header from "./Header";
import Footer from "./Footer";

const Layout = props => (
  <div>
    <Header />
    <Container>
      {props.children}
    </Container>
    <Footer />
  </div>
);

export default Layout;