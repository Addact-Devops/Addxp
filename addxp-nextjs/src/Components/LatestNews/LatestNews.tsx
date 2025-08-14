"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import moment from "moment";
import Link from "next/link";
import { BLOGS_DETAILS } from "@/Configurations/CommonQuery";
import { useParams, usePathname } from "next/navigation";

export default function LatestNews(data: any) {
  const [sectionClass, setSectionClass] = useState("latest-news service-component-2");
  const pathname = usePathname();
  async function fetchdata() {
    try {
      if (pathname == "/") {
        setSectionClass("latest-news");
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    const adjustImageHeight = () => {
      // Get all the images
      const images = document.querySelectorAll(".latest-box img");
      Promise.all(
        Array.from(images).map(
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
    <>
      <section id="latest-news" className={sectionClass}>
        {data.data.data.attributes.news_heading.data == null ? null : (
          <div className="container">
            <>
              <div className="latest-top">
                {data.data.data.attributes.news_heading.data.attributes.NewsHeading.Title == null ? null : (
                  <h2 className="sub_title_5">
                    {data.data.data.attributes.news_heading.data.attributes.NewsHeading.Title}
                  </h2>
                )}
                {data.data.data.attributes.news_heading.data.attributes.NewsHeading.Description == null ? null : (
                  <RichText
                    htmlContent={data.data.data.attributes.news_heading.data.attributes.NewsHeading.Description}
                  ></RichText>
                )}
              </div>
              {data.data.data.attributes.blogs.data == null ? null : (
                <div className="row">
                  {data.data.data.attributes.blogs.data.map((item: any, i: any) => (
                    <div className="col-md-6" key={i}>
                      <a href={`/blogs-insights/${item.attributes.Blogs.Links.href}`} className="latest-box">
                        <figure>
                          {item.attributes.Blogs.image.data == null ? null : (
                            <img
                              src={item.attributes.Blogs.image.data.attributes.url}
                              alt={item.attributes.Blogs.image.data.attributes.alternativeText}
                              loading="lazy"
                            />
                          )}
                        </figure>
                        <div className="latest-desc">
                          {item.attributes.Blogs.tagLabel == null ? null : (
                            <div className="label">{item.attributes.Blogs.tagLabel}</div>
                          )}
                          {item.attributes.Blogs.Title == null ? null : (
                            <h2 className="large">{item.attributes.Blogs.Title}</h2>
                          )}

                          <ul>
                            {item.attributes.Blogs.Date == null ? null : (
                              <li>{moment(item.attributes.Blogs.Date).format("DD MMMM YYYY")}</li>
                            )}
                            {item.attributes.Blogs.Creator == null ? null : <li>{item.attributes.Blogs.Creator}</li>}
                          </ul>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </>
          </div>
        )}
      </section>
    </>
  );
}
