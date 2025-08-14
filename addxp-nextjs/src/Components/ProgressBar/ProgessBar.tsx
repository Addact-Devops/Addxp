"use client";
import React, { useEffect } from "react";

function ProgressBar() {
  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const progressElement = document.getElementById("progress");

      if (progressElement) {
        const scrollPercentage =
          (scrollTop / (documentHeight - windowHeight)) * 100;

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

  return <div id='progress' style={{ width: "0" }}></div>;
}

export default ProgressBar;
