// components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaPaw, FaBone, FaFish } from 'react-icons/fa';

const NavbarContainer = styled.nav`
  background: linear-gradient(135deg, #f79c42, #ffbe00, #ff914d);
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.4);
  border-radius: 15px;
  margin-bottom: 30px;
  
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff5e1; /* Softer white */
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    color: #ffe29a;
  }
`;

const PawIcon = styled(FaPaw)`
  margin-right: 10px;
  font-size: 1.8rem;
  color: #ffe29a;
`;

const NavLinksContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  font-size: 1.2rem;
  color: #fff5e1;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    color: #ffda70;
    transform: scale(1.1);
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0%;
    height: 3px;
    background-color: #ffda70;
    transition: width 0.3s;
  }

  &:hover::before {
    width: 100%;
  }
`;

const Button = styled(Link)`
  background: #ff914d;
  padding: 10px 20px;
  color: #333;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s, transform 0.3s;
  box-shadow: 0 5px 15px rgba(255, 145, 77, 0.4);

  &:hover {
    background: #f77d3e;
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(255, 145, 77, 0.6);
  }
`;

const FunIconsContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const BoneIcon = styled(FaBone)`
  font-size: 1.4rem;
  color: #fff5e1;
  transition: transform 0.3s;

  &:hover {
    transform: rotate(20deg);
  }
`;

const FishIcon = styled(FaFish)`
  font-size: 1.4rem;
  color: #fff5e1;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;


const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">
        <PawIcon />
        PetGallery
      </Logo>
      <NavLinksContainer>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </NavLinks>
      </NavLinksContainer>
      <FunIconsContainer>
        <BoneIcon />
        <FishIcon />
      </FunIconsContainer>
      <Button to="/contact">Contact</Button>
    </NavbarContainer>
  );
};

export default Navbar;
