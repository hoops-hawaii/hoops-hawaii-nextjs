'use client';

import { Button, Card, Badge, Image } from 'react-bootstrap';
import { joinTeam } from '@/lib/dbActions';
import { Team, User } from "@prisma/client";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

type TeamWithRelations = Team & {
  users: User[];
}

const TeamCard = ({ team, hasTeam }: { team: TeamWithRelations; hasTeam: boolean }) => {
  const handleJoin = async () => {
    await joinTeam(team.id);
  };

  return (
    <Card className="mb-3 shadow-sm border-0" style={{ borderRadius: '16px', overflow: 'hidden' }}>
      <Card.Body className="p-4 d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="mb-0 fw-bold text-success">{team.name}</Card.Title>
          <Badge bg="success" pill style={{ fontSize: '0.85rem', padding: '0.5rem 0.75rem', letterSpacing: '0.3px', }}>{team.users?.length ?? 0} players</Badge>
        </div>
        <Card.Text className="text-muted mb-3">{team.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="d-flex align-items-center gap-2 flex-wrap">

            {team.users?.length > 0 ? (
              team.users.slice(0, 8).map((user) => (
                <OverlayTrigger
                  key={user.id}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${user.id}`}>
                      {user.username}
                    </Tooltip>
                  }
                >
                  <Image
                    src={user.pfp || '/default-pfp.png'}
                    width={34}
                    height={34}
                    alt={user.username}
                    className="rounded-circle border shadow-sm"
                    style={{
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                  />
                </OverlayTrigger>
              ))
            ) : (
              <span className="text-muted small">No members yet</span>
            )}

          </div>
          <Button
            onClick={handleJoin}
            disabled={hasTeam}
            variant={hasTeam ? 'secondary' : 'outline-success'}
            size="sm"
            style={{
              borderRadius: '999px',
              padding: '0.25rem 0.75rem',
              fontSize: '0.85rem',
              whiteSpace: 'nowrap',
            }}
          >
            {hasTeam ? 'Already in a Team' : 'Join Team'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TeamCard;