import { Col, Row, Container } from 'react-bootstrap';
import { Facebook, Twitter, Instagram } from 'react-bootstrap-icons';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer id="bottomMenu" className="footer bg-white mt-auto py-3">
    <Container>
      <Row>
        <Col className="text-center">
          <Facebook className="mx-2" width="35"/>
          <Twitter className="mx-2" width="35"/>
          <Instagram className="mx-2" width="35"/>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
