import { FOOTER, HEADER } from "@/Components/Navigations/Query/NavigationQuery";
import { GoogleTagManager } from "@next/third-parties/google";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import strapi from "../Configurations/Config.json";
import "../assets/src/scss/main.scss";

import HelmetComponent from "./layout-components/helmet";
import LayoutBody from "./layout-components/layoutBody";
import Script from "../../node_modules/next/script";

const poppins = Poppins({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-poppins",
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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

export const getFooterData = async () => {
   const config: RequestInit = {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({
         query: FOOTER,
      }),
      next: { revalidate: 3600 },
   };

   try {
      const response = await fetch(strapi.strapigraphql, config);
      const responseData = await response.json();
      return responseData.data.footers;
   } catch (err) {
      console.log("ERROR DURING FETCH REQUEST", err);
      return null; // or handle error in your preferred way
   }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
   const userHeaderDetails = await getUserDetails();
   let userDetailsAPI;
   if (userHeaderDetails?.data[0].attributes.LatestBlogs === true) {
      userDetailsAPI = await getUserDetailsAPI();
   }

   const userFooterDetails = await getFooterData();

   return (
      <html lang='en' className={`${poppins.variable}`}>
         {/* <HelmetComponent /> */}
         <GoogleTagManager gtmId='GTM-NM9VSWDF' />
        
         <LayoutBody
            bodyChildren={children}
            userDetailsAPI={userDetailsAPI}
            userDetails={userHeaderDetails}
            userFooterDetails={userFooterDetails}
         />
         <script src="//code.tidio.co/alwcrztooa3ur96b7luzlflxidei5qnd.js" async></script>
      </html>
   );
}
