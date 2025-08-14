import RichText from "@/Components/Common";
import { BLOGS_DETAILS } from "@/Configurations/CommonQuery";
import Link from "next/link";
import moment from "moment";
import { getServerProps } from "../globalserverprops";
import React, { useEffect } from "react";
import { SEO_DETAILS } from "@/Configurations/SEOQuery";
import SEOData from "@/Components/SEO/SEOData";
import NotFound from "@/app/not-found";
import dynamic from "next/dynamic";

const DynamicBackToTopButton = dynamic(() => import("../../../Components/BackToTop/BackToTop"), {
  ssr: false,
});

const DynamicProgressBar = dynamic(() => import("../../../Components/ProgressBar/ProgessBar"), {
  ssr: false,
});

const DynamicLatestNews = dynamic(
  //@ts-ignore
  () => import("../Components/DynamicLatestNews"),
  {
    ssr: false,
  }
);
const DynamicSocialIcons = dynamic(
  //@ts-ignore
  () => import("../Components/SocialIcons"),
  {
    ssr: false,
  }
);

export default async function SlugPage(data: any) {
  const datavalue = await getServerProps(BLOGS_DETAILS(data.params.blogdetails));

  const detailsdata = datavalue.props.data;

  const seodatavalue = await getServerProps(SEO_DETAILS(data.params.blogdetails));
  const seodetailsdata = seodatavalue.props.data;
  return (
    <>
      {detailsdata.data[0] == undefined ? (
        <NotFound />
      ) : (
        <>
          <SEOData data={seodetailsdata} name={data.params.blogdetails} />
          <DynamicProgressBar />
          {detailsdata.data.map((item: any) => (
            <React.Fragment key={item.id}>
              <section className="blog-detail-banner" key={item.id}>
                <div className="container">
                  <div className="blog-detail-main">
                    <div className="blog-detail-left">
                      <div className="label">{item.attributes.Blogs.tagLabel}</div>

                      {item?.attributes?.Blogs?.LinkedInPost == null ? null : (
                        <div className="label label-link">
                          <a href={item?.attributes?.Blogs?.LinkedInPost.href}>
                            {item?.attributes?.Blogs?.LinkedInPost.label}
                          </a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="20"
                            width="35"
                            viewBox="0 0 512 512"
                            fill="#ffffff"
                            style={{ rotate: "-30deg" }}
                          >
                            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z" />
                          </svg>
                        </div>
                      )}

                      <h1 className="sub_title_5">{item.attributes.Blogs.Title}</h1>
                      <RichText htmlContent={item.attributes.HeadDescription}></RichText>
                      <div className="blog-detail-bottom">
                        {item.attributes.Blogs.Companylogo.data == null ? (
                          <img
                            src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                            alt="Addxp_Place_holder_4333d94906.png"
                            loading="lazy"
                          />
                        ) : (
                          <img
                            src={item.attributes.Blogs.Companylogo.data.attributes.url}
                            loading="lazy"
                            alt={item.attributes.Blogs.Companylogo.data.attributes.alternativeText}
                            // className="blog-detail-desc"
                          />
                        )}

                        <div className="blog-detail-desc">
                          <small>{item.attributes.Blogs.Creator}</small>
                          {item.attributes.Blogs.Date == null ? null : (
                            <span className="date">{moment(item.attributes.Blogs.Date).format("DD MMMM YYYY")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="blog-detail-right">
                      {item.attributes.Blogs.image.data == null ? (
                        <img
                          src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                          alt="Addxp_Place_holder_4333d94906.png"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={item.attributes.Blogs.image.data.attributes.url}
                          alt={item.attributes.Blogs.image.data.attributes.alternativeText}
                          // className="blog-detail-desc"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </section>
              <section className="blog-detail-content">
                <div className="container">
                  <div className="blog-content-main">
                    <div className="social-icon-sticky">
                      <ul className="blog-social-icon">
                        <DynamicSocialIcons socialitem={item.attributes.social_icons.data} isOpen={false} />
                      </ul>
                    </div>
                    <div className="blog-detail-summary">
                      <RichText htmlContent={item.attributes.AboutDescription}></RichText>

                      {item.attributes.BlogBody.map((datavalue: any) => (
                        <React.Fragment key={datavalue.id}>
                          <RichText htmlContent={datavalue.IntroductionTitle} key={datavalue.id}></RichText>

                          <RichText htmlContent={datavalue.Steps}></RichText>
                          {datavalue.Images.data == null ? (
                            ""
                          ) : (
                            <img
                              src={datavalue.Images.data.attributes.url}
                              alt="umbraco-12-set-up-and-installation-guide-1"
                              loading="lazy"
                            ></img>
                          )}
                          <RichText htmlContent={datavalue.Richtext}></RichText>
                        </React.Fragment>
                      ))}

                      <RichText htmlContent={item.attributes.Conclusion}></RichText>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          ))}

          <DynamicLatestNews detailsdata={detailsdata} />

          <DynamicBackToTopButton />
        </>
      )}
    </>
  );
}
