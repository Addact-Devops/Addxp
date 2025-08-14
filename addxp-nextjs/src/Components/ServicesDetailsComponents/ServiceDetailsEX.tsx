"use client";
import { useEffect } from "react";
import RichText from "@/Components/Common.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);
export default function ServiceDetailsEx(data: any, props: any) {
  const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => {
      const elements = document.getElementsByClassName("cta-component");
      if (elements.length === 0) {
        return;
      }
      for (let i = 0; i < elements.length; i++) {
        const src = elements[i].getAttribute("data-img-src");
        if (src) {
          const elementWithStyle = elements[i] as HTMLElement;
          elementWithStyle.style.backgroundImage = `url(${src})`;
        }
      }
    }, 1000);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      const mediaQuery = window.matchMedia("(max-width: 1100px)");
      if (mediaQuery.matches) {
        var frame_count = 7,
          offset_value = 50;

        gsap.to(".services-detail-experience-slider_img_item", {
          backgroundPosition: -offset_value * frame_count * 5.721428571428571 + "px 50%",
          ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
          // scrollTrigger: {
          trigger: ".scrolling-slider-wrapper",
          start: "top top",
          end: "+=" + frame_count * offset_value,
          pin: ".slider-sticky",
          // scrub: true,
          duration: 5,
          repeat: -1,
          // },
        });
      } else {
        var frame_count = 7,
          offset_value = 100;

        gsap.to(".services-detail-experience-slider_img_item", {
          backgroundPosition: -offset_value * frame_count * 5.621428571428571 + "px 50%",
          ease: "steps(" + frame_count + ")", // use a stepped ease for the sprite sheet
          // scrollTrigger: {
          trigger: ".scrolling-slider-wrapper",
          start: "top top",
          end: "+=" + frame_count * offset_value,
          pin: ".slider-sticky",
          // scrub: true,
          duration: 5,
          repeat: -1,
          // },
        });
      }
    }, 1500);
  }, []);

  return pathname == "/commerce-experience" ? (
    <section className="services-detail-experience scrolling-slider-wrapper">
      <div className="services-detail-experience-slider slider-sticky">
        <div className="services-detail-experience-title container">
          {data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Title == null ? null : (
            <h2 className="sub_title_5">
              {data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Title}
            </h2>
          )}
          {data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Description == null ? null : (
            <RichText
              htmlContent={data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Description}
            ></RichText>
          )}
        </div>

        <div className="services-detail-experience-slider">
          <div className="services-detail-experience-slider_content">
            {data.data.data.attributes.services_detail_experience.data == null ? null : (
              <div className="container">
                {data.data.data.attributes.services_detail_experience.data.attributes.Description.map(
                  (itemdata: any) => (
                    <React.Fragment key={itemdata.id}>
                      {itemdata.Title == null ? null : <div className="type5">{itemdata.Title}</div>}
                      {itemdata.Description == null ? null : <p>{itemdata.Description}</p>}
                    </React.Fragment>
                  )
                )}
              </div>
            )}
          </div>

          <div className="services-detail-experience-slider_img">
            <div className="services-detail-experience-slider_img_item"></div>
            {data.data.data.attributes.services_detail_experience.data.attributes.Images.map((imgdata: any) => (
              <img
                key={imgdata.id}
                src={imgdata.Image.data.attributes.url}
                alt="sun-img"
                className={imgdata.class.replaceAll("_", "-")}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="services-detail-experience">
      <div className="services-detail-experience-title container">
        <h2 className="sub_title_5">
          {data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Title}
        </h2>
        <RichText
          htmlContent={data.data.data.attributes.services_detail_experience.data.attributes.MainTitle.Description}
        ></RichText>
      </div>

      <div className="services-detail-experience-slider">
        <div className="services-detail-experience-slider_content">
          <div className="container">
            {data.data.data.attributes.services_detail_experience.data.attributes.Description.map((itemdata: any) => (
              <React.Fragment key={itemdata.id}>
                <div className="type5">{itemdata.Title}</div>
                <p>{itemdata.Description}</p>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="services-detail-experience-slider_img">
          {data.data.data.attributes.services_detail_experience.data.attributes.Images.map((imgdata: any) =>
            imgdata.Image.data == null ? (
              <img
                key={imgdata.id}
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                // loading='lazy'
              />
            ) : (
              <img
                key={imgdata.id}
                src={imgdata.Image.data.attributes.url}
                alt="sun-img"
                className={imgdata.class.replaceAll("_", "-")}
                // loading='lazy'
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
