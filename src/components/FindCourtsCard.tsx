"use client";

import { useState } from 'react';
import type { Court } from '@prisma/client';
import { Button, Card } from 'react-bootstrap';
import { saveCourts } from '@/lib/dbActions';
import { set } from 'react-hook-form';

type FindCourtCardProps = {
  court: Court;
};

const formatLabel = (value: string) => value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const FindCourtsCard = ({ court }: FindCourtCardProps) => {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const capacity = court.capacity;
  const occupancy = `${court.present} / ${capacity}`;

  const handleAdd = async () => {
    await saveCourts(court.id);
    setAdded(true);
  };


  return (
    <Card className="border-0 shadow-sm overflow-hidden h-100">
      <div className="d-flex flex-column flex-md-row h-100">

        {/* Image */}
        <div
          className="position-relative"
          style={{
            flex: "0 0 40%",
            minHeight: 220,
          }}
        >
          <Card.Img
            src={court.imageURL ?? "/warrior-rec.png"}
            alt={court.name}
            className="h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Content */}
        <Card.Body className="d-flex flex-column justify-content-between p-3 p-md-4">
          <div>
            <Card.Title className="mb-1 fw-semibold">
              {court.name}
            </Card.Title>

            <Card.Text className="text-muted mb-3">
              {court.address}
            </Card.Text>

            <div className="small text-muted">
              <div className="mb-1">
                <strong className="text-dark">Condition:</strong>{" "}
                {formatLabel(court.condition)}
              </div>

              <div className="mb-1">
                <strong className="text-dark">Environment:</strong>{" "}
                {formatLabel(court.environment)}
              </div>

              <div>
                <strong className="text-dark">Occupancy:</strong>{" "}
                {occupancy}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={handleAdd} disabled={added || loading}>
              {added ? 'Added' : 'Add Court'}
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default FindCourtsCard;
