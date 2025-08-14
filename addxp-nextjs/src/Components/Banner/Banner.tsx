"use client";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setKeyword } from "@/store/searchAction";
import { useState } from "react";
export default function Banner(data: any) {
  const [searchedKeyword, setSearchedKeyword] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setKeyword(searchedKeyword));
  };

  const pathname = usePathname();
  let bannerSectionClass = "";
  let bannerClass = "";
  let pageClass = "";
  if (pathname == "/contentful-cms-services") {
    pageClass = "contentfull-banner";
  }
  if (pathname == "/kontent-ai-development-service") {
    pageClass = "kontent-ai-banner";
  }
  if (pathname == "/sitemap") {
    pageClass = "sitemap-banner press-release-banner";
  }
  if (pathname == "/sitecore-xm-cloud-service") {
    pageClass = "sitecore-xm-banner";
  }
  if (pathname == "/press-release") {
    pageClass = "press-release-banner banner-js";
  }
  if (pathname == "/brand-guidelines") {
    pageClass = "brand-banner";
  }
  if (pathname == "/blogs-insights") {
    pageClass = "blog-banner banner-js";
  }
  if (pathname == "/virto-commerce-services") {
    pageClass = "viro-banner";
  }
  if (pathname == "/kontent-ai-development-service") {
    pageClass = "kontent-ai-banner";
  }
  if (pathname == "/kentico-development-service") {
    pageClass = "kentico-banner";
  }

  if (pathname == "/umbraco-development-service") {
    pageClass = "umbraco-banner";
  }

  if (pathname == "/ui-ux-designer") {
    pageClass = "career-detail-banner";
  }
  if (pathname == "/hire-umbraco-developer") {
    pageClass = "resources-banner hire-umbraco-banner banner-js";
  }
  if (pathname == "/hire-strapi-developer") {
    pageClass = "resources-banner contact-banner banner-js";
  }
  if (pathname == "/hire-kentico-developer") {
    pageClass = "resources-banner contact-banner banner-js";
  }
  if (pathname == "/hire-asp-net-developer") {
    pageClass = "resources-banner contact-banner banner-js";
  }
  if (pathname == "/hire-sitecore-xm-cloud-developer") {
    pageClass = "resources-banner contact-banner banner-js";
  }
  if (pathname == "/case-studies") {
    bannerSectionClass = "strapi-banner case-studies-banner";
    bannerClass = "press-release-banner";
  }
  if (pathname == "/careers" || pathname == "/about-us") {
    bannerSectionClass = "about-banner";
    bannerClass = "about-main";
  } else if (pathname == "/contact-us") {
    bannerSectionClass = "contact-banner";
    bannerClass = "contact-main";
  } else {
    bannerSectionClass = "strapi-banner case-studies-banner";
    bannerClass = "contact-main";
  }

  return (
    <>
      {data.data.data.attributes.banner.data.attributes.isSearch === false ||
      data.data.data.attributes.banner.data.attributes.isSearch === null ? (
        <section
          className={`${bannerSectionClass} ${pageClass}`}
          style={
            data.data.data.attributes.banner.data.attributes.backgroundImg.data === null
              ? {
                  backgroundImage: `url(https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png)  !important`,
                }
              : {
                  backgroundImage: `url(${data.data.data.attributes.banner.data.attributes.backgroundImg.data.attributes.url})`,
                  width: "100%",
                  backgroundPosition: " top left",
                }
          }
        >
          <div className="container">
            <div className={bannerClass}>
              {data.data.data.attributes.banner.data.attributes.Banner.Title == null ? null : (
                <h1>{data.data.data.attributes.banner.data.attributes.Banner.Title}</h1>
              )}
              {data.data.data.attributes.banner.data.attributes.Banner.Description == null ? null : (
                <RichText htmlContent={data.data.data.attributes.banner.data.attributes.Banner.Description} />
              )}

              {data.data.data.attributes.banner.data.attributes.BannerLink.href == null ? null : (
                <>
                  <a href={data.data.data.attributes.banner.data.attributes.BannerLink.href} className="btn-defualt">
                    {data.data.data.attributes.banner.data.attributes.BannerLink.label}
                  </a>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section
          className={`${bannerSectionClass} ${pageClass}`}
          style={
            data.data.data.attributes.banner.data.attributes.backgroundImg.data === null
              ? {
                  backgroundImage: `url(https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png)  !important`,
                }
              : {
                  backgroundImage: `url(${data.data.data.attributes.banner.data.attributes.backgroundImg.data.attributes.url})`,
                  width: "100%",
                  backgroundPosition: " top left",
                }
          }
        >
          <div className="container">
            <div className={bannerClass}>
              <div className="blog-left">
                {data.data.data.attributes.banner.data.attributes.Banner.Title == null ? null : (
                  <h1>{data.data.data.attributes.banner.data.attributes.Banner.Title}</h1>
                )}
                {data.data.data.attributes.banner.data.attributes.Banner.Description == null ? null : (
                  <RichText htmlContent={data.data.data.attributes.banner.data.attributes.Banner.Description} />
                )}

                {data.data.data.attributes.banner.data.attributes.BannerLink.href == null ? null : (
                  <>
                    <a href={data.data.data.attributes.banner.data.attributes.BannerLink.href} className="btn-defualt">
                      {data.data.data.attributes.banner.data.attributes.BannerLink.label}
                    </a>
                  </>
                )}
              </div>
              <div className="blog-right">
                <div className="searchBox">
                  <input
                    type="text"
                    placeholder="Search blogs"
                    name="search"
                    id="searchbar"
                    value={searchedKeyword}
                    onChange={(e) => {
                      setSearchedKeyword(e.target.value);
                      dispatch(setKeyword(e.target.value)); // Dispatch on every keystroke
                    }}
                    autoComplete="off"
                  />
                  <button className="submit-btn" id="searchbarsubmit" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
