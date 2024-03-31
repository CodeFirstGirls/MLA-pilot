import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { IconHeartPlus, IconChartInfographic, IconNotebook, IconFilePencil, IconLogout } from '@tabler/icons-react';
import { Group } from '@mantine/core';
import logo from '../img/CFG_logo.png';

const NavbarComponent = ({ onLogout }) => {
  const data = [
    { link: '/trackExercise', label: 'Track New Exercise', icon: IconHeartPlus },
    { link: '/statistics', label: 'Statistics', icon: IconChartInfographic },
    { link: '/journal', label: 'Weekly Journal', icon: IconNotebook },
    { link: '/manage', label: 'Manage', icon: IconFilePencil },
    { label: 'Logout', icon: IconLogout },
  ];

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Navbar className="navbar" expand="lg">
      <div className="navbarMain">
        <Group id="header" align="center">
          <img src={logo} alt="CFG Fitness App Logo" id="appLogo" />
          <h3 id="appTitle">MLA Fitness App</h3>
        </Group>
        <Nav className="mr-auto flex-column navComponent">
          {data.map((item, index) => (
            item.label === 'Logout' ? (
              <Nav.Link key={index} id="navLink" onClick={handleLogout}>
                <item.icon className="linkIcon" stroke={1.5} />
                <span>{item.label}</span>
              </Nav.Link>
            ) : (
              <Link key={index} id="navLink" to={item.link}>
                <item.icon className="linkIcon" stroke={1.5} />
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </Nav>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
