"use client";


import { Court } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { useState } from "react";


type CourtItemProps = {
  court: Court;
  onRemove?: (courtId: number) => void;
}


/* Renders a single row in the List Stuff table. See list/page.tsx. */
const MyCourtCard = ({ court, onRemove }: CourtItemProps) => {
  const [ flipped, setFlipped ] = useState(false);
  const [ present, setPresent ] = useState(court.present);
  const capacity = court.capacity;
  const occupancy = `${present} / ${capacity}`;
  const handleIncrement = async () => {
    try {
      const res = await fetch(`/api/courts/${court.id}/increment`, {
        method: "POST",
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
      });
      if (!res.ok) {
        alert('Failed to remove court');
        return;
      }
      onRemove?.(court.id);
    } catch (err) {
      console.error(err);
      alert('Failed to remove court');
    }
  };
  return (
    <Card className="text-success h-100 border-0 overflow-hidden position-relative">
      {!flipped && (
        <>
          <Card.Img src={court.imageURL ?? "/warrior-rec.png"} alt={court.name} className="h-100 w-100" style={{ objectFit: "cover"}} />
          <div className="position-absolute bottom-0 w-100 p-3 bg-dark bg-opacity-50">
            <h5 className="fw-bold mb-1">{court.name}</h5>
            <h4 className="mb-2">{occupancy}</h4>
            <div className="d-flex gap-2">
              <Button size="sm" onClick={handleIncrement}>
                Check In
             </Button>
              <Button size="sm" variant="danger" onClick={handleDecrement}>
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
        <div className="text-success h-100 border-0 overflow-hidden position-relative" style={{ backgroundImage: `url(${court.imageURL ?? "/warrior-rec.png"})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="position-absolute top-0 w-100 p-3 bg-dark bg-opacity-75 text-white">
            <h5 className="fw-bold">{court.name}</h5>
            <hr />
            <p><strong>Address:</strong> {court.address}</p>
            <p><strong>Condition:</strong> {court.condition}</p>
            <p><strong>Environment:</strong> {court.environment}</p>
            <p><strong>Capacity:</strong> {capacity}</p>
            <p><strong>Current:</strong> {present}</p>
          </div>
          <div className="position-absolute bottom-0 w-100 p-3">
            <div className="d-flex gap-2">
              <Button variant="secondary" onClick={() => setFlipped(false)}>
                Back
              </Button>
              <Button variant="danger" onClick={handleRemove}>
                Remove from List
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};


export default MyCourtCard;
