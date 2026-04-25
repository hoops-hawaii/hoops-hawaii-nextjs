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
import { redirect } from 'next/navigation';
import  Link  from 'next/link';


  const EditProfile = ({user}: {user: User}) => {

    const onSubmit = async (data: User) => {
    // console.log(JSON.stringify(data, null, 2));
    await editProfile(data);
    await update({
      user: {
        username: data.username,
      },
    });
    swal('Profile Updated', 'Your profile has been updated', 'success', { timer: 2000 });
    redirect(`/profile/view/${data.username}`);
  };

  const { data: session, status, update } = useSession();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<User>({
      resolver: yupResolver(EditProfileSchema),
    });
    

  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (!session) {
    // If they aren't logged in, send them away (or show 404)
    redirect("/not-found");
  }
  if (session.user.username !== user.username) {
    // If they aren't the owner, send them away (or show 404)
    redirect("/not-found"); 
  }

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1 className="text-center">Edit Profile</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <input type='hidden' value={user.id} {...register('id')} />
                  <input type='hidden' value={user.role} {...register('role')} />
                  <input type='hidden' value={user.password} {...register('password')} />
                  <input type='hidden' value={user.friends} {...register('friends')} />
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
                      defaultValue={user.bio ?? ''}
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
                      defaultValue={user.homeCourtId ?? 0}
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
                      {/* Left Column: Content leans left */}
                      <Col className="d-flex justify-content-start">
                        <Button type="submit" className="btn btn-primary">
                          Update Profile
                        </Button>
                      </Col>

                      {/* Right Column: Content leans right */}
                      <Col className="d-flex justify-content-end">
                        <Link href={`/profile/view/${user.username}`} className="btn btn-secondary">
                          Cancel
                        </Link>
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
