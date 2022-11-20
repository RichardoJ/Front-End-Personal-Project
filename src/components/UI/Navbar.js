import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'

function NavigationBar() {
  return (
    <Navbar className='color-nav' variant='dark' expand="lg">
      <Container  fluid>
        <Navbar.Brand href="/student/home">Learning MS</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1">
            <Nav.Link href="/student/home">Home</Nav.Link>
            <Nav.Link href="/student/grades">Grades</Nav.Link>
            <Nav.Link href="/student/assignment">Assignments</Nav.Link>
            <Nav.Link href="/student/courses">Courses</Nav.Link>
            <Nav.Link href="/student/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;