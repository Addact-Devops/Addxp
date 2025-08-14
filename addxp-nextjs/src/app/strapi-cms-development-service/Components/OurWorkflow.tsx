"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RichText from "@/Components/Common";

gsap.registerPlugin(ScrollTrigger);

function OurWorkflow(data: any) {
  useEffect(() => {
    let t = document.querySelector(".new_timeline.horizontal-slider-main");
    function e(t: any) {
      t?.addEventListener("wheel", (e: any) => {
        let o = e.deltaY;
        0 === t.scrollLeft && o < 0
          ? window.scrollBy({ top: -window.innerHeight })
          : t.scrollLeft === t.scrollWidth - t.clientWidth && o > 0
          ? window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
          : ((t.scrollLeft += o), e.preventDefault());
      });
    }
    window.addEventListener("load", function () {
      e(t);
    }),
      e(t);
  }, []);

  const sectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const handleIntersection = (entries: any) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.8, // Adjust this threshold as needed
    });
    // Observe the section element
    if (section) {
      observer.observe(section);
    }
    // Cleanup by disconnecting the observer when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section className={`horizontal-strapi-cms development-process-component position-relative`}>
      <div className={`sticky-section ${isSticky ? "is-sticky" : ""}`} ref={sectionRef}>
        <div className="container">
          <span className="tag-line">
            <RichText htmlContent={data.data.data.attributes.work_flow.data.attributes.Main.Description}></RichText>
          </span>
          <h2 className="sub_title_5">{data.data.data.attributes.work_flow.data.attributes.Main.Title}</h2>
          <div className="development-box">
            <ul>
              {data.data.data.attributes.work_flow.data.attributes.Workflowdata.map((item: any) => (
                <li key={item.id}>
                  <p className="regular">{item.Title}</p>
                  <p>{item.LongTitle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="new_timeline horizontal-slider-main">
          <div className="container testContainer">
            <ol>
              {data.data.data.attributes.work_flow.data.attributes.Workflowdata.map((item: any) => (
                <li key={item.id}>
                  <div className="box-desc">
                    <h3>{item.Title}</h3>
                    <p>{item.LongTitle}</p>
                  </div>
                </li>
              ))}
              <li></li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurWorkflow;
