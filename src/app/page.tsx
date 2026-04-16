import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="vh-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col className="text-center text-white">
          <h1>FIND COURTS.</h1>
          <h1>FIND TEAMMATES.</h1>
          <h1>PLAY BASKETBALL.</h1>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
