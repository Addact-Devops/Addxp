"use client";

import React, { useState, useEffect, useRef } from "react";

function NavigateComponent() {
  const [allImagesShown, setAllImagesShown] = useState(false);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imagesContainer = imagesRef.current;
    if (!imagesContainer) return;
    const images = imagesContainer.querySelectorAll(".fadeout-images img") as NodeListOf<HTMLElement>;
    let currentIndex = 0;
    let intervalId: NodeJS.Timeout;

    const fadeInOutImage = () => {
      images.forEach((img, index) => {
        if (index === currentIndex) {
          img.style.opacity = "1"; // Show the current image
        } else {
          img.style.opacity = "0"; // Hide other images
        }
      });

      currentIndex = (currentIndex + 1) % images.length;

      if (currentIndex === 0) {
        // All images have been shown once
        setAllImagesShown(true);
      }

      if (allImagesShown) {
        // Reset opacity of all images
        images.forEach((img) => {
          img.style.opacity = "0";
        });
        clearInterval(intervalId); // Stop cycling images
      }
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the target is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start cycling images when section is in viewport
          intervalId = setInterval(fadeInOutImage, 1000);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(imagesContainer);

    return () => {
      clearInterval(intervalId);
    };
  }, [allImagesShown]);

  return (
    <section className="navigate-component" ref={imagesRef}>
      <div className="">
        <h2 className="sub_title_5">Navigate our website</h2>

        <div className="navigate-main">
          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="contentful-cms-services" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/contentful-text.svg"
                alt="contentful-text"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="strapi-cms-services" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/strapi-text.svg"
                alt="strapi-text"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="umbraco-development-service" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/umbraco.svg"
                alt="umbraco"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="sitecore-xm-cloud-service" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/xm-cloud-text.png"
                alt="xm-cloud-text.png"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="virto-commerce-services" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/virto-commerce-text.svg"
                alt="virto-commerce-text"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="contentstack-cms-services" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/contentstack-text.svg"
                alt="contentstack-text"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="kentico-development-service" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/kentico.svg"
                alt="kentico"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>

          <div className="navigate-items">
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <a href="kontent-ai-development-service" className="fadeout-images">
              <img
                src="https://d1ousucuxrlllk.cloudfront.net/src/images/kontent-ai-logo-vector-white.svg"
                alt="kontent-ai-logo-vector-white"
                className="circle"
                style={{ opacity: "0" }}
              />
            </a>
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
            <img src="https://d1ousucuxrlllk.cloudfront.net/src/images/logo.svg" alt="logo" className="circle" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavigateComponent;
