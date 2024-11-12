import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: linear-gradient(135deg, #ffbb00, #ff914d, #f79c42);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  text-align: center;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputField = styled.input`
  padding: 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:focus {
    outline: none;
    background: #ffedcc;
    transform: scale(1.05);
  }
`;

const TextArea = styled.textarea`
  padding: 15px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  resize: none;

  &:focus {
    outline: none;
    background: #ffedcc;
    transform: scale(1.05);
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  font-size: 1.1rem;
  font-weight: bold;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
  box-shadow: 0 8px 20px rgba(247, 156, 66, 0.5);

  &:hover {
    background: #ff914d;
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(247, 156, 66, 0.6);
  }
`;

const ContactIcons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
`;

const IconWrapper = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  animation: ${floatAnimation} 4s ease-in-out infinite;
  color: #ffedcc;
  text-decoration: none;

  & > span {
    margin-top: 10px;
    font-size: 1rem;
  }

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <ContactContainer>
      <Title>Get in Touch</Title>
      <ContactForm onSubmit={handleSubmit}>
        <InputField 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        <InputField 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <TextArea 
          name="message" 
          rows={5} 
          placeholder="Your Message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
        />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>

      <ContactIcons>
        {/* <IconWrapper href="mailto:anujdakhara@gmail.com" target="_blank">
          <FaEnvelope />
          <span>Email Us</span>
        </IconWrapper> */}
        <IconWrapper href="tel:+18628820115">
          <FaPhone />
          <span>Call Us</span>
        </IconWrapper>
        <IconWrapper href="https://maps.app.goo.gl/T5LvhW1Ru3mcKbas6" target="_blank" rel="noopener noreferrer">
          <FaMapMarkerAlt />
          <span>Visit Us</span>
        </IconWrapper>
      </ContactIcons>
    </ContactContainer>
  );
};

export default Contact;
