"use client";

import { useState } from 'react';
import type { Court } from '@prisma/client';
import { Row, Col } from 'react-bootstrap';
import CourtSearch from '@/components/CourtSearch';
import FindCourtsCard from '@/components/FindCourtsCard';

type FindCourtsSearchProps = {
  initialCourts: Court[];
};

const FindCourtsSearch = ({ initialCourts }: FindCourtsSearchProps) => {
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(initialCourts);

  return (
    <>
      <CourtSearch courts={initialCourts} onFiltered={setFilteredCourts} />
      <Row className="g-4 mt-3">
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court) => (
            <Col key={court.id} xs={12} sm={12} md={6} lg={4} xl={3}>
              <FindCourtsCard court={court} />
            </Col>
          ))
        ) : (
          <Col xs={12}>
            <p className="text-center">No courts match your search or filter criteria.</p>
          </Col>
        )}
      </Row>
    </>
  );
};

export default FindCourtsSearch;
