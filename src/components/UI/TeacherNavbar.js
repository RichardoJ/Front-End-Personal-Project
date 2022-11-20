import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './TeacherNavbar.css'

function TeacherNavigationBar() {
  return (
    <Navbar className='color-nav' variant='dark' expand="lg">
      <Container  fluid>
        <Navbar.Brand href="/teacher/home">Teacher</Navbar.Brand>
        <Navbar.Toggle aria-controls="collapse-navbar" />
        <Navbar.Collapse id="collapse-navbar">
          <Nav className="justify-content-end flex-grow-1">
            <Nav.Link href="/teacher/home">Home</Nav.Link>
            <Nav.Link href="/teacher/students">Students</Nav.Link>
            <Nav.Link href="/teacher/assignments">Assignments</Nav.Link>
            <Nav.Link href="/teacher/courses">Courses</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Add Grades
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Add Student</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TeacherNavigationBar;