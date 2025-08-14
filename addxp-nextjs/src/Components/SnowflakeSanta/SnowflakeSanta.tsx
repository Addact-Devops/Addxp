import React, { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";

const SnowflakeSanta = () => {
  const santaRef = useRef<HTMLImageElement | null>(null);

  // Dynamic image size state
  const [imageSize, setImageSize] = useState({ width: 350, height: 263 });

  useEffect(() => {
    function moveSanta() {
      const santa = santaRef.current;
      if (santa) {
        santa.style.visibility = "visible";
        santa.style.animation = "none";
        void santa.offsetWidth;
        santa.style.animation = "santa-move 15s linear forwards";

        // Hide Santa after the animation ends
        setTimeout(() => {
          santa.style.visibility = "hidden";
        }, 15000);
      }
    }

    // Set the interval to move Santa every 30 seconds
    const intervalId = setInterval(moveSanta, 30000);

    // Run the animation once immediately
    moveSanta();

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  // Update image size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1500) {
        setImageSize({ width: 250, height: 188 });
      } else {
        setImageSize({ width: 350, height: 263 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Fragment>
      <div className="snowflakes" aria-hidden="true">
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
        <div className="snowflake">❅</div>
        <div className="snowflake">❆</div>
        <div className="snowflake">❄</div>
      </div>
      <div className="santa-container">
        <Image
          src="https://dfr7gdtg8j0s1.cloudfront.net/src/images/santa.gif"
          alt="Santa"
          className="santa"
          ref={santaRef}
          width={imageSize.width}
          height={imageSize.height}
          unoptimized
        />
      </div>
      <style jsx>{`
        /* Snowflake Styling */
        .snowflake {
          color: #fff;
          font-size: 1em;
          font-family: "Molle", cursive;
          text-shadow: 0 0 1px #000;
          position: fixed;
          top: -10%;
          z-index: 9999;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          cursor: default;
          -webkit-animation: snowflakes-fall 7s linear infinite, snowflakes-shake 3s ease-in-out infinite;
          animation: snowflakes-fall 7s linear infinite, snowflakes-shake 3s ease-in-out infinite;
        }

        /* Snowflake Animations */
        @-webkit-keyframes snowflakes-fall {
          0% {
            top: -10%;
          }
          100% {
            top: 100%;
          }
        }

        @keyframes snowflakes-fall {
          0% {
            top: -10%;
          }
          100% {
            top: 100%;
          }
        }

        @-webkit-keyframes snowflakes-shake {
          0% {
            -webkit-transform: translateX(0px);
          }
          50% {
            -webkit-transform: translateX(80px);
          }
          100% {
            -webkit-transform: translateX(0px);
          }
        }

        @keyframes snowflakes-shake {
          0% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(80px);
          }
          100% {
            transform: translateX(0px);
          }
        }

        /* Snowflake Positions */
        .snowflake:nth-of-type(0) {
          left: 1%;
          animation-delay: 0s, 0s;
        }

        .snowflake:nth-of-type(1) {
          left: 10%;
          animation-delay: 1s, 1s;
        }

        .snowflake:nth-of-type(2) {
          left: 20%;
          animation-delay: 6s, 0.5s;
        }

        .snowflake:nth-of-type(3) {
          left: 30%;
          animation-delay: 4s, 2s;
        }

        .snowflake:nth-of-type(4) {
          left: 40%;
          animation-delay: 2s, 2s;
        }

        .snowflake:nth-of-type(5) {
          left: 50%;
          animation-delay: 8s, 3s;
        }

        .snowflake:nth-of-type(6) {
          left: 60%;
          animation-delay: 6s, 2s;
        }

        .snowflake:nth-of-type(7) {
          left: 70%;
          animation-delay: 2.5s, 1s;
        }

        .snowflake:nth-of-type(8) {
          left: 80%;
          animation-delay: 1s, 0s;
        }

        .snowflake:nth-of-type(9) {
          left: 90%;
          animation-delay: 3s, 1.5s;
        }

        /* Santa Container */
        .santa-container {
          position: fixed;
          bottom: 0px;
          left: -150px;
          max-width: ${imageSize.width}px;
          height: auto;
          z-index: 100;
        }

        /* Santa Animation */
        .santa-container .santa {
          width: 100%;
          animation: santa-move 20s linear infinite;
        }

        /* Media Query: Max Width 1200px */
        @media (max-width: 1200px) {
          .santa-container {
            display: none;
          }
        }

        @keyframes santa-move {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(105vw);
          }
        }
      `}</style>
    </Fragment>
  );
};

export default SnowflakeSanta;
