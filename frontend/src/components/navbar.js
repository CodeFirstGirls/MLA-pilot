import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = ({ onLogout }) => {
  const navigate = useNavigate();

  const onNavigate = (route) => {
    console.log('Navigating to:', route);  
    switch(route) {
      case 'TrackExercise':
        navigate('/trackExercise');
        break;
      case 'Statistics':
        navigate('/statistics');
        break;
      case 'Journal':
        navigate('/journal');
        break;
      default:
        console.error('Invalid route:', route);
    }
  };

  return (
    <Navbar className="nav-back custom-navbar" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('TrackExercise')}>Track New Exercise</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Statistics')}>Statistics</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={() => onNavigate('Journal')}>Weekly Journal</Nav.Link>
          <Nav.Link className="custom-nav-link" onClick={onLogout}>Logout</Nav.Link>
        </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
