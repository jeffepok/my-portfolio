"use client"

import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slide from "./slide";
import { projects } from "@/app/lib/placeholder-data";
import useMediaQuery from "./useMediaQuery";


const MultiItemCarousel: React.FC = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');
  const divStyle = {
    maxHeight: "500px"
  }
  return (
    <div className="py-8 w-full h-full" style={divStyle}>
      <Carousel
        showArrows
        infiniteLoop
        centerMode
        centerSlidePercentage={isLargeScreen ? 33.33 : 100}
        showThumbs={false}
        showStatus={false}
      >
        {projects.map((p, index) => (
          <Slide project={p} key={`project_` + index}/>
        ))}
      </Carousel>
    </div>
  );
};

export default MultiItemCarousel;
