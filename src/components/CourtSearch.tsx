'use client';

import { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import type { Court } from '@prisma/client';

type CourtSearchProps = {
  courts: Court[];
  onFiltered?: (results: Court[]) => void;
};

const CourtSearch = ({ courts, onFiltered }: CourtSearchProps) => {
  const [search, setSearch] = useState('');
  const [environment, setEnvironment ] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    if (!Array.isArray(courts)) return;
    const filtered = courts.filter((court) => {
      const matchesName = court.name.toLowerCase().includes(search.toLowerCase());
      const matchesEnvironment = environment ? court.environment === environment : true;
      const matchesCondition = condition ? court.condition === condition : true;
      return matchesName && matchesEnvironment && matchesCondition;
    });
    onFiltered?.(filtered);
  }, [courts, search, environment, condition, onFiltered]);



  return (
    <Row className="mb-3 g-2" style={{ maxWidth: '800px' }}>
      <Col md={5}>
        <InputGroup>
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Search courts by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Col>
      <Col md={3}>
        <Form.Select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
        >
          <option value="">All Environments</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </Form.Select>
      </Col>
      <Col md={3}>
        <Form.Select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
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
