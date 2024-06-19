"use client"

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from './slide';
import { projects } from '@/app/lib/placeholder-data';


const MultiItemCarousel: React.FC = () => {
  return (
    <div className="w-full mx-auto py-8">
      <Carousel
        showArrows
        infiniteLoop
        centerMode
        centerSlidePercentage={34.33}
        showThumbs={false}
        showStatus={false}
      >
        {projects.map((p, index) => (
          <Slide project={p} key={index}/>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiItemCarousel;
