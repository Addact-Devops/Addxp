"use client";
import RichText from "@/Components/Common";
import moment from "moment";
import { usePathname } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import CasestudyForm from "./CasestudyForm";

const DetailsData = ({ props }: any) => {
  const [caseStudy, setCaseStudy] = useState<any>(null);

  const pathname = usePathname();
  const currentSlug = pathname.split("/")[2];

  const getCaseStudyBySlug = (slug: string): any => {
    return props.find((item: { attributes: { Slug: string } }) => item.attributes.Slug === slug);
  };

  useEffect(() => {
    if (currentSlug) {
      const fetchedCaseStudy = getCaseStudyBySlug(currentSlug as string);
      setCaseStudy(fetchedCaseStudy);
    }
  }, [currentSlug]);

  return (
    <Fragment>
      {caseStudy && (
        <Fragment>
          <section className="blog-detail-banner">
            <div className="container">
              <div className="blog-detail-main">
                <div className="blog-detail-left">
                  <div className="date-cs">{moment(caseStudy.attributes.casedetail.Date).format("DD MMMM YYYY")}</div>
                  <h1 className="sub_title_5">{caseStudy.attributes.casedetail.Title}</h1>
                </div>
                <div className="blog-detail-right">
                  <img
                    src={caseStudy.attributes.casedetail.image.data.attributes.url}
                    alt={caseStudy.attributes.casedetail.image.data.attributes.alternativeText}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="blog-detail-content">
            <div className="container">
              <div className="cs-details">
                <div className="cs-details-left">
                  {caseStudy.attributes.casebody.map((subitems: any) => (
                    <div className="cs-detail-box" key={subitems.id}>
                      <RichText htmlContent={subitems.IntroductionTitle}></RichText>
                      <RichText htmlContent={subitems.Richtext}></RichText>
                      <RichText htmlContent={subitems.Steps}></RichText>
                    </div>
                  ))}
                </div>
                <div className="cs-details-right case-studies-form-section">
                  <div className="brand-tagline_bottom">
                    <div className="brand-tag-right">
                      <div className="brand-right">
                        <h2 className="sub_title_5">{caseStudy.attributes.contact_form.data.attributes.Right.Title}</h2>
                        <CasestudyForm
                          data={caseStudy.attributes.contact_form.data}
                          title={caseStudy.attributes.casedetail.pdf?.data?.attributes?.url}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default DetailsData;
