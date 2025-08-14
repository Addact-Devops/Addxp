"use client";
import RichText from "@/Components/Common.jsx";
import React from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showForm } from "@/store/formActions";

export default function VideoBanner(data: any) {
   const videoUrl = data.data.data.attributes.video_banner.data.attributes.VideoMain.VideoUrl;
   const dispatch = useDispatch();

   return (
      <section className='services-detail-hero'>
         {videoUrl ? (
            <video loop autoPlay={true} preload='auto' muted playsInline>
               <source src={videoUrl} type='video/mp4' />
            </video>
         ) : null}

         <div className='container'>
            <div className='services-detail-hero_content'>
               <div className='services-detail-hero_content_title'>
                  <img
                     src={
                        data.data.data.attributes.video_banner.data.attributes.VideoMain.TitleImage.data.attributes.url
                     }
                     alt={
                        data.data.data.attributes.video_banner.data.attributes.VideoMain.TitleImage.data.attributes
                           .alternativeText
                     }
                  />

                  <a
                     href={`${data.data.data.attributes.video_banner.data.attributes.VideoMain.MainLink.href}`}
                     className='title-smalltext'
                  >
                     <img
                        src='https://d1ousucuxrlllk.cloudfront.net/src/images/title-small-arrow.png'
                        alt='title-small-arrow'
                        loading='lazy'
                     />
                     {data.data.data.attributes.video_banner.data.attributes.VideoMain.MainLink.label}
                  </a>
               </div>
               <RichText
                  htmlContent={data.data.data.attributes.video_banner.data.attributes.VideoMain.Description}
               ></RichText>
            </div>

            <div className='services-detail-hero_highlights'>
               <div className='row'>
                  <div className='col-md-6'>
                     <div className='services-detail-hero_highlights_experts'>
                        <div className='experts_btncontent'>
                           <div className='btn-tag-wrapper'>
                              <span className='btn-tag'>
                                 {data.data.data.attributes.video_banner.data.attributes.VideoLeft.Title}
                              </span>
                           </div>
                           <p>{data.data.data.attributes.video_banner.data.attributes.VideoLeft.Description}</p>
                        </div>

                        <div className='experts-count-chat'>
                           <div className='experts-count-chat_number'>
                              <span className='number'>
                                 {data.data.data.attributes.video_banner.data.attributes.VideoLeft.Number}
                              </span>
                              <span className='text'>
                                 <RichText
                                    htmlContent={data.data.data.attributes.video_banner.data.attributes.VideoLeft.Text}
                                 ></RichText>
                              </span>
                           </div>

                           <div className='experts-count-chat_img'>
                              <img
                                 src={
                                    data.data.data.attributes.video_banner.data.attributes.VideoLeft.TagImage.data
                                       .attributes.url
                                 }
                                 loading='lazy'
                                 alt='expert-chat-multiple'
                              />
                              <span
                                 onClick={() => {
                                    dispatch(showForm());
                                 }}
                                 className='icon-rocket'
                              >
                                 {data.data.data.attributes.video_banner.data.attributes.VideoLeft.Link.label}
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className='col-md-6'>
                     <div className='services-detail-hero_highlights_itemlist'>
                        {data.data.data.attributes.video_banner.data.attributes.VideoRight.map((itemright: any) => (
                           <div className='highlights_item' key={itemright.id}>
                              <div className='highlights_item_title'>{itemright.Title}</div>
                              <div className='highlights_item_date'>
                                 {moment(itemright.Date).format("DD MMMM YYYY")}
                              </div>
                              <a href={`/blogs-insights/${itemright.Link.href}`}>{itemright.Link.label}</a>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
