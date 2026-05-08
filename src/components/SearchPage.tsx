'use client';
import { User } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import ProfileTableCard from './ProfileTableCard';

const SearchPage = ({ allUsers, owner }: { allUsers: User[]; owner: User }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // useMemo prevents re-calculating the filter unless searchTerm or allUsers changes
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => a.username.localeCompare(b.username));
  }, [searchTerm, allUsers]);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-center mb-4">
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              placeholder="Search usernames..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      <div className="d-flex flex-column gap-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <ProfileTableCard
              key={user.id}
              user={user}
              owner={owner}
            />
          ))
        ) : (
          <p className="text-center text-muted">
            No users found matching
          </p>
        )}
      </div>
    </Container>
  );
};

export default SearchPage;