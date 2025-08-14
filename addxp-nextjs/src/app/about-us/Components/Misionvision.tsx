import RichText from "@/Components/Common.jsx";
export default function Misionvision(data: any) {
  return (
    <section className="image-component" id="vision-and-mission">
      <div className="container">
        <div className="image-desc">
          {data.data.data.map((item: any) =>
            item.attributes.MissionVision.map((subitem: any) => (
              <div className="row align-items-center" key={subitem.id}>
                <div className="col-md-6 left-desc">
                  <div className="map-desc">
                    <span className="tag-line">{subitem.SubTitle}</span>
                    <h2 className="sub_title_5">{subitem.Title}</h2>
                    <RichText htmlContent={subitem.Description}></RichText>
                  </div>
                </div>
                <div className="col-md-6 right-image">
                  <div className="map-images">
                    <img src={subitem?.Images.data.attributes.url} loading="lazy" alt="image-compoent1" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
