"use client";

export default function Keytagline(data: any) {
  return (
    <section className="brand-two-coloum">
      {data.data.data.attributes.key_tagline.data == null ? null : (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="brand-left">
                {data.data.data.attributes.key_tagline.data.attributes.MainTitle == null ? null : (
                  <h2 className="sub_title_5">{data.data.data.attributes.key_tagline.data.attributes.MainTitle}</h2>
                )}

                <ul>
                  {data.data.data.attributes.key_tagline.data.attributes.Subtagline.map((item: any) => (
                    <li key={item.id}>
                      {item.Number <= 9 ? (
                        <span className="number">0{item.Number}</span>
                      ) : (
                        <span className="number">0{item.Number}</span>
                      )}

                      <span>{item.Title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              {data.data.data.attributes.key_tagline.data.attributes.Image.data == null ? (
                <img
                  src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                  alt="Addxp_Place_holder_4333d94906.png"
                  loading="lazy"
                />
              ) : (
                <div className="brand-right">
                  <img
                    src={data.data.data.attributes.key_tagline.data.attributes.Image.data.attributes.url}
                    loading="lazy"
                    alt={data.data.data.attributes.key_tagline.data.attributes.Image.data.attributes.alternativeText}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
