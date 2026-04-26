'use client';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { CreateTeam } from '@/lib/dbActions';

type CreateTeamForm = {
  name: string;
  description: string;
};

const CreateTeamPage: React.FC = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTeamForm>();

  const onSubmit = async (data: CreateTeamForm) => {
    console.log(session?.user?.id);
    if (!session?.user?.id) {
      alert('You must be logged in');
      return;
    }

    await CreateTeam({
      name: data.name,
      userId: Number(session.user.id),
      description: data.description,
    });

  };

  return (
    <main>
      <Container>
        <Row className="justify-content-center pt-5 mt-2">
          <Col xs={5}>
            <Card>
              <Card.Header className="bg-green text-center">
                <h2 className="text-center text-dark">Create Team</h2>
              </Card.Header>

              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="form-group">
                    <Form.Label>Team Name</Form.Label>

                    <textarea
                      {...register('name', {
                        required: 'Name is required',
                        maxLength: {
                          value: 200,
                          message: 'Must not exceed 200 characters',
                        },
                      })}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    />

                    <div className="invalid-feedback">
                      {errors.description?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group">
                    <Form.Label>Team Description</Form.Label>

                    <textarea
                      {...register('description', {
                        required: 'Description is required',
                        maxLength: {
                          value: 200,
                          message: 'Must not exceed 200 characters',
                        },
                      })}
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    />

                    <div className="invalid-feedback">
                      {errors.description?.message}
                    </div>
                  </Form.Group>

                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col>
                        <Button type="submit" className="btn btn-success container-fluid">
                          Create Team
                        </Button>
                      </Col>

                      <Col>
                        <Button
                          type="button"
                          onClick={() => reset()}
                          className="btn btn-warning container-fluid"
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>

                </Form>
              </Card.Body>

              <Card.Footer className="bg-green text-center">
                You can only own one team.
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default CreateTeamPage;