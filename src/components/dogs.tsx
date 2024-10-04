import React, { useEffect, useState } from 'react';

interface Dog {
  id: number;
  name: string;
  breed_group?: string;
  life_span: string;
  temperament: string;
  image: {
    url: string;
  };
}

const DogGallery: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [filter, setFilter] = useState('');
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiKey = 'live_EG5RjvBTHyTFuRohrKCDi4Xsv8dFLdjQnRBxAe0vVsGUpdX5N8KEfbtdp5ScSnID';

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: {
            'x-api-key': apiKey
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data: Dog[] = await response.json();
        setDogs(data);
        setFilteredDogs(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [apiKey]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    const filtered = dogs.filter(dog =>
      dog.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDogs(filtered);
  };

  const handleDogClick = (dog: Dog) => {
    setSelectedDog(dog);
  };

  const handleBackClick = () => {
    setSelectedDog(null);
  };

  if (loading) return <p className="text-white text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-gradient-to-b from-green-400 to-blue-500 min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white text-center mb-6">Dog Breed Gallery</h1>

      {selectedDog ? (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
          <img
            src={selectedDog.image.url}
            alt={selectedDog.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold mb-4">{selectedDog.name}</h2>
          <p className="text-gray-600 mb-2">Breed Group: {selectedDog.breed_group || 'N/A'}</p>
          <p className="text-gray-600 mb-2">Life Span: {selectedDog.life_span}</p>
          <p className="text-gray-600 mb-2">Temperament: {selectedDog.temperament}</p>
          <button
            onClick={handleBackClick}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Back to All Breeds
          </button>
        </div>
      ) : (
        <>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Filter by dog breed"
            className="block w-full md:w-1/3 mx-auto p-2 border border-gray-200 rounded-md mb-4 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDogs.map(dog => (
              <div
                key={dog.id}
                onClick={() => handleDogClick(dog)}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:bg-gray-100 transition"
              >
                <img
                  src={dog.image.url}
                  alt={dog.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{dog.name}</h2>
                <p className="text-gray-600">Breed Group: {dog.breed_group || 'N/A'}</p>
                <p className="text-gray-600">Life Span: {dog.life_span}</p>
                <p className="text-gray-600">Temperament: {dog.temperament}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <footer className="mt-6 text-center text-gray-200">
        <p>Powered by KimTech</p>
        <p>Email: elijahkimani1293@gmail.com | Phone: 0791337188</p>
      </footer>
    </div>
  );
};

export default DogGallery;
