'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react'; // v5 compatible
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { editProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { User } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { SubmitHandler } from 'react-hook-form';

  const onSubmit = async (data: User) => {
    // console.log(JSON.stringify(data, null, 2));
    await editProfile(data);
    swal('Profile Updated', 'Your profile has been updated', 'success', { timer: 2000 });
  };

/** The change password page. 
const EditProfile = ({user}: {user: User}) => {
  const { data: session, status } = useSession();
  const username = session?.user?.username || '';
  /*
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Password is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });
  */

  const EditProfile = ({user}: {user: User}) => {
  const { data: session, status } = useSession();
  const username = session?.user?.username || '';
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<User>({
      resolver: yupResolver(EditProfileSchema),
    });

/*
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(EditProfileSchema),
  });
  */

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Change Password</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <input type='hidden' value={user.id} {...register('id')} />
                  <input type='hidden' value={user.role} {...register('role')} />
                  <input type='hidden' value={user.password} {...register('password')} />
                  <Form.Group className="form-group">
                    <Form.Label>Username</Form.Label>
                    <input
                      type="text"
                      defaultValue={user.username}
                      {...register('username')}
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Bio</Form.Label>
                    <input
                      type="text"
                      defaultValue={user.bio ?? ' '}
                      {...register('bio')}
                      className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.bio?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <input
                      type="text"
                      defaultValue={user.pfp ?? ''}
                      {...register('pfp')}
                      className={`form-control ${errors.pfp ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.pfp?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Home Court ID</Form.Label>
                    <input
                      type="number"
                      {...register('homeCourtId')}
                      className={`form-control ${errors.homeCourtId ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.homeCourtId?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group">
                    <Form.Label>Skill Level</Form.Label>
                    <select {...register('skill')} className={`form-control ${errors.skill ? 'is-invalid' : ''}`}>
                      <option value="trash">trash</option>
                      <option value="beginner">beginner</option>
                      <option value="mid">mid</option>
                      <option value="pro">pro</option>
                      <option value="goated">goated</option>
                    </select>
                    <div className="invalid-feedback">{errors.skill?.message}</div>
                  </Form.Group>
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-primary">
                          Update Profile
                        </Button>
                      </Col>
                      <Col>
                        <Button type="button" onClick={() => reset()} className="btn btn-warning float-right">
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default EditProfile;
