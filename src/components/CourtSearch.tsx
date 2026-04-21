'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const CourtSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [environment, setEnvironment] = useState(searchParams.get('environment') || '');
  const [condition, setCondition] = useState(searchParams.get('condition') || '');

  const updateParams = (newSearch: string, newEnv: string, newCondition: string) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newEnv) params.set('environment', newEnv);
    if (newCondition) params.set('condition', newCondition);
    router.push(`/list?${params.toString()}`);
  };

  return (
    <Row className="mb-3 g-2" style={{ maxWidth: '800px' }}>
      <Col md={5}>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Search courts by name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateParams(e.target.value, environment, condition);
            }}
          />
        </InputGroup>
      </Col>
      <Col md={3}>
        <Form.Select
          value={environment}
          onChange={(e) => {
            setEnvironment(e.target.value);
            updateParams(search, e.target.value, condition);
          }}
        >
          <option value="">All Environments</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
            updateParams(search, environment, e.target.value);
          }}
        >
          <option value="">All Conditions</option>
          <option value="very_good">Very Good</option>
          <option value="good">Good</option>
          <option value="mid">Mid</option>
          <option value="bad">Bad</option>
          <option value="trash">Trash</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default CourtSearch;
