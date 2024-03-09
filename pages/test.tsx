import React from "react";

const cards = [
  {
    id: 1,
    title: 'Card Title 1',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'This is a description for Card 1. It can vary in length.',
  },
  {
    id: 2,
    title: 'Card Title 2',
    imageUrl: 'https://via.placeholder.com/400x100',
    description: 'This is a description for Card 2. It can vary in length, sometimes being longer or shorter.',
  },
  {
    id: 3,
    title: 'Card Title 3',
    imageUrl: 'https://via.placeholder.com/200x900',
    description: 'This is a description for Card 3.',
  },
  {
    id: 4,
    title: 'Card Title 4',
    imageUrl: 'https://via.placeholder.com/700',
    description: 'This is a description for Card 4. Descriptions can have different lengths.',
  },
  {
    id: 5,
    title: 'Card Title 5',
    imageUrl: 'https://via.placeholder.com/150',
    description: 'This is a description for Card 5. The amount of text can change.',
  },
];

export default function CardLayout() {
  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      {cards.map((card) => (
        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img className="h-[100px] object-contain rounded-t-lg md:rounded-none md:rounded-l-lg" src={card.imageUrl} alt=""/>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{card.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
