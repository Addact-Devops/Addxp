"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import CTA from "@/Components/CTA/CTA";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import RichText from "@/Components/Common.jsx";
import BannerNav from "../Banner/BannerNav";
import LoaderScreen from "../LoaderScreen/LoaderScreeen";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default function HomeCarosual(data: any) {
  useEffect(() => {
    setTimeout(() => {
      /* Main navigation */
      let panelsContainer: any;

      let panelsSection = document.querySelector("#panels");
      //panelsContainer = document.querySelector("#panels-container"),
      panelsContainer = document.querySelector("#panels-container");
      let tween;

      /* Panels */
      const panels = gsap.utils.toArray("#panels-container .panel");
      tween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: "#panels-container",
          toggleClass: { targets: ".tab-menu", className: "active" },
          pin: true,
          start: "top top",
          scrub: 1,

          end: () => "+=" + (panelsContainer.offsetWidth - innerWidth),
        },
      });
    }, 20);
  }, []);
  useEffect(() => {
    // setTimeout(() => {
    const elements = document.getElementsByClassName("banner-js");
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
    // }, 1000);
  }, []);

  return (
    <>
      <section id="panels" className="slidePanles_Container">
        <div id="panels-container" style={{ width: "400%" }}>
          {data.data.data.attributes.carousel.data.attributes.Carousel.map((item: any) => (
            <article id={item.ArticleId.replaceAll("_", "-")} className="panel full-screen" key={item.id}>
              <div className="horizontal-scroll-section">
                <div className="scene">
                  <div className="horizontal-scroll-section__content-wrapper wrapper">
                    <div
                      className="horizontal-scroll-section__content-section banner-js"
                      data-img-src={item.DesktopImg.data.attributes.url}
                    >
                      <div className="container">
                        <div className="banner-main">
                          <div className="banner-left">
                            <RichText htmlContent={item.Description}></RichText>

                            <RichText htmlContent={item.Body}></RichText>

                            {item.Links[0].href == null ? (
                              ""
                            ) : (
                              <a href={item.Links[0].href} className="btn-defualt">
                                {item.Links[0].label}
                              </a>
                            )}
                          </div>

                          <div className="banner-right mobile-banner-right">
                            <img src={item.MobileImg.data[0].attributes.url} alt="banner-mobile1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <BannerNav data={data.datavalue} />
      </section>

      {/* <LoaderScreen /> */}
    </>
  );
}
