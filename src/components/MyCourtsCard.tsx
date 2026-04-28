"use client";


import { Court } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';
import { useState } from "react";


type CourtItemProps = {
  court: Court;
}


/* Renders a single row in the List Stuff table. See list/page.tsx. */
const MyCourtCard = ({ court }: CourtItemProps) => {
  const [ flipped, setFlipped ] = useState(false);
  const [ present, setPresent ] = useState(court.present);
  const capacity = court.capacity;
  const occupancy = `${present} / ${capacity}`;
  const handleIncrement = async () => {
    if (present >= capacity) return;
    try {
      const res = await fetch(`/api/courts/${court.id}/increment`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to update");
      setPresent((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card className="text-white h-100 border-0 overflow-hidden position-relative">
      {!flipped && (
        <>
          <Card.Img src={court.imageURL ?? "/warrior-rec.png"} alt={court.name} className="h-100 w-100" style={{ objectFit: "cover"}} />
          <div className="position-absolute bottom-0 w-100 p-3 bg-dark bg-opacity-50">
            <h5 className="fw-bold mb-1">{court.name}</h5>
            <h4 className="mb-2">{occupancy}</h4>
            <div className="d-flex gap-2">
              <Button size="sm" onClick={handleIncrement}>
                +1
             </Button>
              <Button size="sm" variant="light" onClick={() => setFlipped(true)}>
                More Info
              </Button>
            </div>
          </div>
        </>
      )}
      {flipped && (
        <div className="text-white h-100 border-0 overflow-hidden position-relative">
          <div>
            <h5 className="fw-bold">{court.name}</h5>
            <hr />
            <p><strong>Address:</strong> {court.address}</p>
            <p><strong>Condition:</strong> {court.condition}</p>
            <p><strong>Environment:</strong> {court.environment}</p>
            <p><strong>Capacity:</strong> {capacity}</p>
            <p><strong>Current:</strong> {present}</p>
          </div>
          <Button variant="secondary" onClick={() => setFlipped(false)}>
            Back
          </Button>
        </div>
      )}
    </Card>
  );
};


export default MyCourtCard;
