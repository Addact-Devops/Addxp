"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

export default function StrapiServiceCard(data: any) {
  return (
    <>
      <section className="pluging-right-image-component">
        <div className="container">
          {data.data.data.attributes.service_card.data.attributes.MainTitle.Title == null ? null : (
            <span className="tag-line">{data.data.data.attributes.service_card.data.attributes.MainTitle.Title}</span>
          )}
          {data.data.data.attributes.service_card.data.attributes.MainTitle.SubTitle == null ? null : (
            <h2 className="sub_title_5">{data.data.data.attributes.service_card.data.attributes.MainTitle.SubTitle}</h2>
          )}

          <div className="row pluging-mian">
            <div className="col-md-6">
              <div className="pluging-box">
                {data.data.data.attributes.service_card.data.attributes.Details.Body == null ? null : (
                  <RichText
                    htmlContent={data.data.data.attributes.service_card.data.attributes.Details.Body}
                  ></RichText>
                )}
                {data.data.data.attributes.service_card.data.attributes.Details.Summary == null ? null : (
                  <RichText
                    htmlContent={data.data.data.attributes.service_card.data.attributes.Details.Summary}
                  ></RichText>
                )}
              </div>
            </div>
            {data.data.data.attributes.service_card.data.attributes.Details.Images.data == null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <div className="col-md-6">
                <img
                  src={data.data.data.attributes.service_card.data.attributes.Details.Images.data.attributes.url}
                  loading="lazy"
                  alt={
                    data.data.data.attributes.service_card.data.attributes.Details.Images.data.attributes
                      .alternativeText
                  }
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
