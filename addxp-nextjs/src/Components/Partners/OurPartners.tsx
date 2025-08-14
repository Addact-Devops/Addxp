"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

// Dynamically import OwlCarousel to avoid SSR issues
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const carouselOptions = {
  loop: false,
  margin: 14,
  autoplay: true,
  autoplayTimeout: 3000,
  smartSpeed: 800,
  dots: false,
  nav: false,
  responsive: {
    0: {
      items: 2,
      margin: 8,
      loop: true,
    },
    767: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

function OurPartners({ data }: any) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateWidth = () => setWindowWidth(window.innerWidth);
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  if (!data || !data.data || data.data.length === 0) {
    return <p>No partners found</p>;
  }

  return (
    <section className="our-partners">
      <div className="container">
        {data.data.map((partner: any) => {
          const logos = partner.attributes.logos?.data || [];

          // Determine when to show the slider
          const isDesktop = windowWidth >= 768;
          const shouldUseSlider = (isDesktop && logos.length >= 4) || (!isDesktop && logos.length >= 2);

          return (
            <div key={partner.id}>
              <h2 className="sub_title_5">{partner.attributes.title}</h2>

              {shouldUseSlider ? (
                <OwlCarousel className="partners-logo-wrapper owl-theme" {...carouselOptions}>
                  {logos.map((logo: any) => (
                    <div className="partner-logo" key={logo.id}>
                      <img
                        src={logo.attributes.url}
                        alt={logo.attributes.alternativeText || "Partner Logo"}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </OwlCarousel>
              ) : (
                <div className="partners-logo-wrapper">
                  {logos.map((logo: any) => (
                    <div className="partner-logo" key={logo.id}>
                      <img
                        src={logo.attributes.url}
                        alt={logo.attributes.alternativeText || "Partner Logo"}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OurPartners;
