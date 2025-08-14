"use client";
import RichText from "@/Components/Common.jsx";
export default function Experience(data: any) {
  return (
    <section className="item-component" id="perks">
      <div className="container">
        <span className="tag-line">{data.data.data.attributes.ExperienceTitle[0].SubTitle}</span>

        <h2 className="sub_title_5"> {data.data.data.attributes.ExperienceTitle[0].Title}</h2>
        <div className="row">
          {data.data.data.attributes.experiences.data.map((item: any) =>
            item.attributes.Experience.map((subitem: any) => (
              <div className="col-md-4" key={subitem.id}>
                <div className="item-box">
                  <div className="type7">
                    {subitem.Title}

                    <img
                      src={subitem?.Images.data[0].attributes.url}
                      alt={subitem?.Images.data[0].attributes.alternativeText}
                      loading="lazy"
                    />
                  </div>
                  <RichText htmlContent={subitem.Body}></RichText>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
