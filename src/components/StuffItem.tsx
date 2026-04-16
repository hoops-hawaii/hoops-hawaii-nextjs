import { Court } from '@prisma/client';
import Link from 'next/link';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const StuffItem = ({ name, address, condition, id }: Court) => (
  <tr>
    <td>{name}</td>
    <td>{condition}</td>
    <td>
      <Link href={`/edit/${id}`}>Edit</Link>
    </td>
  </tr>
);

export default StuffItem;
