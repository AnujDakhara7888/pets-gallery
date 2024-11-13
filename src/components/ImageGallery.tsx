import React, { useState, useEffect, useMemo, useCallback, memo,useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFetchData } from '../hooks/useFetchData';
import { useImageContext } from '../context/ImageContext';
import { FaDownload, FaCheck, FaTimes, FaStar, FaSearch, FaBars } from 'react-icons/fa';

interface Pet {
  id?: string;
  title: string;
  description: string;
  url: string;
  created: string;
}

interface Notification {
  show: boolean;
  message: string;
}
interface ImageCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const FabContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
  bottom: 40px;
  right: 20px;
`;

const MainFabButton = styled.button`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #ff914d, #ff5252);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const OptionButton = styled(MainFabButton)<{ show: boolean }>`
  background: linear-gradient(135deg, #7ad6c0, #4ecdc4);
  font-size: 1.5rem;
  margin-bottom: 10px;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? 'translateY(0)' : 'translateY(20px)')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  transition: transform 0.3s, opacity 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.25);
    background: linear-gradient(135deg, #4ecdc4, #7ad6c0);
    box-shadow: 0 8px 20px rgba(0, 255, 150, 0.6);
  }
`;

const FabButtonIcon = styled(FaBars)`
  font-size: 2rem;
`;

const WelcomeBanner = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #ffbb00, #ff914d, #f79c42);
  background-size: 400% 400%;
  color: #fff;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;

  &::after {
    content: '🐾';
    font-size: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    z-index: 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.15);
    border-radius: inherit;
  }
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px;
  background: radial-gradient(circle, #f2f2f2, #d9d9d9);
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
`;

const ControlPanel = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  align-items: center;
  background-color: #f1f9f5;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(160, 215, 248, 0.3);
`;

const SearchInput = styled.input`
  padding: 15px 20px;
  border: 2px solid #cccccc;
  border-radius: 15px;
  flex: 1;
  font-size: 1.1rem;
  color: #333333;
  background-color: #f9f9f9;
  transition: border 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border: 2px solid #6fa3f4;
    box-shadow: 0 0 15px rgba(111, 163, 244, 0.5);
    background-color: #ffffff;
  }
`;

const Button = styled.button`
  padding: 15px 25px;
  border: none;
  background: linear-gradient(135deg, #ff9800, #ff6f00);
  color: #ffffff;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 8px 20px rgba(255, 159, 64, 0.3);

  &:hover {
    background: linear-gradient(135deg, #ff6f00, #e65100);
    transform: scale(1.05);
    box-shadow: 0 15px 40px rgba(255, 159, 64, 0.5);
  }
`;

const SearchButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  align-items: start;
  justify-items: center;
`;

const ImageCardWrapper = styled.div<{ selected: boolean }>`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) =>
    props.selected ? '0 0 20px 5px rgba(238, 100, 255, 0.6)' : '0 8px 20px rgba(0, 0, 0, 0.1)'};
  border: ${(props) => (props.selected ? '4px solid #e100ff' : 'none')};
  background-color: #f9f9f9;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 8px 20px rgba(255, 127, 0, 0.4);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #e0e0e0;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  padding: 20px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  ${ImageCardWrapper}:hover & {
    opacity: 1;
  }
`;

const NotificationBanner = styled.div<{ show: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 1000;
`;

const LoaderWrapper = styled.div`
  /* ...styles for loader... */
`;

const Loader = () => (
  <LoaderWrapper>
    {/* ...loader content... */}
  </LoaderWrapper>
);

interface ImageCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
}

const ImageCard = memo(({ pet, isSelected, onToggleSelection }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(() => {
    onToggleSelection(pet.id!);
  }, [onToggleSelection, pet.id]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ImageCardWrapper 
      ref={imageRef} 
      selected={isSelected} 
      onClick={handleClick}
    >
      {isVisible && (
        <>
          {!isLoaded && (
            <div 
              style={{ 
                width: '100%', 
                height: '100%', 
                background: '#f0f0f0',
                position: 'absolute'
              }} 
            />
          )}
          <Image
            src={pet.url}
            alt={pet.title}
            loading="lazy"
            decoding="async"
            width="300"
            height="400"
            onLoad={handleImageLoad}
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
          {isLoaded && (
            <ImageOverlay>
              <h3>{pet.title}</h3>
              <p>{pet.description}</p>
            </ImageOverlay>
          )}
        </>
      )}
    </ImageCardWrapper>
  );
});

const ChunkedGrid = memo(({ items, selectedImages, toggleSelection, chunkSize = 12 }: {
  items: Pet[];
  selectedImages: string[];
  toggleSelection: (id: string) => void;
  chunkSize?: number;
}) => {
  const [visibleItems, setVisibleItems] = useState(chunkSize);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting && visibleItems < items.length) {
          setVisibleItems(prev => Math.min(prev + chunkSize, items.length));
        }
      },
      { rootMargin: '200px' }
    );

    const currentElement = gridRef.current?.lastElementChild;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => observer.disconnect();
  }, [visibleItems, items.length, chunkSize]);

  return (
    <Grid ref={gridRef}>
      {items.slice(0, visibleItems).map((pet) => (
        <ImageCard
          key={pet.id}
          pet={pet}
          isSelected={selectedImages.includes(pet.id!)}
          onToggleSelection={toggleSelection}
        />
      ))}
    </Grid>
  );
});

const ImageGallery: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetchData('https://eulerity-hackathon.appspot.com/pets');
  const { selectedImages, toggleSelection, selectAll, clearSelection } = useImageContext();
  const [data, setData] = useState<Pet[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<Notification>({ show: false, message: '' });

  // Memoize the filtered and sorted data
  const processedData = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return [...data]
      .filter(pet => 
        pet.title.toLowerCase().includes(lowerCaseQuery) ||
        pet.description.toLowerCase().includes(lowerCaseQuery)
      )
      .sort((a, b) => 
        sortOrder === 'asc' 
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );
  }, [data, searchQuery, sortOrder]);

  useEffect(() => {
    if (fetchedData.length > 0) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleSortToggle = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  const showNotification = useCallback((message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  }, []);

  const handleDownload = useCallback(async (pets: Pet[]) => {
    try {
      await Promise.all(
        pets.map(async (pet) => {
          const response = await fetch(pet.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${pet.title}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        })
      );
      showNotification(`Downloaded ${pets.length} images`);
    } catch (error) {
      console.error('Error downloading images:', error);
    }
  }, [showNotification]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NotificationBanner show={notification.show}>
        {notification.message}
      </NotificationBanner>
      
      <WelcomeBanner>Pets World</WelcomeBanner>
      
      <GalleryContainer>
        <ControlPanel>
          <SearchInput
            type="text"
            placeholder="Search by title or description..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setSearchQuery('')}>Clear</Button>
        </ControlPanel>

        <ChunkedGrid
          items={processedData}
          selectedImages={selectedImages}
          toggleSelection={toggleSelection}
          chunkSize={12}
        />

        <FabContainer
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {isExpanded && (
            <>
              <OptionButton show onClick={handleSortToggle} title="Sort">
                <FaStar />
              </OptionButton>
              <OptionButton
                show
                onClick={() => selectAll(processedData.map(pet => pet.id!))}
                title="Select All"
              >
                <FaCheck />
              </OptionButton>
              <OptionButton show onClick={clearSelection} title="Deselect">
                <FaTimes />
              </OptionButton>
              <OptionButton
                show
                onClick={() => handleDownload(processedData.filter(pet => selectedImages.includes(pet.id!)))}
                title="Download"
              >
                <FaDownload />
              </OptionButton>
            </>
          )}
          <MainFabButton onClick={() => setIsExpanded(prev => !prev)}>
            <FabButtonIcon />
          </MainFabButton>
        </FabContainer>
      </GalleryContainer>
    </>
  );
};

export default ImageGallery;