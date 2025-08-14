import strapi from "../../Configurations/Config.json";
import { HEADER } from "../Navigations/Query/NavigationQuery.js";

import React from "react";
import MainHeader from "./MainHeader";

export const getUserDetails = async () => {
   const config: RequestInit = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query: HEADER,
      }),
      next: { revalidate: 3600 },
   };

   try {
      const response = await fetch(strapi.strapigraphql, config);
      const responseData = await response.json();
      return responseData.data.headers;
   } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return null; // or handle error in your preferred way
   }
};

export const getUserDetailsAPI = async () => {
   const configapi: RequestInit = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
   };

   try {
      const response = await fetch(
         `${strapi.strapihost}/api/blogs?sort[0]=&populate=Blogs.HeaderImage&Blogs.Date:desc&populate=Blogs.image&populate=Blogs.Links`,
         configapi
      );
      const responseData = await response.json();
      return responseData;
   } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return null; // or handle error in your preferred way
   }
};

const AddXpHeader = async () => {
   const userDetails = await getUserDetails();
   let userDetailsAPI;
   if (userDetails?.data[0].attributes.LatestBlogs === true) {
      userDetailsAPI = await getUserDetailsAPI();
   }

   return (
      <>
         <MainHeader userDetailsData={userDetails} userDetailsAPIdata={userDetailsAPI} />
      </>
   );
};
export default AddXpHeader;
