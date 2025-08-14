"use client";
import React, { useEffect, useState } from "react";
var $ = require("jquery");

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import dynamic from "next/dynamic";
import RichText from "@/Components/Common";
import Link from "next/link";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

function OwlTabSlider(data: any) {
  const [selecteditem, setSelectedItem] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [isCarouselLoading, setIsCarouselLoading] = useState(true);
  async function fetchdata() {
    try {
      setIsCarouselLoading(false);
    } catch (err) {
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleCurrentClass = (e: any, index: number) => {
    setSelectedItem(index);
  };
  useEffect(() => {
    setTimeout(() => {
      const totalSlidesCount = document.querySelectorAll(".owl-theme.owl-button-slide-1 .item").length;
      setTotalSlides(totalSlidesCount);
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const firstCarousel = document.getElementById("sync1");
      if (firstCarousel) {
        const owlInstance = $(firstCarousel).data("owlCarousel");

        if (owlInstance) {
          owlInstance.reinit({
            onChanged: function (event: any) {
              setSelectedItem(event.item.index);
            },
          });
        }
      }
    }, 1500);
  }, []);
  return (
    <>
      {isCarouselLoading === false ? (
        <section className="why-hire-section" style={{ paddingTop: "50px" }}>
          <div className="container">
            <div className="hire-looking-box">
              <div className="hire-looking-top">
                <h2 className="sub_title_5">
                  {data.data.data.attributes.hire_tab_component.data.attributes.TitleData.Title}
                </h2>

                <RichText
                  htmlContent={data.data.data.attributes.hire_tab_component.data.attributes.TitleData.Description}
                ></RichText>
              </div>

              <OwlCarousel
                key={selecteditem}
                dots={false}
                id="sync2"
                className="owl-theme owl-button-slide-1"
                items={1}
                startPosition={selecteditem}
              >
                {data.data.data.attributes.hire_tab_component.data.attributes.TabData.map(
                  (titledata: any, index: any) => (
                    <div className={`item`} onClick={(e) => handleCurrentClass(e, index)} key={titledata.id}>
                      <span className={index === selecteditem ? "tab-owl-button active" : "tab-owl-button"}>
                        {titledata.Title}
                      </span>
                    </div>
                  )
                )}
              </OwlCarousel>

              <div className="hire-looking-desc">
                <OwlCarousel
                  id="sync1"
                  key={selecteditem}
                  className="owl-theme hire-looking-slider"
                  nav={true}
                  loop={false}
                  dots={false}
                  items={1}
                  startPosition={selecteditem}
                  onChanged={(event: any) => {
                    setSelectedItem(event.item.index);
                  }}
                >
                  {data.data.data.attributes.hire_tab_component.data.attributes.TabData.map((item: any) => (
                    <div className="hire-slider key" key={item.id}>
                      <div className="hire-slider-left">
                        <div className="hire-slider-desc">
                          <h2 className="sub_title_5">{item.Title}</h2>

                          <RichText htmlContent={item.Description}></RichText>

                          <a href={`${item.Link.href}`} className="btn-defualt">
                            {item.Link.label}
                          </a>
                        </div>
                      </div>

                      <div className="hire-slider-right">
                        <img
                          src={item.Image.data.attributes.url}
                          loading="lazy"
                          alt={item.Image.data.attributes.alternativeText}
                        />
                      </div>
                    </div>
                  ))}
                </OwlCarousel>

                <div className="slider-counter">
                  {selecteditem + 1}/{totalSlides}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

export default OwlTabSlider;
