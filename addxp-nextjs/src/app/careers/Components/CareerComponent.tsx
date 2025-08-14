"use client";
import RichText from "@/Components/Common";
import ClientOnly from "@/Configurations/ClientOnly";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function CareerComponent(data: any) {
  const router = useRouter();
  return (
    <>
      <section className="career-component" id="build-future-section">
        <div className="container">
          <span className="tag-line">Exciting Career Paths</span>
          <h2 className="sub_title_5">Build your future with us!</h2>

          <div className="tabbing-main">
            <Tabs defaultActiveKey="AllPositions" id="uncontrolled-tab-example" className="nav nav-tabs">
              {data.query.data.attributes.positions.data.map((tabitem: any) =>
                tabitem.attributes.EventTitle == "AllPositions" ? (
                  <Tab
                    eventKey={tabitem.attributes.EventTitle}
                    title={tabitem.attributes.EventTitle}
                    className="nav-link "
                    key={tabitem.id}
                  >
                    <div className="accordion-body">
                      <div className="row">
                        {tabitem.attributes.positions.data.map((data: any) =>
                          data.attributes.Info.map((dataitem: any) => (
                            <div className="col-md-6" key={data.id}>
                              <ClientOnly suppressHydrationWarning={true}>
                                <div onClick={() => (window.location.href = dataitem.LogoLink?.href)}>
                                  <div className="tab-box" key={dataitem.id}>
                                    <div className="tab-box-top">
                                      <h3 className="large">{dataitem.LogoTitle}</h3>
                                      <span className="x-icon">
                                        <img
                                          src={dataitem.Icon.data?.attributes.url}
                                          alt={dataitem.Icon.data?.attributes.alternativeText}
                                          className="icon-x"
                                          loading="lazy"
                                        />
                                        <img
                                          src={dataitem.HoverIcon.data?.attributes.url}
                                          alt={dataitem.HoverIcon.data?.attributes.alternativeText}
                                          className="icon-x-hover"
                                          loading="lazy"
                                        />
                                      </span>
                                    </div>
                                    <div className="tab-box-botom">
                                      <ul>
                                        {dataitem.TitleIcon.map((titleicn: any) => (
                                          <li key={titleicn.id}>
                                            <img
                                              src={titleicn.Icon.data?.attributes.url}
                                              alt={titleicn.Icon.data?.attributes.alternativeText}
                                              loading="lazy"
                                            />
                                            {titleicn.Title}
                                          </li>
                                        ))}
                                      </ul>

                                      <a href={dataitem.LogoLink?.href} className="arrow-right">
                                        <img
                                          src={dataitem.AerrowIcon.data?.attributes.url}
                                          alt={dataitem.AerrowIcon.data?.attributes.alternativeText}
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </ClientOnly>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </Tab>
                ) : (
                  <Tab
                    eventKey={tabitem.attributes.EventTitle}
                    title={tabitem.attributes.EventTitle}
                    className="nav-link "
                    key={tabitem.id}
                  >
                    <div className="accordion-body">
                      <div className="row">
                        {tabitem.attributes.Info.map((dataitem: any) => (
                          <div className="col-md-6" key={dataitem.id}>
                            <div onClick={() => router.push(dataitem.LogoLink?.href)}>
                              <div className="tab-box">
                                <div className="tab-box-top">
                                  <h3 className="large">{dataitem.LogoTitle}</h3>
                                  <span className="x-icon">
                                    <img
                                      src={dataitem.Icon.data?.attributes.url}
                                      alt={dataitem.Icon.data?.attributes.alternativeText}
                                      className="icon-x"
                                      loading="lazy"
                                    />
                                    <img
                                      src={dataitem.HoverIcon.data?.attributes.url}
                                      alt={dataitem.HoverIcon.data?.attributes.alternativeText}
                                      className="icon-x-hover"
                                      loading="lazy"
                                    />
                                  </span>
                                </div>
                                <div className="tab-box-botom">
                                  <ul>
                                    {dataitem.TitleIcon.map((titleicn: any) => (
                                      <li key={titleicn.id}>
                                        <img
                                          src={titleicn.Icon.data?.attributes.url}
                                          alt={titleicn.Icon.data?.attributes.alternativeText}
                                          loading="lazy"
                                        />
                                        {titleicn.Title}
                                      </li>
                                    ))}
                                  </ul>

                                  <span className="arrow-right">
                                    <img
                                      src={dataitem.AerrowIcon.data?.attributes.url}
                                      alt={dataitem.AerrowIcon.data?.attributes.alternativeText}
                                      loading="lazy"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab>
                )
              )}
            </Tabs>
          </div>
          <div className="get-link">
            <RichText htmlContent={data.query.data.attributes.AboutLink}></RichText>
          </div>
          {/* <div className='get-link'>
            Get to know us better!
            <a href={data.query.data.attributes.AboutLink.href}>
              <span className='common-link'>{data.query.data.attributes.AboutLink.label}</span>
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default CareerComponent;
