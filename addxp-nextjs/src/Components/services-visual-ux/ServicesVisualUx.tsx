"use client";
import { useState } from "react";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function ServicesVisualUx(data: any) {
   const [isSwitchOn, SetisSwitchOn] = useState(false);

   return (
      <>
         <section className='services-visual-ux-wrapper'>
            <div className='container'>
               {data.data.data.attributes.visual_ux.data.attributes.strapi_title.data == null ? null : (
                  <>
                     <span className='tag-line desktop'>
                        {
                           data.data.data.attributes.visual_ux.data.attributes.strapi_title.data.attributes
                              .StrapiTitle[0].Title
                        }
                     </span>

                     <span className='tag-line mobile'>
                        {data.data.data.attributes.visual_ux.data.attributes.strapi_title.data.attributes.MobileTitle}
                     </span>

                     <RichText
                        htmlContent={
                           data.data.data.attributes.visual_ux.data.attributes.strapi_title.data.attributes
                              .StrapiTitle[0].Description
                        }
                     ></RichText>

                     <RichText
                        htmlContent={
                           data.data.data.attributes.visual_ux.data.attributes.strapi_title.data.attributes
                              .MobileDescription
                        }
                     ></RichText>
                  </>
               )}

               <div className='switch-button'>
                  <div className='button-cover'>
                     <div
                        className={`button r ${isSwitchOn ? "switch-on" : ""}`}
                        id='button-1'
                        onClick={(e) => SetisSwitchOn(!isSwitchOn)}
                     >
                        <input type='checkbox'   aria-label="termsconditioncheckbox" className='checkbox' />
                        <div className='knobs'></div>
                        <div className='layer'></div>
                     </div>
                  </div>
               </div>
            </div>

            <div className={`switch-wrapper ${isSwitchOn ? "ux-on" : ""}`}>
               {data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageDesktop.data == null ? (
                  <img
                     src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                     alt='Addxp_Place_holder_4333d94906.png'
                     loading='lazy'
                  />
               ) : (
                  <img
                     src={data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageDesktop.data.attributes.url}
                     loading='lazy'
                     alt={
                        data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageDesktop.data.attributes
                           .alternativeText
                     }
                     className='switch-wrapper_screen'
                  />
               )}
               {data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageMobile.data == null ? (
                  <img
                     src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                     alt='Addxp_Place_holder_4333d94906.png'
                     loading='lazy'
                  />
               ) : (
                  <img
                     src={data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageMobile.data.attributes.url}
                     loading='lazy'
                     alt={
                        data.data.data.attributes.visual_ux.data.attributes.TabImage.ImageMobile.data.attributes
                           .alternativeText
                     }
                     className='switch-wrapper_screen'
                  />
               )}

               <div className='switch-wrapper-items'>
                  <a href={`${data.data.data.attributes.visual_ux.data.attributes.Links.href}`}>
                     {data.data.data.attributes.visual_ux.data.attributes.AllImg.map((item: any) =>
                        item.Images.data == null ? (
                           <img
                              src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                              alt='Addxp_Place_holder_4333d94906.png'
                              loading='lazy'
                              key={item.id}
                           />
                        ) : (
                           <img
                              src={item.Images.data[0].attributes.url}
                              alt={item.Images.data[0].attributes.alternativeText}
                              className='switch-wrapper-screen'
                              loading='lazy'
                              key={item.id}
                           />
                        )
                     )}
                  </a>
               </div>
            </div>
         </section>
      </>
   );
}
