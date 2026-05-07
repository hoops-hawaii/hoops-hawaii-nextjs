'use client';
import { User } from '@prisma/client';
import React, { useState, useMemo } from 'react';
import { Table, Form, InputGroup } from 'react-bootstrap';
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
    <div className="mt-4">
      <InputGroup className="mb-3">
        <InputGroup.Text>🔍</InputGroup.Text>
        <Form.Control
          placeholder="Search usernames..."
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table responsive hover className="align-middle">
        <thead>
          <tr>
            <th>Pfp</th>
            <th>Name</th>
            <th>Skill</th>
            <th>Bio</th>
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
              <td colSpan={5} className="text-center text-muted py-4">
                No users found matching
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default SearchPage;