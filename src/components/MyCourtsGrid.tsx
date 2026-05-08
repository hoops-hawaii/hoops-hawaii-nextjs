"use client";

import { useState } from 'react';
import type { Court } from '@prisma/client';
import { Row, Col } from 'react-bootstrap';
import MyCourtsCard from '@/components/MyCourtsCard';

type MyCourtsGridProps = {
  initialCourts: Court[];
  homeCourtId: number | null | undefined;
};

const MyCourtsGrid = ({ initialCourts, homeCourtId }: MyCourtsGridProps) => {
  const [courts, setCourts] = useState(initialCourts);

  const handleRemove = (courtId: number) => {
    setCourts((current) => current.filter((court) => court.id !== courtId));
  };


  if (courts.length === 0) {
    return <p className="text-center">No saved courts yet.</p>;
  }


  return (
    <Row className="g-4">
      {courts.map((court) => (
        <Col key={court.id} xs={12} sm={6} md={4} lg={3}>
          <MyCourtsCard court={court} onRemove={handleRemove} homeCourtId={homeCourtId}/>
        </Col>
      ))}
    </Row>
  );
};

export default MyCourtsGrid;
