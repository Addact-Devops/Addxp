import RichText from "@/Components/Common.jsx";

export default function BrandValues(data: any) {
  return (
    <section className="what-we-compoent" id="brand-values">
      {data.data.brand_value.data.attributes.BrandValues == null ? null : (
        <div className="container">
          {data.data.brand_value.data.attributes.BrandValues.map((item: any) => (
            <div className="row align-items-center black-bg" key={item.id}>
              <div className="col-md-5">
                <div className="weekday-desc">
                  {item.SubTitle == null ? null : <span className="tag-line">{item.SubTitle}</span>}
                  {item.Title == null ? null : <h2 className="sub_title_5">{item.Title}</h2>}
                  {item.Body == null ? null : <RichText htmlContent={item.Body}></RichText>}
                </div>
              </div>
              <div className="col-md-7">
                <div className="quote-image">
                  {item.Images.data == null ? (
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                      alt="Addxp_Place_holder_4333d94906.png"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={item.Images.data[0].attributes.url}
                      loading="lazy"
                      alt={item.Images.data[0].attributes.alternativeText}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
