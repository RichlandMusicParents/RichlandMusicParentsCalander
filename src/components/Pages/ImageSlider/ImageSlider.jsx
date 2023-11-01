import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

function ImageSlider() {



  const images = [
    

    {
      id: 1,
      link: "https://i.ibb.co/YbZBpJH/Richland-1.jpg",
    },

    {
        id: 2,
        link: "https://i.ibb.co/8776g7X/Richland-2.jpg",
      },
    {
      id: 3,
      link: "https://i.ibb.co/XtP8W8R/Richland-3.jpg",
    },

    {
      id: 4,
      link: "https://i.ibb.co/GVPMTRH/Richland-4.jpg",
    },

    {
        id: 5,
        link: "https://i.ibb.co/4SDZBMG/Richland-5.jpg",
      },
      {
        id: 6,
        link: "https://i.ibb.co/6vtskX8/Richland-6.jpg",
      },
      
  ];
// settings for image slider
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="slider-container">
      
      <Slider {...settings}>
  {images.map((image, index) => (
    <div key={index} className="card">
      <div className="card-top">
        <img src={image.link} alt={`Image ${index}`} />
      </div>
    </div>
  ))}
</Slider>
   
    </div>
  );
}

export default ImageSlider;
