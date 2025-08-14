"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import RichText from "../Common";
interface SlideProps {
  content: string; // Replace 'string' with the actual type of the 'content' prop
}
interface SliderDataType {
  content: string;
  // other properties if available
}
const Slide: React.FC<SlideProps> = ({ content }) => <div className="slide">{content}</div>;
function SliderComponent(data: any) {
  const [sliderData, setSliderData] = useState<SliderDataType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const contentArray = data.data.data.attributes.home_slider.data?.attributes.Details.map((item: any) => {
      return {
        content: (
          <div className="slider-main">
            <div className="slider-left">
              <h4 className="xl">{item.Title}</h4>
              <RichText htmlContent={item.Description}></RichText>
            </div>
            <div className="slider-right">
              <div className="slider-desc">
                {item.Images.data == null ? (
                  <img
                    src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                    alt="Addxp_Place_holder_4333d94906.png"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={item.Images.data.attributes.url}
                    loading="lazy"
                    alt={item.Images.data.attributes.alternativeText}
                  />
                )}
              </div>
            </div>
          </div>
        ),
      };
    });
    setSliderData(contentArray);
  }, []);

  var settings = {
    dots: !1,
    arrows: !0,
    autoplay: !1,
    autoplaySpeed: 3e3,
    fade: !0,
    infinite: true, // !0
    fadeSpeed: 1e3,
    beforeChange: (current: any, next: React.SetStateAction<number>) => {
      setCurrentSlide(next);
    },
  };
  return (
    <div id="slider-component" className="slider-component">
      <div className="container">
        <div className="left-section">
          <h2 className="sub_title_5">{data.data.data.attributes.home_slider.data.attributes.MainTitle.Title}</h2>
          <RichText
            htmlContent={data.data.data.attributes.home_slider.data.attributes.MainTitle.Description}
          ></RichText>
        </div>
        {sliderData ? (
          <>
            <Slider className="slider" {...settings}>
              {sliderData?.map((slide: any, index: any) => (
                <Slide key={`slide-${index}`} content={slide.content} />
              ))}
            </Slider>
            <div className="slide-count">
              {currentSlide + 1}/{sliderData?.length}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SliderComponent;
