import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const LoaderScreen = () => {
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const timeoutId = setTimeout(() => {
         setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timeoutId);
   }, []);

   return isLoading ? (
      <div className='loader-overlay'>
         <div>
            <img src='/addxp-loader.gif' />
         </div>
      </div>
   ) : null;
};

export default LoaderScreen;
