"use client";
import Link from "next/link";
import moment from "moment";
import React, { useEffect } from "react";

const DynamicLatestNews = ({ detailsdata }: any) => {
  useEffect(() => {
    const adjustImageHeight = async () => {
      // Get all the images
      const images = document?.querySelectorAll(".latest-box img");
      Promise.all(
        Array.from(images)?.map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) {
                resolve();
              } else {
                (img as HTMLImageElement).onload = () => resolve();
              }
            })
        )
      ).then(() => {
        // Find the minimum height among all images
        const minHeight = Math.min(...Array.from(images).map((img) => (img as HTMLElement).clientHeight));
        // Set the height of each image to the minimum height
        images.forEach((img) => {
          (img as HTMLElement).style.height = `${minHeight}px`;
        });
      });
    };

    // Run the function when the component mounts
    adjustImageHeight();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup (if needed)
    };
  }, []);

  return (
    <div>
      {detailsdata?.data?.map((item: any) =>
        item.attributes.Similar_blog.data.map((checkdata: any, index: any) =>
          checkdata.attributes.Blogs == null ? (
            "Good bye forever"
          ) : index <= 0 ? (
            <React.Fragment key={checkdata.id}>
              <section className="latest-news service-component-2" key={checkdata.id}>
                <div className="container">
                  <div className="latest-top">
                    <h2 className="sub_title_5">Similar stories </h2>
                    <p>
                      Explore more similar subjects, ideas, blogs
                      <br /> and relevant reads.
                    </p>
                  </div>
                  <div className="row">
                    {item.attributes.Similar_blog.data.map((similar: any) => (
                      <div className="col-md-6" key={similar.id}>
                        <div className="latest-box">
                          <a href={similar.attributes.Blogs.Links.href}>
                            <figure>
                              <img
                                src={similar.attributes.Blogs.image.data.attributes.url}
                                alt={similar.attributes.Blogs.image.data.attributes.alternativeText}
                                loading="lazy"
                              />
                            </figure>
                            <div className="latest-desc">
                              <div className="label">{similar.attributes.Blogs.tagLabel}</div>
                              <h2 className="large">{similar.attributes.Blogs.Title}</h2>
                              <ul>
                                {similar.attributes.Blogs.Date == null ? null : (
                                  <li>{moment(similar.attributes.Blogs.Date).format("DD MMMM YYYY")}</li>
                                )}
                                <li>{similar.attributes.Blogs.Creator}</li>
                              </ul>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </React.Fragment>
          ) : (
            ""
          )
        )
      )}
    </div>
  );
};

export default DynamicLatestNews;
