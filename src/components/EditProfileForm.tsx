'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { editProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { User } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { useRouter } from 'next/navigation'; // Changed from redirect
import Link from 'next/link';
import { useState } from 'react';

const EditProfile = ({ user }: { user: User }) => {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      ...user,
      bio: user.bio ?? '',
      pfp: user.pfp ?? '',
      homeCourtId: user.homeCourtId ?? 0,
    },
  });
  const [isRedirecting, setIsRedirecting] = useState(false);
  const onSubmit = async (data: User) => {
    setIsRedirecting(true);
    try {
      await editProfile(data);
      await update({
          user: {
            username: data.username,
          },
        },
      );
      await swal('Profile Updated', 'Your profile has been updated', 'success');
      router.push(`/profile/view/${data.username}`);
      router.refresh();
    } catch (error) {
      setIsRedirecting(false);
      swal('Error', 'Something went wrong updating your profile', `${error}`);
    }
  };

  if (status === 'loading' || isRedirecting) return <LoadingSpinner />;

  if (!session || session.user.username !== user.username) {
    router.push('/not-found');
    return null;
  }

  return (
    <main>
      <Container className="py-7">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h1 className="text-center">Edit Profile</h1>
            <Card className="shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" {...register('id')} />

                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('username')}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      {...register('bio')}
                      isInvalid={!!errors.bio}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.bio?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture URL</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('pfp')}
                      isInvalid={!!errors.pfp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pfp?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Home Court ID</Form.Label>
                    <Form.Control
                      type="number"
                      {...register('homeCourtId')}
                      isInvalid={!!errors.homeCourtId}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.homeCourtId?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Skill Level</Form.Label>
                    <Form.Select {...register('skill')} isInvalid={!!errors.skill}>
                      <option value="trash">trash</option>
                      <option value="beginner">beginner</option>
                      <option value="mid">mid</option>
                      <option value="pro">pro</option>
                      <option value="goated">goated</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.skill?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Update Profile'}
                    </Button>
                    <Link href={`/profile/view/${user.username}`} className="btn btn-outline-secondary">
                      Cancel
                    </Link>
                  </div>
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