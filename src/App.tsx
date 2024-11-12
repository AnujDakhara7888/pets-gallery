// App.tsx
import React,{useRef} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageGallery from './components/ImageGallery';
import About from './components/About';
import Navbar from './components/Navbar';
import { ImageProvider } from './context/ImageContext';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <ImageProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ImageGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ImageProvider>
    </Router>
  );
}

export default App;
