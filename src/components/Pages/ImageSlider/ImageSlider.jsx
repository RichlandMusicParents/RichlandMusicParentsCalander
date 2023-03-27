import React from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ImageSlider() {

  
  //Placeholder images
  const images = [
    {
      id: 1,
      link: "https://images.pexels.com/photos/14537736/pexels-photo-14537736.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      link: "https://images.pexels.com/photos/9289484/pexels-photo-9289484.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },

    {
      id: 3,
      link: "https://images.pexels.com/photos/15539376/pexels-photo-15539376.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (

  
    <div>
          <Slider {...settings}>
          {images.map((image) => (
        <div className="card">
          <div className="card-top">
            <img src={image.link}/> 
          </div>
        </div>
      ))}
        </Slider>
   
    </div>
  );
}

export default ImageSlider;
