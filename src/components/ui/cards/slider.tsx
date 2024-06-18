"use client"

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from './slide';

// Sample data for cards
const cards = [
  {
    title: 'Card 1',
    description: 'This is the first card',
    image: '/path/to/image1.jpg'
  },
  {
    title: 'Card 2',
    description: 'This is the second card',
    image: '/path/to/image2.jpg'
  },
  {
    title: 'Card 3',
    description: 'This is the third card',
    image: '/path/to/image3.jpg'
  },
  {
    title: 'Card 4',
    description: 'This is the fourth card',
    image: '/path/to/image4.jpg'
  },
  {
    title: 'Card 5',
    description: 'This is the fifth card',
    image: '/path/to/image5.jpg'
  }
];

const MultiItemCarousel: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <Carousel
        showArrows
        infiniteLoop
        centerMode
        centerSlidePercentage={34.33}
        showThumbs={false}
        showStatus={false}
      >
        {cards.map((card, index) => (
          <Slide/>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiItemCarousel;
