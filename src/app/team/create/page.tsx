'use client';

import { signIn } from 'next-auth/react'; // v5 compatible
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, Image } from 'react-bootstrap';
import { createUser } from '@/lib/dbActions';

type SignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The sign up page. */
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required').email('Username is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    // console.log(JSON.stringify(data, null, 2));
    await createUser(data);
    // After creating, signIn with redirect to the add page
    await signIn('credentials', { callbackUrl: '/add', ...data });
  };

  return (
    <main className=''>
      <Container>
        <Row className="justify-content-center pt-5 mt-2">
          <Col xs={5}>
            
            <Card >
              <Card.Header className='bg-green text-center'>
                <h2 className="text-center text-dark ">Sign Up</h2>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      {...register('username')}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Password</Form.Label>
                    <input
                      type="password"
                      {...register('password')}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Confirm Password</Form.Label>
                    <input
                      type="password"
                      {...register('confirmPassword')}
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-success container-fluid">
                          Register
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right container-fluid">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer className='bg-green text-center'>
                Already have an account?
                <a href="/auth/signin" className='ms-3'>Sign in</a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      
    </main>
  );
};

export default SignUp;