'use client';

import { signIn } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
/** The sign in page. */
const SignIn = () => {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;
    await signIn('credentials', {
      callbackUrl: '/list',
      username,
      password,
    });
  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center pt-5 mt-2 ">
          <Col xs={5} >
            <Card>
              <Card.Header className='bg-green text-center'>
                <h2 className="text-center text-dark ">Sign In</h2>
              </Card.Header>
              <Card.Body>
                <Form method="post" onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <input name="username" type="text" className="form-control" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <input name="password" type="password" className="form-control" />
                  </Form.Group>
                  <Row className = "py-2">
                    <Col>
                      <Button type="submit" className="btn btn-success container-fluid mt-3 px-4 ">
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                  
                </Form>
              </Card.Body>
              <Card.Footer className='bg-green text-center'>
                Don&apos;t have an account?
                <a href="/auth/signup">Sign Up</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
