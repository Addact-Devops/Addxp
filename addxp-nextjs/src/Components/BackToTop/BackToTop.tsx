"use client";
import React, { useEffect } from "react";

function BackToTop() {
  useEffect(() => {
    document.body.classList.add("blog-detail-body");
    const handleScroll = () => {
      const backToTopButton = document.getElementById("backtotop");
      if (!backToTopButton) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    };

    const handleBackToTopClick = (event: any) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);

    const backToTopButton = document.getElementById("backtotop");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", handleBackToTopClick);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (backToTopButton) {
        backToTopButton.removeEventListener("click", handleBackToTopClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      // Check if the element with the id "progress" exists
      const progressElement = document.getElementById("progress");

      if (progressElement) {
        const scrollPercentage =
          (scrollTop / (documentHeight - windowHeight)) * 100;

        // Set the style only if the element exists
        progressElement.style.width = scrollPercentage + "%";
      }
    };

    if (document.querySelector("#progress")) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (document.querySelector("#progress")) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <a id='backtotop' className='show'>
      Back to top
    </a>
  );
}

export default BackToTop;
