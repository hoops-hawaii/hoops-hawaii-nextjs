"use client";

import { Court } from '@prisma/client';
import { Card, Button } from 'react-bootstrap';

type CourtItemProps = {
  court: Court;
}

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const MyCourtsCard = ({ court }: CourtItemProps) => {
  const occupancy = `${court.present} / {court.capacity}`;
  const crowded = (court.present / court.capacity) >= 1
  return (
    <Card className="text-white h-100 border-0 overflow-hidden position-relative">
      <Card.Img src={court.imageURL || "/warrior-rec.png"} alt = {court.name} className="h-100 w-100" style={{objectFit: "cover"}} />
      <Card.Title className="fw-bold m-0">
        {court.name}
      </Card.Title>
      <Card.Body>
        <h2>{occupancy}</h2>
      </Card.Body>
    </Card>
  );
};

export default MyCourtsCard;
