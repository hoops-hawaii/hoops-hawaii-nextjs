'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';


const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;
  const role = session?.user?.role;
  const currentUser = session?.user?.username || '';
  const userImage = session?.user?.image || null;
  return (
    
    <Navbar className="bg-white" expand="lg">
      <Container fluid className="px-5">
        <Navbar.Brand href="/"><Image src="\hoopshawaii.png" width="175px"alt="logo"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link id="list-stuff-nav" href="/list" active={pathName === '/list'}>
                  List Courts
                </Nav.Link>
                <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                  Find Courts
                </Nav.Link>
                <Nav.Link id="add-stuff-nav" href="/add" active={pathName === '/add'}>
                  Looking For Team
                </Nav.Link>
                <Nav.Link id="add-stuff-nav" href="/hoopers" active={pathName === '/hoopers'}>
                  All Hoopers
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link id="admin-stuff-nav" href="/admin" active={pathName === '/admin'}>
                Add Court
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <Nav.Link id="profile" title={currentUser} href={`/profile/view/${currentUser}`} active={pathName === `/profile/view/${currentUser}`}>
                <Image src={userImage || '/default-pfp.png'} alt="Profile picture" className='rounded-circle m-2' width="30" height="30" />
                {currentUser}
              </Nav.Link>
            ) : (
              <NavDropdown id="profile-dropdown" title="Profile">
                <NavDropdown.Item id="profile-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="profile-dropdown-sign-up" href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
