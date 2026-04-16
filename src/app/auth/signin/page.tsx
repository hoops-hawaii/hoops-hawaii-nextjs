'use client';

import { signIn } from 'next-auth/react'; // v5 compatible
import { Button, Card, Col, Container, Form, Row, Image } from 'react-bootstrap';
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
      <div className="position-absolute top-4 start-0 p-5 my-5 ms-5">
        <Image src="/openclipart-vectors-basketball-147794_1920.png" width={200} alt="" />
      </div>
      <div className="position-absolute top-4 end-0 p-5 my-5 ms-3 flip-horizontal" style={{ top: "120px" }}>
        <Image src="/graphicmall-basketball-10206760.png" className = "basketball-image" width={275} alt="" />
      </div>
      <Container>
        <Row className="justify-content-center pt-5 mt-2">
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
