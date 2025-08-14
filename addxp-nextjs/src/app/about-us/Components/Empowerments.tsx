import RichText from "@/Components/Common.jsx";

export default function Empowerments(data: any) {
  return (
    <section className="journey-component">
      <div className="container">
        {data?.data.Empowerments == null ? null : (
          <div className="journey-main">
            {data?.data.Empowerments.Subtitle == null ? null : <small>{data?.data.Empowerments.Subtitle}</small>}
            {data?.data.Empowerments.Title == null ? null : (
              <h2 className="sub_title_5">{data?.data.Empowerments.Title}</h2>
            )}
            {data?.data.Empowerments.Description == null ? null : (
              <RichText htmlContent={data?.data.Empowerments.Description}></RichText>
            )}
            {data?.data.Empowerments.Images.data == null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <img src={data?.data.Empowerments.Images.data.attributes.url} alt="journey-image" loading="lazy" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
