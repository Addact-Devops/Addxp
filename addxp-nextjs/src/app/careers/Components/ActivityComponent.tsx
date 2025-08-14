"use client";
import { useState } from "react";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/css/lg-thumbnail.css";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Tab from "react-bootstrap/esm/Tab";
import Tabs from "react-bootstrap/esm/Tabs";
import { TailSpin } from "react-loader-spinner"; // Importing the loader spinner

export default function ActivityComponent({ data }: any) {
  const [visibleImages, setVisibleImages] = useState(12); // Initially display 12 images
  const [loading, setLoading] = useState(false); // Loading state for loader

  const onBeforeSlide = (detail: { index: any; prevIndex: any }) => {
    const { index, prevIndex } = detail;
  };

  // Check if there is gallery data
  if (!data?.data?.attributes?.gallrays?.data?.length) {
    return <p>No gallery data available</p>;
  }

  const galleryData = data.data.attributes.gallrays.data[0].attributes;

  const loadMoreImages = () => {
    setLoading(true); // Set loading state

    setTimeout(() => {
      setVisibleImages((prevCount) => prevCount + 12); // Load more images
      setLoading(false); // Stop loading after loading images
    }, 1000); // Simulate a delay (adjust according to your data fetching speed)
  };

  return (
    <section className="activity-component" id="activity-component">
      <div className="container">
        <span className="tag-line">{galleryData.MainTitle?.Title}</span>
        <h2 className="sub_title_5">{galleryData.MainTitle?.SubTitle}</h2>

        <div className="activty-main">
          <div className="tabbing-main">
            <Tabs
              defaultActiveKey={galleryData.LeftSection?.[0]?.Title || "Section"}
              id="uncontrolled-tab-example"
              className="nav nav-tabs"
            >
              {galleryData.LeftSection?.map((section: any, sectionIndex: number) => (
                <Tab eventKey={section.Title} title={section.Title} key={sectionIndex} className="nav-link">
                  <div className="accordion-body">
                    <div className="section-description">
                      <div dangerouslySetInnerHTML={{ __html: section.Description }}></div>
                    </div>

                    {galleryData.LeftImages?.[sectionIndex]?.Images?.data?.length > 0 && (
                      <div className="lightgallery">
                        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]} onBeforeSlide={onBeforeSlide}>
                          {galleryData.LeftImages[sectionIndex].Images.data
                            .slice(0, visibleImages) // Limit images displayed based on visible count
                            .map((image: any) => (
                              <a href={image.attributes.url} key={image.id}>
                                <img
                                  src={image.attributes.url}
                                  alt={image.attributes.alternativeText || "Gallery Image"}
                                  className="img-fluid"
                                />
                              </a>
                            ))}
                        </LightGallery>
                      </div>
                    )}

                    <div className="gallery-buttons">
                      {loading ? (
                        <div className="gallery-loadmore btn-default">
                          <TailSpin
                            height="24"
                            width="24"
                            color="white" // Matching color with button text
                            ariaLabel="loading"
                          />
                        </div>
                      ) : (
                        galleryData.LeftImages[sectionIndex]?.Images?.data?.length > visibleImages && (
                          <button className="gallery-loadmore btn-default" onClick={loadMoreImages}>
                            Load More
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
