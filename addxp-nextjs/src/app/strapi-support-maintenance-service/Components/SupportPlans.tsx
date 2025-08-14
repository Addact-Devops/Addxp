"use client";
import RichText from "@/Components/Common.jsx";
import Link from "next/link";

export default function SupportPlans(data: any) {
  return (
    <section className="table-component" id="supportPlans">
      <div className="container">
        <h2 className="sub_title_5">
          {data.data.data.attributes.support_plan_title.data.attributes.IntroductionTitle.Title}
        </h2>
        <RichText
          htmlContent={data.data.data.attributes.support_plan_title.data.attributes.IntroductionTitle.Description}
        ></RichText>
        <div className="row sticky-div">
          <div className="col-lg-4 col-md-none"></div>
          {data.data.data.attributes.support_plan_title.data.attributes.Column.map((item: any) => (
            <div className="col-lg-4 col-6" key={item.id}>
              <div className="main-point-box equalheight6">{item.Title}</div>
            </div>
          ))}
        </div>
        <div className="table-content">
          {data.data.data.attributes.support_plan_title.data.attributes.support_values.data.map((data: any) => (
            <div className="row" key={data.id}>
              <div className="col-lg-4 col-12">
                <div className="point-differentiator-box">{data.attributes.RowTitle.Title}</div>
              </div>
              {data.attributes.RowData.map((subdata: any) => (
                <div className="col-lg-4 col-6" key={subdata.id}>
                  {subdata.Link == null ? (
                    <div className="point-difference-box equalheight">{subdata.RowData}</div>
                  ) : (
                    <a href={subdata.Link.href} className="point-difference-box equalheight d-block">
                      {subdata.Link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
