import React, { useState, useEffect } from 'react';

interface Image {
  src: string;
  alt: string;
  name: string;
  description: string;
}

interface ImageGroup {
  title: string;
  images: Image[];
}

const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const generateRandomName = () => {
  const words = loremIpsum.split(' ');
  const firstName = getRandomItem(words);
  const lastName = getRandomItem(words.filter((word) => word !== firstName));
  return `${firstName} ${lastName}`;
};

const generateRandomDescription = () => {
  const words = loremIpsum.split(' ').filter((word) => word.length > 3); // Filter out short words
  const sentence = [];
  for (let i = 0; i < 4; i++) {
    sentence.push(getRandomItem(words));
  }
  return sentence.join(' ');
};

const getRandomItem = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const ImageGroup: React.FC<ImageGroup> = ({ title, images }) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {images.map((image) => (
          <div key={image.src} className="flex flex-col">
            <div className="border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
              {/* Image container to ensure image size consistency */}
              <div className="w-full h-48">
                <img src={image.src} alt={image.alt} className="object-cover w-full h-full" />
              </div>
              {/* Text container to allow dynamic text size while maintaining overall card size consistency */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <p className="font-bold">{image.name}</p>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr className="my-4 border-gray-200" />
    </div>
  );
};


const ThreeImageGroups: React.FC = () => {
  const imageSrc = 'https://via.placeholder.com/150'; // Replace with your image placeholder

  const [imageGroups, setImageGroups] = useState<ImageGroup[]>([]);

  useEffect(() => {
    const generateImageGroups = () => {
      const groups: ImageGroup[] = [];
      for (let i = 0; i < 3; i++) {
        const numImages = Math.floor(Math.random() * 6) + 2; // Random between 2 and 7
        const images = Array.from({ length: numImages }).map((_) => ({
          src: imageSrc,
          alt: `Image ${i + 1}`,
          name: generateRandomName(),
          description: generateRandomDescription(),
        }));
        groups.push({ title: `Group ${i + 1}`, images });
      }
      setImageGroups(groups);
    };

    generateImageGroups();
  }, []);

  return (
    <div className="container mx-auto px-4">
      {imageGroups.map((group) => (
        <ImageGroup key={group.title} title={group.title} images={group.images} />
      ))}
    </div>
  );
};

export default ThreeImageGroups;
