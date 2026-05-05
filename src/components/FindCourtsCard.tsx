"use client";

import { useState } from 'react';
import type { Court } from '@prisma/client';
import { Button, Card } from 'react-bootstrap';

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
    setLoading(true);
    try {
      const res = await fetch(`/api/courts/${court.id}/save`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || 'Failed to add court');
        return;
      }
      setAdded(true);
    } catch (error) {
      console.error(error);
      alert('Failed to add court');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-100 border-0 shadow-sm" style={{ minHeight: 240 }}>
      <div className="d-flex flex-row flex-wrap h-100">
        <div className="flex-shrink-0 position-relative" style={{ minWidth: 220, width: '40%', minHeight: 240, overflow: 'hidden' }}>
          <Card.Img
            src={court.imageURL ?? '/warrior-rec.png'}
            alt={court.name}
            className="h-100 w-100"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-3" style={{ minWidth: 260 }}>
          <div>
            <Card.Title className="mb-2">{court.name}</Card.Title>
            <Card.Text className="mb-3 text-muted">{court.address}</Card.Text>
            <div className="mb-3">
              <p className="mb-1"><strong>Condition:</strong> {formatLabel(court.condition)}</p>
              <p className="mb-1"><strong>Environment:</strong> {formatLabel(court.environment)}</p>
              <p className="mb-0"><strong>Occupancy:</strong> {occupancy}</p>
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <Button onClick={handleAdd} disabled={added || loading}>
              {added ? 'Added' : 'Add Court'}
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default FindCourtsCard;
