import { Court } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const StuffItemAdmin = ({ id, name, address, environment, capacity }: Pick<Court, 'id' | 'name' | 'address' | 'environment' | 'capacity'>) => (
  <tr>
    <td>{name}</td>
    <td>{address}</td>
    <td>{environment}</td>
    <td>{capacity}</td>
    <td>
      <a href={`/edit/${id}`}>Edit</a>
    </td>
  </tr>
);

export default StuffItemAdmin;
