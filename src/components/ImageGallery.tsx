import React, { useState, useMemo, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useFetchData } from '../hooks/useFetchData';
import { useImageContext } from '../context/ImageContext';
import { FaDownload, FaCheck, FaTimes, FaCog, FaStar,FaSearch,FaBars } from 'react-icons/fa';

interface Pet {
  id?: string;
  title: string;
  description: string;
  url: string;
  created: string;
}
interface OptionButtonProps {
  show: boolean;
}
interface NotificationBannerProps {
  show: boolean;
}
const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 140, 0, 0.8), 0 0 20px rgba(255, 69, 0, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 140, 0, 1), 0 0 40px rgba(255, 69, 0, 1);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
`;
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
  animation: ${glow} 2s ease-in-out infinite alternate;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.2);
    background: linear-gradient(135deg, #ff5252, #ff914d);
  }

  &:focus {
    outline: none;
  }
`;

const OptionButton = styled(MainFabButton)<OptionButtonProps>`
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


const FabButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #e100ff, #7f00ff);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(127, 0, 255, 0.5);
  font-size: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(127, 0, 255, 0.5);
  }

  &:focus {
    outline: none;
  }
`;
const SortFabButton = styled(FabButton)`
  background: linear-gradient(135deg, #8a2be2, #6a0dad);
  &:hover {
    background: linear-gradient(135deg, #7518d0, #4b0082);
  }
`;

const WelcomeBanner = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, #ffbb00, #ff914d, #f79c42); /* Warm pet-friendly gradient */
  background-size: 400% 400%;
  color: #fff;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.1rem;
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif; /* Friendly font for pets */
  animation: gradientMove 8s ease-in-out infinite, glow 3s ease-in-out infinite;

  /* Adding a subtle pet paw print background */
  &::after {
    content: '🐾'; /* Paw print symbol */
    font-size: 5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
    z-index: 0;
  }

  &:hover {
    transform: scale(1.05) translateY(-5px); /* Hover scale and slight upward movement */
    box-shadow: 0 15px 50px rgba(255, 165, 0, 0.6);
    cursor: pointer;
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
    animation: shimmer 3s linear infinite;
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes glow {
    0%, 100% {
      text-shadow: 0 0 20px rgba(255, 165, 0, 0.6), 0 0 40px rgba(255, 165, 0, 0.4);
    }
    50% {
      text-shadow: 0 0 30px rgba(255, 165, 0, 0.8), 0 0 60px rgba(255, 165, 0, 0.5);
    }
  }
`;






const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 40px;
  background: radial-gradient(circle, #f2f2f2, #d9d9d9); /* Soft pet-friendly gradient */
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


const SortButton = styled(Button)`
  background: linear-gradient(135deg, #76c7c0, #4ecdc4); /* Light teal/pet green color */
  
  &:hover {
    background: linear-gradient(135deg, #4ecdc4, #2e8b8b); /* Slightly darker teal on hover */
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  align-items: start;
  justify-items: center;
`;
const DownloadIcon = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #ffffff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #007bff;
  transition: background-color 0.3s, opacity 0.3s;
  opacity: 0;  // Initially hidden
  visibility: hidden;  // Initially hidden

  &:hover {
    background-color: #007bff;
    color: #ffffff;
  }

  &:focus {
    outline: none;
  }
`;

const ImageCard = styled.div<{ selected: boolean }>`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => (props.selected ? '0 0 20px 5px rgba(238, 100, 255, 0.6)' : '0 8px 20px rgba(0, 0, 0, 0.1)')};
  border: ${(props) => (props.selected ? '4px solid #e100ff' : 'none')};
  background-color: #f9f9f9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 30px rgba(255, 127, 0, 0.4);
  }

  &:hover ${DownloadIcon} {
    opacity: 1;
    visibility: visible;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure uniform image size */
  transition: filter 0.3s ease, transform 0.3s ease;
  background-color: #e0e0e0; /* Light gray background if image fails to load */

  ${ImageCard}:hover & {
    filter: brightness(0.85); /* Slightly darken on hover */
    transform: scale(1.1); /* Slight zoom-in on hover */
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 0, 255, 0.7);
  color: #ffffff;
  padding: 20px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s, background 0.3s;

  ${ImageCard}:hover & {
    opacity: 1;
    background: rgba(127, 0, 255, 0.9);
  }
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: #ff6347; /* Warm and pet-friendly color */
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  
`;

const Description = styled.p`
  margin: 10px 0 5px;
  color: #f0f0f0;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  line-height: 1.4;
`;
const CreationDate = styled.p`
  margin: 5px 0 0;
  color: #dcdcdc;
  font-size: 0.9rem;
  font-family: 'Roboto', sans-serif;
  font-style: italic;
`;

const pawWalk = keyframes`
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateX(100%);
  }
`;

const PawLoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 238, 204, 0.9); /* Subtle pet-themed background */
  z-index: 9999;
  overflow: hidden;
`;

const PawPrint = styled.div`
  font-size: 3rem;
  color: #ff914d; /* Pet-themed orange color */
  animation: ${pawWalk} 2.0s ease-in-out infinite;
`;

const Loader = () => {
  return (
    <PawLoaderWrapper>
      <PawPrint>🐾</PawPrint>
    </PawLoaderWrapper>
  );
};
const NotificationBanner = styled.div<NotificationBannerProps>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #4caf50; /* Success green color */
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transition: opacity 0.5s ease;
  z-index: 1000; /* Ensure visibility */
`;




const ImageGallery: React.FC = () => {
  const { data: fetchedData, loading, error } = useFetchData('https://eulerity-hackathon.appspot.com/pets');
  const { selectedImages, toggleSelection, selectAll, clearSelection } = useImageContext();
  const [data, setData] = useState<Pet[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState({ show: false, message: "" });

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const handleResetSearch = () => {
    setSearchQuery(''); // Reset the search query to show all pets
  };

  useEffect(() => {
    if (fetchedData.length > 0) {
      const sortedData = [...fetchedData].sort((a, b) => a.title.localeCompare(b.title));
      setData(sortedData);
    }
  }, [fetchedData]);

  const handleSortToggle = () => {
    const sortedData = [...data].sort((a, b) => {
      return sortOrder === 'asc'
        ? b.title.localeCompare(a.title)
        : a.title.localeCompare(b.title);
    });
    setData(sortedData);
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };
  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const showNotification = (message: string) => {
    setNotification({ show: true, message });
    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };
  const handleDownloadSingle = async (pet: Pet) => {
    const response = await fetch(pet.url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${pet.title}.jpg`;  // Use pet title for file name
    link.click();
    showNotification(`Downloaded ${1} image`);
  };

  const handleDownloadAll = async () => {
    const selectedPets = data.filter((pet: Pet) => selectedImages.includes(pet.id!));

    for (const pet of selectedPets) {
      const response = await fetch(pet.url);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${pet.title}.jpg`;
      link.click();
    }

    showNotification(`Downloaded ${selectedPets.length} images`);
  };

  // Filter images based on search query
  const filteredData = useMemo(
    () =>
      data.filter(
        (pet) =>
          pet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [data, searchQuery]
  );

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
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <SearchButton onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
          <Button onClick={handleResetSearch}>Clear</Button>
        </ControlPanel>
        <Grid>
          {filteredData.map(pet => (
            <ImageCard
              key={pet.id}
              selected={selectedImages.includes(pet.id!)}
              onClick={() => toggleSelection(pet.id!)}
            >
              <Image src={pet.url} alt={pet.title} />
              <DownloadIcon
                onClick={(e) => {
                  e.stopPropagation();  // Prevent card selection toggle
                  handleDownloadSingle(pet);  // Trigger single image download
                }}
              >
                <FaDownload size={16} />
              </DownloadIcon>
              <ImageOverlay>
                <Title>{pet.title}</Title>
                <Description>{pet.description}</Description>
                <CreationDate>Created on: {new Date(pet.created).toLocaleDateString()}</CreationDate>
              </ImageOverlay>
            </ImageCard>
          ))}
        </Grid>
        <FabContainer
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {isExpanded && (
            <>
              <OptionButton
                show={isExpanded}
                onClick={handleSortToggle}
                title="Sort"
              >
                <FaStar />
                {/* {sortOrder === 'asc' ? <FaChevronUp /> : <FaChevronDown />} */}
              </OptionButton>
              <OptionButton
                show={isExpanded}
                onClick={() => selectAll(data.map(pet => pet.id!))}
                title="Select All"
              >
                <FaCheck />
              </OptionButton>
              <OptionButton
                show={isExpanded}
                onClick={clearSelection}
                title="Deselect"
              >
                <FaTimes />
              </OptionButton>
              <OptionButton
                show={isExpanded}
                onClick={handleDownloadAll}
                title="Download"
              >
                <FaDownload />
              </OptionButton>
            </>
          )}
          <MainFabButton onClick={toggleExpansion} aria-label="Toggle options">
          <FabButtonIcon />
          </MainFabButton>
        </FabContainer>
      </GalleryContainer>
    </>
  );
};

export default ImageGallery;