import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageSlider.css";

function ImageSlider() {
  const images = [
    

    {
      id: 2,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.18169-9/10410321_411408079050939_6953850270018742336_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=v5iBFLksO1oAX8bCr_x&_nc_ht=scontent.ffar1-2.fna&oh=00_AfAp9ZhEMjHIVUPVDCjiXumi4va59-7J9U4PG366RygkvA&oe=644977F9",
    },
    {
      id: 3,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t31.18172-8/12244544_438044049720675_1574830315280276843_o.jpg?_nc_cat=103&ccb=1-7&_nc_sid=19026a&_nc_ohc=aBNvSrN6tJMAX-GYaBV&_nc_ht=scontent.ffar1-2.fna&oh=00_AfAQ3fyUupBkYZLPKEd5GcWzdg7SdkNeQjfPA_7fdB0JTA&oe=64498D6C",
    },

    {
      id: 4,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.18169-9/13239106_495772860614460_6925249605431943843_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=19026a&_nc_ohc=XMzifOfZXw0AX_oDP2b&_nc_oc=AQnwJh7vHpNqFw7VDsvcbH3Y5ip-30Ct-jfU8xW-qYZk41W5NBmp11o2wfOtbGEwClo&_nc_ht=scontent.ffar1-2.fna&oh=00_AfBDG2NJuV8F_ddhbGuGAXTjY7cQ2lrZ0Ip8Bctv5C3gzQ&oe=644961AB",
    },

    {
      id: 5,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.18169-9/11866285_411408712384209_7068445859351751267_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=19026a&_nc_ohc=OexgCkWIt9IAX905gH6&_nc_ht=scontent.ffar1-2.fna&oh=00_AfA76lKLknEY9j8Q8Tghmy6PnNe5uIjEQW9tnHFRHILNzA&oe=64497BE1",
    },
    {
      id: 6,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.6435-9/172603698_1605481239643611_2890477229504739342_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=wnl_jaBq9WcAX-Lprl0&_nc_ht=scontent.ffar1-2.fna&oh=00_AfDsPAwey937Nmc3sNugLvAJCNM10HGomY-c_D_3OXGhUA&oe=6449948A",
    },
    {
      id: 7,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.6435-9/83021773_1238331149691957_3682691932401696768_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=e3f864&_nc_ohc=AWKguT-S7hEAX_6HQty&_nc_ht=scontent.ffar1-2.fna&oh=00_AfB1hiqkY4SrWIkn92mF9S0OO3llQNBVHVPuBeutOsRocw&oe=6449940F",
    },
    {
      id: 8,
      link: "https://scontent.ffar1-2.fna.fbcdn.net/v/t1.6435-9/59692080_1020147124843695_3865048508553756672_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=QhxAcPZDaZ8AX9CJhJT&_nc_ht=scontent.ffar1-2.fna&oh=00_AfAavx8UyYdB2Ytw-fEm9j1s7T4Qng0ZH0_i_vt4mkVIOg&oe=64498FB2",
    },
  ];

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
        {images.map((image) => (
          <div className="card" key={image.id}>
            <div className="card-top">
              <img src={image.link} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
