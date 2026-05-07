import { notFound } from 'next/navigation';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
import AddCourtForm from '@/components/AddCourtForm';
import { Container } from 'react-bootstrap';

export default async function AddCourtPage() {
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );
  
  if (!session || session.user.username !== 'admin') {
    return notFound();
  }

  return (
    <main>
      <Container className="py-5">
      <AddCourtForm/>
      </Container>
    </main>
  );
}
