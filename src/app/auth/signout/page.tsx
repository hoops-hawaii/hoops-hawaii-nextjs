'use client';

import { signOut } from 'next-auth/react'; // v5 compatible
import { Button, Col, Row , Nav} from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Col id="signout-page" className="d-flex flex-column justify-content-center align-items-center text-center">
    <Nav id = 'centerTextBox'className='text-center col-4 mx-auto p-0 w-full container-fluid justify-content-center'>
    <h1 className = "text-light">Do you want to sign out?</h1>
    </Nav>
    <Row className=' justify-content-center w-100 p-4'>
      <Col xs={4} />
      <Col>
        <Button variant="danger" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
          Sign Out
        </Button>
      </Col>
      <Col>
        <Button variant="secondary" href="/">
          Cancel
        </Button>
      </Col>
      <Col xs={4} />
    </Row>
  </Col>
);

export default SignOut;
