import { useState, useEffect } from 'react';

interface Pet {
  id?: string; // Optional if not provided by the API
  title: string;
  description: string;
  url: string; // This is the property provided by the API for the image
  created: string; // The creation date property from the API
}

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const petsData: Pet[] = await response.json();
        
        // Format the creation date when the data is fetched
        const petsWithFormattedDates = petsData.map((pet, index) => ({
          ...pet,
          id: index.toString(),
          created: new Date(pet.created).toLocaleDateString(), // Date formatted here
        }));
        
        setData(petsWithFormattedDates);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};