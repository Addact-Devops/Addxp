"use client";
import RichText from "@/Components/Common.jsx";
import { usePathname } from "next/navigation";

export default function ServiceExperience(data: any) {
  const pathname = usePathname();
  return (
    <>
      <section
        className={
          pathname == "/user-experience" ? "strapi-item-component services-important-wrapper" : "strapi-item-component"
        }
      >
        <div className="container">
          {data.data.data.attributes.service_experience.data.attributes.ComponentInfo.Title == null ? null : (
            <span className="tag-line">
              {data.data.data.attributes.service_experience.data.attributes.ComponentInfo.Title}
            </span>
          )}
          {data.data.data.attributes.service_experience.data.attributes.ComponentInfo.SubTitle == null ? null : (
            <h2 className="sub_title_5">
              {data.data.data.attributes.service_experience.data.attributes.ComponentInfo.SubTitle}
            </h2>
          )}
          {data.data.data.attributes.service_experience.data.attributes.ExperienceList == null ? null : (
            <div className="row">
              {data.data.data.attributes.service_experience.data.attributes.ExperienceList.map((item: any) => (
                <div className="col-md-4" key={item.id}>
                  <div className="strapi-item-box">
                    {item.Title == null ? null : <div className="type6">{item.Title}</div>}
                    {item.Description == null ? null : <RichText htmlContent={item.Description}></RichText>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
