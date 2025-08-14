"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RichText from "../Common";

gsap.registerPlugin(ScrollTrigger);

function SliderVertical(data: any) {
  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.defaults({ markers: false });
      const t = gsap.utils.toArray(".point") as HTMLElement[];
      const pointheight = t ? t[0].offsetHeight : 0;
      const e = gsap.utils.toArray(".indicator");
      const o = 100 * t.length;
      gsap.set(".indicators", { display: "flex" });

      const i = gsap.timeline({
        duration: 100 * t.length,
        scrollTrigger: {
          trigger: ".philosophie",
          start: "top center",
          end: "+=" + pointheight * t.length,
          scrub: !0,
          id: "points",
          markers: false,
        },
      });

      gsap.timeline({
        duration: 100 * t.length,

        scrollTrigger: {
          trigger: ".philosophie .philosophie-slider",
          start: "top top",
          end: "+=" + pointheight * t.length,
          scrub: !0,
          pin: ".philosophie .philosophie-slider",
          pinSpacing: !0,
          id: "pinning",
          markers: false,
          toggleClass: "philosophie-slider_content",
        },
      });

      t.forEach(function (o: any, a: any) {
        gsap.set(o, { position: "absolute", top: 0 });
        e.forEach((element: any, index: any) => {
          i.to(element, { borderColor: "#E97777" }, index);
        });
        // i.to(e[a], { borderColor: "#E97777" }, a);
        i.from(o.querySelector(".slider-right"), { autoAlpha: 0 }, a);
        i.from(
          o.querySelector(".slider-left"),
          {
            color: "#313131",
            autoAlpha: 0,
            translateY: 200,
          },
          a
        );
        i.addLabel("position-" + a);
        if (a !== t.length - 1) {
          e.forEach((Element: any, index: any) => {
            i.to(Element, { borderColor: "#fff" }, index + 0.75);
          });
          // i.to(e[a], { borderColor: "#fff" }, a + 0.75);
          i.to(o.querySelector(".slider-left"), { autoAlpha: 0, translateY: -350 }, a + 0.75);
          i.to(o.querySelector(".slider-right"), { autoAlpha: 0 }, a + 0.75);
        }
      });

      const slideNumber = Object.keys(i.labels).length;

      for (let j = 0; j < slideNumber; j++) {
        i.labels[`position-${j}`] = j + 0.75;
      }

      e.forEach(function (t: any, e: any) {
        t.addEventListener("click", function (event: any) {
          try {
            const label = `position-${e}`;
            const scrollPosition = i.scrollTrigger?.labelToScroll(label);
            if (scrollPosition) {
              window.scrollTo({
                top: scrollPosition,
                behavior: "smooth",
              });
            }
          } catch (err) {
            console.log({ err });
          }
        });
      });
    }, 4000);
  }, []);

  useEffect(() => {
    const numberToWords = (num: number) => {
      const words = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
      return words[num] || num.toString(); // Fallback for numbers beyond defined words
    };

    const updatePointClass = () => {
      const points = document.querySelectorAll(".point").length;
      const sliderVerticle = document.querySelector(".slider-verticle");

      if (sliderVerticle) {
        // Remove any existing "-point" class
        sliderVerticle.classList.forEach((className) => {
          if (className.endsWith("-point")) {
            sliderVerticle.classList.remove(className);
          }
        });

        // Add the new class with a prefix (fixes the issue)
        sliderVerticle.classList.add(`point-${numberToWords(points)}`);
      }
    };

    // Observe changes in the DOM for dynamic updates
    const observer = new MutationObserver(updatePointClass);
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial call
    updatePointClass();

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const indicatorsarry = document.getElementsByClassName("indicator");
      const indicators = Array.from(indicatorsarry);
      indicators?.forEach((indicator: any, t: any) => {
        const prevIndicator = indicators[t - 1];
        const nextIndicator = indicators[t + 1];

        if (indicator.style.borderColor === "rgb(233, 119, 119)") {
          if (t > 0) prevIndicator.classList.remove("scrolled");
          if (t < indicators.length) nextIndicator?.classList.remove("scrolled");

          t = indicators.length;
          indicators[0].classList.remove("scrolled");
          indicator.classList.add("scrolled");

          if (indicators.length === 4 && t < 4) nextIndicator?.classList.remove("scrolled");
        }
      });
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section className="slider-verticle" id="slider-verticle">
      <div className="container">
        <section className="philosophie">
          <div className="philosophie-slider">
            <div className="slider-top-desc">
              <h2 className="sub_title_5">
                {data.data.data.attributes.verticle_slider.data.attributes.MainTitle.Title}
              </h2>
              <RichText
                htmlContent={data.data.data.attributes.verticle_slider.data.attributes.MainTitle.Description}
              ></RichText>
            </div>

            <div className="slider-top-desc-mobile">
              <h2 className="sub_title_5">
                {data.data.data.attributes.verticle_slider.data.attributes.MainTitle.Title}
              </h2>
              <RichText
                htmlContent={data.data.data.attributes.verticle_slider.data.attributes.MainTitle.Description}
              ></RichText>
            </div>
            <div className="wrapper">
              <div className="indicators">
                {data.data.data.attributes.verticle_slider.data.attributes.VerticalSlider.map((item: any) => (
                  <div className="indicator" key={item.id}>
                    {item.TabTitle}
                  </div>
                ))}
              </div>
              {data.data.data.attributes.verticle_slider.data.attributes.VerticalSlider.map((subitem: any) => (
                <div className="point" key={subitem.id}>
                  <div className="slider-main">
                    <div className="slider-left">
                      <div className="slider-v-desc">
                        <RichText htmlContent={subitem.Title}></RichText>
                        <RichText htmlContent={subitem.Description}></RichText>
                      </div>
                    </div>
                    <div className="slider-right">
                      {subitem.Images.data == null ? (
                        <img
                          src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                          alt="Addxp_Place_holder_4333d94906.png"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={subitem.Images.data.attributes.url}
                          alt={subitem.Images.data.attributes.alternativeText}
                          loading="lazy"
                        />
                      )}

                      {subitem.SubTitle == null || subitem.SubDescription == null ? (
                        ""
                      ) : (
                        <div className="figcaption">
                          <h3 className="large">{subitem.SubTitle}</h3>
                          <RichText htmlContent={subitem.SubDescription}></RichText>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SliderVertical;
