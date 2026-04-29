import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';
//import EditStuffForm from '@/components/EditStuffForm';

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  await params;
  // Protect the page, only logged in users can access it.
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { username: string; id: string; name: string };
    } | null,
  );
  return null;
  /*
  const stuff: Stuff | null = await prisma.stuff.findUnique({
    where: {
      id: editID,
    },
  });
  if (!stuff) {
    return notFound();
  }
  
  return (
    <main>
      <EditStuffForm stuff={stuff} />
    </main>
  );
  */
}
