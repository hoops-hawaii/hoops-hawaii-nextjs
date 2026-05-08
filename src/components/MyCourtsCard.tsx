"use client";


import { Court } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { setHomeCourt, removeHomeCourt } from '@/lib/dbActions';

type CourtItemProps = {
  court: Court;
  onRemove?: (courtId: number) => void;
  homeCourtId?: number | null;
}


/* Renders a single row in the List Stuff table. See list/page.tsx. */
const MyCourtCard = ({ court, onRemove, homeCourtId }: CourtItemProps) => {
  const formatLabel = (value: string) => value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  const [flipped, setFlipped] = useState(false);
  const [present, setPresent] = useState(court.present);
  const isHome = homeCourtId === court.id;
  const capacity = court.capacity;
  const router = useRouter();
  const occupancy = `${present} / ${capacity}`;
  const handleIncrement = async () => {
    try {
      const res = await fetch(`/api/courts/${court.id}/increment`, {
        method: "POST",
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error);
        return;
      }
      const data = await res.json();
      setPresent(data.present);
    } catch (err) {
      console.error(err);
      alert('Failed to check in');
    }
  };

  const handleDecrement = async () => {
    try {
      const res = await fetch(`/api/courts/${court.id}/checkout`, {
        method: "POST",
        credentials: 'include',
      });
      if (!res.ok) {
        const error = await res.json();
        alert(error.error);
        return;
      }
      const data = await res.json();
      setPresent(data.present);
    } catch (err) {
      console.error(err);
      alert('Failed to check out');
    }
  };

  const handleRemove = async () => {
    try {
      const res = await fetch(`/api/courts/${court.id}/unsave`, {
        method: "POST",
        credentials: 'include',
      });
      if (!res.ok) {
        alert('Failed to remove court');
        return;
      }
      onRemove?.(court.id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to remove court');
    }
  };

  const handleSetHome = async () => {
    try {
      await setHomeCourt(court.id);
      router.refresh(); // important
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveHome = async () => {
    try {
      await removeHomeCourt();
      router.refresh(); // important
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="text-white border-0 overflow-hidden position-relative" style={{
      height: '425px',
    }}>
      {isHome && (
        <span className="badge bg-success text-dark position-absolute top-0 start-0 m-2">
          Home Court
        </span>
      )}
      {!flipped && (
        <>
          <Card.Img src={court.imageURL ?? "/warrior-rec.png"} alt={court.name} className="h-100 w-100" style={{ objectFit: "cover" }} />
          <div className="position-absolute bottom-0 w-100 p-3 bg-dark bg-opacity-50">
            <h5 className="fw-bold mb-1">{court.name}</h5>
            <h4 className="mb-2">{occupancy}</h4>
            <div className="d-flex gap-2">
              <Button size="sm" variant="success" onClick={handleIncrement}>
                Check In
              </Button>
              <Button size="sm" variant="warning" onClick={handleDecrement}>
                Check Out
              </Button>
              <Button size="sm" variant="light" onClick={() => setFlipped(true)}>
                More Info
              </Button>
            </div>
          </div>
        </>
      )}
      {flipped && (
        <>
          <Card.Img src={court.imageURL ?? "/warrior-rec.png"} alt={court.name} className="h-100 w-100" style={{ objectFit: "cover" }} />
          <div className="position-absolute top-0 w-100 p-3 bg-dark bg-opacity-50">
            <div className="top-0 w-100 p-3 bg-dark bg-opacity-75 text-white">
              <h5 className="fw-bold">{court.name}</h5>
              <hr />
              <p><strong>Address:</strong> {court.address}</p>
              <p><strong>Condition:</strong> {formatLabel(court.condition)}</p>
              <p><strong>Environment:</strong> {formatLabel(court.environment)}</p>
              <p><strong>Capacity:</strong> {capacity}</p>
              <p><strong>Current:</strong> {present}</p>
            </div>

          </div>
          <div className="position-absolute bottom-0 w-100 p-3 bg-dark bg-opacity-50">
            <div className="position-absolute bottom-0 w-100 p-3">
              <div className="d-flex gap-2">
                <Button variant="secondary" onClick={() => setFlipped(false)}>
                  Back
                </Button>
                <Button variant="danger" onClick={handleRemove}>
                  Remove from List
                </Button>
                {!isHome ? (
                  <Button variant="primary" onClick={handleSetHome}>
                    Set Home Court
                  </Button>
                ) : (
                  <Button variant="outline-warning" onClick={handleRemoveHome}>
                    Remove Home Court
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};


export default MyCourtCard;
