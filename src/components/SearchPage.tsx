'use client';
import { User } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import { Table, Form, InputGroup, Container } from 'react-bootstrap';
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
    <Container className="mt-4">
      {/* 1. The Search Bar */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="search-icon"></InputGroup.Text>
        <Form.Control
          placeholder="Search usernames..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* 2. The Table */}
      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Pfp</th>
            <th>Name</th>
            <th>Skill</th>
            <th>Home Court</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <ProfileTableCard key={user.id} user={user} owner={owner} />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted py-4">
                No users found matching
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default SearchPage;