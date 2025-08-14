"use client";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";
import moment from "moment";
import { useSelector } from "react-redux";
import { Display } from "react-bootstrap-icons";

function TabMenu(data: any) {
  const searchedKeyword = useSelector((state: any) => state.searchKeyword);
  const keyword = Object.values(searchedKeyword);

  useEffect(() => {
    setTimeout(() => {
      const adjustImageHeight = () => {
        const images = document.querySelectorAll(".latest-box img");
        Array.from(images).map(
          (img) =>
            new Promise<void>((resolve) => {
              if ((img as HTMLImageElement).complete) {
                resolve();
              } else {
                (img as HTMLImageElement).onload = () => resolve();
              }
            })
        );
        const validImages = Array.from(images).filter((img) => (img as HTMLElement).clientHeight > 0);
        const minHeight = Math.min(...validImages.map((img) => (img as HTMLElement).clientHeight));
        images.forEach((img) => {
          (img as HTMLElement).style.height = `${minHeight}px`;
        });
      };

      adjustImageHeight();
      return () => {};
    }, 200);
  }, []);

  return (
    <div className="banner-tab">
      <div className="container">
        <Tabs defaultActiveKey="All Blogs" id="uncontrolled-tab-example" className="">
          {data.data.data.map((item: any) => (
            <Tab
              eventKey={item.attributes.EventTitle.replaceAll("_", " ")}
              title={item.attributes.EventTitle.replaceAll("_", " ")}
              className=""
              key={item.id}
            >
              <section className="latest-news blog-listing-content">
                <div className="row">
                  {item.attributes.blogs.data
                    .filter((searchedBlog: any) =>
                      String(searchedBlog.attributes.Blogs.Title).toLowerCase().includes(String(keyword).toLowerCase())
                    )
                    .reverse() // Reverses the order so the latest blog appears first
                    .map((childblogs: any) => (
                      <div className="col-md-4 blog-title-all-blogs blog-title-content-experience" key={childblogs.id}>
                        <a href={`/blogs-insights/${childblogs.attributes.Blogs.Links.href}`} className="latest-box">
                          <figure>
                            <img
                              src={childblogs.attributes.Blogs.image.data.attributes.url}
                              loading="lazy"
                              alt={childblogs.attributes.Blogs.image.data.attributes.alternativeText}
                            />
                          </figure>
                          <div className="latest-desc">
                            <div className="label">{childblogs.attributes.Blogs.tagLabel}</div>
                            <h2 className="large">{childblogs.attributes.Blogs.Title}</h2>
                            <ul>
                              {childblogs.attributes.Blogs.Date === null ? null : (
                                <li>{moment(childblogs.attributes.Blogs.Date).format("DD MMMM YYYY")}</li>
                              )}
                              <li>{childblogs.attributes.Blogs.Creator}</li>
                            </ul>
                          </div>
                        </a>
                      </div>
                    ))}
                  {item.attributes.blogs.data.filter((searchedBlog: any) =>
                    String(searchedBlog.attributes.Blogs.Title).toLowerCase().includes(String(keyword).toLowerCase())
                  ).length === 0 && <p className="noresult-found">No Result Found</p>}
                </div>
              </section>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

export default TabMenu;
