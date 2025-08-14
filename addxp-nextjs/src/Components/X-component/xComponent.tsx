"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
var $ = require("jquery");
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import RichText from "../Common";
import ClientOnly from "@/Configurations/ClientOnly";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
const Responsive = {
  0: {
    items: 1,
    margin: 1,
  },
  1024: {
    items: 1,
    margin: 1,
  },
};

function XComponent(data: any) {
  const [selecteditem, setSelectedItem] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [currentItem, setCurrentItem] = useState(0);

  const HandleCurrentClass = (e: any, index: number) => {
    e.preventDefault();
    setSelectedItem(index);
  };
  useEffect(() => {
    const totalSlidesCount = data.data.data.attributes.xcomponent.data.attributes.XcomponentData.length;
    setTotalSlides(totalSlidesCount || 4);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      // Initialize the first Owl Carousel
      const firstCarousel = $("#sync1");

      firstCarousel.on("changed.owl.carousel", (event: any) => {
        // event.item is the new selected item
        setSelectedItem(event.item.index);
      });
    }, 1500);
  }, []);
  useEffect(() => {
    setCurrentItem(selecteditem);
  }, [selecteditem]);

  useEffect(() => {
    setTimeout(() => {
      const addAriaLabelsToButtons = () => {
        const prevButton = document.querySelector("div.slider-main > div#sync1 > div.owl-nav > button.owl-next");
        const nextButton = document.querySelector("div.slider-main > div#sync1 > div.owl-nav > button.owl-prev");
        if (nextButton) {
          nextButton.setAttribute("aria-label", "Next button");
          nextButton.setAttribute("role", "Next button");
        }

        if (prevButton) {
          prevButton.setAttribute("aria-label", "Previous button");
          prevButton.setAttribute("role", "Previous button");
        }
      };
      addAriaLabelsToButtons();
    }, 1600);
  }, []);

  return (
    <Suspense>
      <section className="x-component">
        <div className="container">
          <div className="slider-main">
            <OwlCarousel
              key={currentItem}
              dots={false}
              id="sync2"
              className="owl-theme"
              items={4}
              // responsive={{
              //    0: {
              //       items: 4,
              //    },
              //    1024: {
              //       items: 4,
              //    },
              // }}
              startPosition={selecteditem}
            >
              <div className="item" onClick={(e) => HandleCurrentClass(e, 0)}>
                <div className={`box1 ${currentItem === 0 ? "current" : ""}`}>
                  <small className="text">
                    {data.data.data.attributes.xcomponent.data.attributes.XcomponentData[0].Title}
                  </small>
                  <div className="hover-desc">
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_image_052488c570.png"}
                      alt="line-image"
                      className="image-desc"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_hover_d2e495a895.png"}
                      alt="line-hover"
                      className="image-hover"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_active_88be5fc41e.png"}
                      alt="line-active"
                      className="image-active"
                      loading="lazy"
                    />
                    <div className="line-image">
                      <img
                        src={"https://do7q3d8g8n6kn.cloudfront.net/line1_c49b889a41.svg"}
                        alt="line1"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 1)}>
                <div className={`box2 ${currentItem === 1 ? "current" : ""}`}>
                  <small className="text">
                    {data.data.data.attributes.xcomponent.data.attributes.XcomponentData[1].Title}
                  </small>
                  <div className="hover-desc">
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_image2_e0fad7377b.png"}
                      alt="line-image2"
                      className="image-desc"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_hover2_be68f5f4b6.png"}
                      alt="line-hover2"
                      className="image-hover"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_active2_847813ca4d.png"}
                      alt="line-active2"
                      className="image-active"
                      loading="lazy"
                    />
                    <div className="line-image">
                      <img
                        src={"https://do7q3d8g8n6kn.cloudfront.net/line2_1e67d7d833.svg"}
                        alt="line2"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 2)}>
                <div className={`box3 ${currentItem === 2 ? "current" : ""}`}>
                  <small className="text">
                    {data.data.data.attributes.xcomponent.data.attributes.XcomponentData[2].Title}
                  </small>
                  <div className="hover-desc">
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_image4_387d7be47e.png"}
                      alt="line-image4"
                      className="image-desc"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_hover4_0fd49adcf0.png"}
                      alt="line-hover4"
                      className="image-hover"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_active4_062028b9a9.png"}
                      alt="line-active4"
                      className="image-active"
                      loading="lazy"
                    />
                    <div className="line-image">
                      <img
                        src={"https://do7q3d8g8n6kn.cloudfront.net/line4_4db72834f1.svg"}
                        alt="line4"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="item" onClick={(e) => HandleCurrentClass(e, 3)}>
                <div className={`box4 ${currentItem === 3 ? "current" : ""}`}>
                  <small className="text">
                    {data.data.data.attributes.xcomponent.data.attributes.XcomponentData[3].Title}
                  </small>
                  <div className="hover-desc">
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_image3_e09633ad17.png"}
                      alt="line-image3"
                      className="image-desc"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_hover3_b45d6aa44f.png"}
                      alt="line-hover3"
                      className="image-hover"
                      loading="lazy"
                    />
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/line_active3_2294acda1e.png"}
                      alt="line-active3"
                      className="image-active"
                      loading="lazy"
                    />
                    <div className="line-image">
                      <img
                        src={"https://do7q3d8g8n6kn.cloudfront.net/line3_f178788275.svg"}
                        alt="line3"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </OwlCarousel>
            <h2 className="mobile-title sub_title_5">
              {data.data.data.attributes.xcomponent.data.attributes.MainTitle}
            </h2>

            <OwlCarousel
              //   ref={eRef}
              id="sync1"
              className="owl-theme X__Component"
              // responsive={Responsive}
              nav={true}
              loop={true}
              dots={false}
              items={1}
              navText={[
                '<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>',
                '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>',
              ]}
              startPosition={selecteditem}
            >
              {data.data.data.attributes.xcomponent.data.attributes.XcomponentData.map((item: any) => (
                <div className="item " key={item.id}>
                  <div className="X-title">
                    <h2 className="main-title">{data.data.data.attributes.xcomponent.data.attributes.MainTitle}</h2>
                  </div>
                  <h3 className="large">{item.Title}</h3>
                  <RichText htmlContent={item.Description}></RichText>
                </div>
              ))}
            </OwlCarousel>

            <div className="slider-counter">
              <span className="slider-counter-text">
                {selecteditem + 1}/{totalSlides}
              </span>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default XComponent;
