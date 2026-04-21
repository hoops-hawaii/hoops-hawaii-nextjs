import { Prisma } from '@prisma/client';

type CourtWithRelations = Prisma.CourtGetPayload<{
  include: {
    news: true;
    users: true;
  }
}>;

type CourtItemProps = {
  court: CourtWithRelations;
};

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const CourtItem = ({ court }: CourtItemProps) => (
  <tr>
    <td>{court.name}</td>
    <td>{court.address}</td>
    <td>{court.environment}</td>
    <td>{court.condition}</td>
    <td>{court.capacity}</td>
    <td>{court.present}</td>
    <td>
      {court.news.length > 0 
      ? court.news[court.news.length - 1].news : 'No news'}
    </td>
  </tr>
);

export default CourtItem;
