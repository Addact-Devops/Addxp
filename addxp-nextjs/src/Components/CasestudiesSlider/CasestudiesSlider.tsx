"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

export default function CasestudiesSlider({ data }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const setEqualHeight = () => {
      const items = document.querySelectorAll(".case-study-item");
      let maxHeight = 0;

      items.forEach((item) => {
        (item as HTMLElement).style.height = "auto";
      });

      items.forEach((item) => {
        const height = (item as HTMLElement).offsetHeight;
        if (height > maxHeight) maxHeight = height;
      });

      items.forEach((item) => {
        (item as HTMLElement).style.height = `${maxHeight}px`;
      });
    };

    const timeout = setTimeout(() => {
      setEqualHeight();
    }, 500);

    window.addEventListener("resize", setEqualHeight);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", setEqualHeight);
    };
  }, [mounted]);

  if (!mounted) return null;

  const sliderContent = data?.data?.casestudiesSliders?.data?.[0]?.attributes;
  const caseStudyListing = sliderContent?.casestudie_listing?.data;

  const owlOptions = {
    loop: true,
    margin: 30,
    nav: true,
    dots: true,
    items: 1,
    navText: ["", ""],
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1024: { items: 1 },
    },
  };

  return (
    <section className="casestudy-slider-component">
      <div className="container">
        {sliderContent.ComponentTitle && <span className="tag-line">{sliderContent.Componentsubline}</span>}
        {sliderContent.Componentsubline && <h2 className="sub_title_5">{sliderContent.ComponentTitle}</h2>}

        {caseStudyListing?.attributes?.case_studies_details?.data?.length > 0 ? (
          <OwlCarousel className="owl-theme case-studies-carousel" {...owlOptions}>
            {caseStudyListing.attributes.case_studies_details.data.map((caseStudy: any) => {
              const { PageTitle, HeadDescription, AboutDescription, casedetail } = caseStudy.attributes;
              const detail = casedetail;
              const imageUrl = detail?.image?.data?.attributes?.url;
              const imageAlt = detail?.image?.data?.attributes?.alternativeText || "Case Study Image";
              const linkHref = detail?.Links?.href;
              const linkLabel = detail?.Links?.label;

              return (
                <div key={caseStudy.id} className="case-study-item">
                  <div className="case-study-card">
                    <div className="case-content">
                      {PageTitle && <h6 className="page-title">{PageTitle}</h6>}
                      {HeadDescription && (
                        <p className="head-description" dangerouslySetInnerHTML={{ __html: HeadDescription }} />
                      )}
                      {AboutDescription && (
                        <p className="about-description" dangerouslySetInnerHTML={{ __html: AboutDescription }} />
                      )}

                      {linkHref && linkLabel && (
                        <a
                          href={`/case-studies/${linkHref.startsWith("/") ? linkHref.slice(1) : linkHref}`}
                          className="btn-defualt"
                        >
                          {linkLabel}
                        </a>
                      )}
                    </div>
                    {imageUrl && (
                      <div className="case-image-wrap">
                        <img src={imageUrl} alt={imageAlt} className="case-image" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </OwlCarousel>
        ) : (
          <p>No case studies available</p>
        )}
      </div>
    </section>
  );
}
