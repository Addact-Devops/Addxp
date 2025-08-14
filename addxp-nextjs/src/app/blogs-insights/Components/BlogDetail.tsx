"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RichText from "@/Components/Common";
import Link from "next/link";
import moment from "moment";

function BlogDetail() {
  const [userDetails, setUserDetails] = useState<UserData>();
  const searchParams = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    //fetchdata();
    document.body.classList.add("blog-detail-body");
  }, []);

  return (
    <>
      {userDetails?.data.map((item: any) => (
        <React.Fragment key={item.id}>
          <section className="blog-detail-banner" key={item.id}>
            <div className="container">
              <div className="blog-detail-main">
                <div className="blog-detail-left">
                  <div className="label">{item.attributes.Blogs.tagLabel}</div>
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
                        // className='blog-detail-desc'
                      />
                    )}

                    <div className="blog-detail-desc">
                      <small>{item.attributes.Blogs.Creator}</small>

                      <span className="date">{moment(item.attributes.Blogs.Date).format("DD MMMM YYYY")}</span>
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
                      // className='blog-detail-desc'
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
                    <li className={`share-icon ${isOpen ? "open" : ""}`} onClick={handleButtonClick}>
                      <img
                        src={item.attributes.social_icons.data[0].attributes.SocialIcons.Icons.data.attributes.url}
                        alt="social-open"
                        className={`${item.attributes.social_icons.data[0].attributes.SocialIcons.ClassName.replaceAll(
                          "_",
                          "-"
                        )} ${isOpen ? "" : "d-none"}`}
                        style={{
                          left: isOpen ? "68px" : "10px",
                          top: isOpen ? "38px" : "0",
                        }}
                        loading="lazy"
                      />
                      <img
                        src={item.attributes.social_icons.data[0].attributes.SocialIcons.Icons.data.attributes.url}
                        alt="social-close"
                        className={`social-close ${isOpen ? "d-block" : ""}`}
                        loading="lazy"
                      />
                    </li>
                    {item.attributes.social_icons.data.map((socialitem: any) => (
                      <li key={socialitem.id}>
                        <a
                          href={socialitem.attributes.SocialIcons.Links.href}
                          className={socialitem.attributes.SocialIcons.ClassName.replaceAll("_", "-")}
                        >
                          <img
                            src={socialitem.attributes.SocialIcons.Icons.data.attributes.url}
                            alt={socialitem.attributes.SocialIcons.Icons.data.attributes.alternativeText}
                            loading="lazy"
                          />
                          <img
                            src={socialitem.attributes.SocialIcons.HoverIcon.data.attributes.url}
                            alt={socialitem.attributes.SocialIcons.HoverIcon.data.attributes.alternativeText}
                            loading="lazy"
                            className="hover"
                          />
                        </a>
                      </li>
                    ))}
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

      {userDetails?.data.map((item: any) =>
        item.attributes.Similar_blog.data.map((checkdata: any, index: any) =>
          checkdata.attributes.Blogs == null ? (
            "Good bye forever"
          ) : index <= 0 ? (
            <React.Fragment key={checkdata.id}>
              <section className="latest-news service-component-2" key={checkdata.id}>
                <div className="container">
                  <div className="latest-top">
                    <h2 className="sub_title_5">Similar stories</h2>
                    <p>
                      Explore more similar subjects, ideas, blogs
                      <br /> and relevant reads.
                    </p>
                  </div>
                  <div className="row">
                    {item.attributes.Similar_blog.data.map((similar: any) => (
                      <div className="col-md-6" key={similar.id}>
                        <div className="latest-box">
                          <a href={similar.attributes.Blogs.Links.href}>
                            <figure>
                              <img
                                src={similar.attributes.Blogs.image.data.attributes.url}
                                alt={similar.attributes.Blogs.image.data.attributes.alternativeText}
                                loading="lazy"
                              />
                            </figure>
                            <div className="latest-desc">
                              <div className="label">{similar.attributes.Blogs.tagLabel}</div>
                              <h2 className="large">{similar.attributes.Blogs.Title}</h2>
                              <ul>
                                <li>{moment(similar.attributes.Blogs.Date).format("DD MMMM YYYY")}</li>
                                <li>{similar.attributes.Blogs.Creator}</li>
                              </ul>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </React.Fragment>
          ) : (
            ""
          )
        )
      )}
    </>
  );
}

export default BlogDetail;
