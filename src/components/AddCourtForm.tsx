'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row } from 'react-bootstrap';
import { addCourt } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddCourtSchema } from '@/lib/validationSchemas';
import { useRouter } from 'next/navigation'; // Changed from redirect
import Link from 'next/link';

const AddCourt = () => {
  const router = useRouter();
  const { data: session, status, } = useSession();

  type AddCourtForm = {
  name: string;
  address: string;
  imageURL: string;
  environment: string;
  capacity: number;
  condition: "very_good" | "good" | "mid" | "bad" | "trash";
};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddCourtForm>({
    defaultValues: {
      imageURL: 'court1.jpg',
    },
    resolver: yupResolver(AddCourtSchema),
  });
  const onSubmit = async (data: AddCourtForm) => {
    try {
      await addCourt(data);
      await swal('Court Added', 'The court has been added', 'success');
      router.push(`/find-courts`);
      router.refresh();
    } catch (error) {
      swal('Error', 'Something went wrong adding the court', `${error}`);
      console.log('Error adding court:', error);
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <main>
      <Container className="py-7">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <h1 className="text-center">Add Court</h1>
            <Card className="shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Court Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('name')}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>address</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('address')}
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>image URL</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('imageURL')}
                      isInvalid={!!errors.imageURL}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.imageURL?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Environment Description</Form.Label>
                    <Form.Control
                      type="text"
                      {...register('environment')}
                      isInvalid={!!errors.environment}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.environment?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                      type="number"
                      {...register('capacity')}
                      isInvalid={!!errors.capacity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.capacity?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Condition</Form.Label>
                    <Form.Select {...register('condition')} isInvalid={!!errors.condition}>
                      <option value="trash">trash</option>
                      <option value="bad">bad</option>
                      <option value="mid">mid</option>
                      <option value="good">good</option>
                      <option value="very_good">very_good</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.condition?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Add Court'}
                    </Button>
                    <Link href={`/list`} className="btn btn-outline-secondary">
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

export default AddCourt;