import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPaw, FaBone, FaHeart, FaDog, FaCat } from 'react-icons/fa';

const gradientBackground = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f7c96f, #fe914d, #ff914d);
  background-size: 400% 400%;
  animation: ${gradientBackground} 10s ease infinite;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Content = styled.div`
  font-size: 1.2rem;
  color: #ffffff;
  line-height: 1.8;
  font-family: 'Poppins', sans-serif;
`;

const PetIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 30px 0;
`;

const IconWrapper = styled.div`
  font-size: 2.5rem;
  color: #fff5e1;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    color: #ffda70;
    transform: scale(1.2) rotate(-10deg);
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  color: #fff5e1;

  &:before {
    content: '🐾';
    margin-right: 10px;
    font-size: 1.5rem;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <Title>
        <FaPaw /> About Pet Gallery <FaPaw />
      </Title>

      <PetIcons>
        <IconWrapper>
          <FaDog />
        </IconWrapper>
        <IconWrapper>
          <FaCat />
        </IconWrapper>
        <IconWrapper>
          <FaBone />
        </IconWrapper>
        <IconWrapper>
          <FaHeart />
        </IconWrapper>
      </PetIcons>

      <Content>
        <p>Welcome to our Pet Gallery! A delightful space to explore adorable pets and their heartwarming stories.</p>
        <p>Here's what you can do:</p>

        <FeaturesList>
          <FeatureItem>Browse through a variety of pet images</FeatureItem>
          <FeatureItem>Search by pet name or description</FeatureItem>
          <FeatureItem>Sort images alphabetically or by popularity</FeatureItem>
          <FeatureItem>Select and download multiple images</FeatureItem>
          <FeatureItem>Share your favorite pet images with friends</FeatureItem>
        </FeaturesList>

        <p>We hope our gallery brings a smile to your face. Happy browsing!</p>
      </Content>
    </AboutContainer>
  );
};

export default About;
