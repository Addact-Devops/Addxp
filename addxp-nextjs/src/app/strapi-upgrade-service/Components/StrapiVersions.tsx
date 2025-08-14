"use client";
import { useState } from "react";
import RichText from "@/Components/Common.jsx";

export default function StrapiVersions(data: any) {
  let ids = "#";
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabdata, setActiveTabData] = useState(0);
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };
  const handleTabDataClick = (index: any) => {
    setActiveTabData(index);
  };
  return (
    <section className="strapi-tab-section">
      <div className="container">
        <h2 className="sub_title_5">{data.data.data.attributes.srapi_versions.data[0].attributes.MainTitle.Title}</h2>
        <RichText
          htmlContent={data.data.data.attributes.srapi_versions.data[0].attributes.MainTitle.Description}
        ></RichText>
        <div className="tab-section">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {data.data.data.attributes.srapi_versions.data.map((tab: any, index: any) => (
              <li className="nav-item" role="presentation" key={tab.id}>
                <button
                  className={index === activeTabdata ? "nav-link active" : "nav-link"}
                  id={tab.attributes.VersionTab.TabId.replaceAll("_", "-")}
                  data-bs-toggle="tab"
                  data-bs-target={ids + tab.attributes.VersionTab.Target}
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected={tab.attributes.VersionTab.id == 1 ? "true" : "false"}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.attributes.VersionTab.TabTitle}
                </button>
              </li>
            ))}
          </ul>
          <div className="tab-content" id="myTabContent">
            {data.data.data.attributes.srapi_versions.data.map((tab: any, index: any) => (
              <div
                key={tab.id}
                className={index === activeTab ? "tab-pane fade active show" : "tab-pane fade"}
                id={tab.attributes.VersionTab.Target}
                role="tabpanel"
                aria-labelledby={tab.attributes.VersionTab.TabId.replaceAll("_", "-")}
                onClick={() => handleTabDataClick(index)}
              >
                <div className="tab-content-top">
                  <h2 className="sub_title_5">{tab.attributes.VersionTab.TabTitle}</h2>
                  <RichText htmlContent={tab.attributes.VersionTab.TabDesc}></RichText>
                </div>
                <div className="row">
                  {tab.attributes.VersionDetails.map((details: any) => (
                    <div className="col-md-4" key={details.id}>
                      <div className="tab-content-box">
                        <div className="type6">{details.Title}</div>
                        <RichText htmlContent={details.Description}></RichText>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
