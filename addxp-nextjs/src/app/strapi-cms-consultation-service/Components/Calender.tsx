"use client";
import React from "react";
import RichText from "@/Components/Common.jsx";
import { InlineWidget } from "react-calendly";

export default function Calender(data: any) {
  return (
    <section className="strapi-cms-calendly">
      <div className="container">
        <div className="calendly-form-title">
          <div className="calendly-text">
            <h2 className="sub_title_5">{data.data.data.attributes.calender.data.attributes.MainTitle.Title}</h2>
            <RichText htmlContent={data.data.data.attributes.calender.data.attributes.MainTitle.Description}></RichText>
          </div>
          <div className="calendly-inline-widget">
            <InlineWidget url="https://calendly.com/addact-nimesh/30min?hide_event_type_details=1&hide_gdpr_banner=1&text_color=#E97777&primary_color=#E97777" />
          </div>
        </div>
      </div>
    </section>
  );
}
