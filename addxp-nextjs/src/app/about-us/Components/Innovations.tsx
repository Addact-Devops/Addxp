"use client";
import CountUp from "react-countup";
import RichText from "@/Components/Common";

export default function Innovations(data: any) {
  return (
    <section className="weekday-component static-component" id="who-are-we">
      {data?.data.innovation.data.attributes.Innovation == null ? null : (
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5">
              <div className="quote-image">
                {data?.data.innovation.data.attributes.Innovation[0].Images.data == null ? null : (
                  <img
                    src={data?.data.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url}
                    alt={data?.data.innovation.data.attributes.Innovation[0].Images.data[0].attributes.alternativeText}
                  />
                )}
              </div>
            </div>
            <div className="col-md-7">
              <div className="weekday-desc">
                {data?.data.innovation.data.attributes.Innovation[0].SubTitle == null ? null : (
                  <span className="tag-line">{data?.data.innovation.data.attributes.Innovation[0].SubTitle}</span>
                )}
                {data?.data.innovation.data.attributes.Innovation[0].Title == null ? null : (
                  <h2 className="sub_title_5">{data?.data.innovation.data.attributes.Innovation[0].Title}</h2>
                )}

                <div className="quote-image">
                  {data?.data.innovation.data.attributes.Innovation[0].Images.data == null ? (
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                      alt="Addxp_Place_holder_4333d94906.png"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={data?.data.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url}
                      alt={
                        data?.data.innovation.data.attributes.Innovation[0].Images.data[0].attributes.alternativeText
                      }
                      loading="lazy"
                      className="static-image-mobile"
                    />
                  )}
                </div>
                {data?.data.innovation.data.attributes.Innovation[0].Body == null ? null : (
                  <RichText htmlContent={data?.data.innovation.data.attributes.Innovation[0].Body}></RichText>
                )}

                <div className="row">
                  {data?.data.innovation.data.attributes.counter.data.map((counterdata: any) =>
                    counterdata.attributes.AboutCounter.map((subdata: any) => (
                      <div className="col-lg-3 stats" key={subdata.id}>
                        <div className="counter-box">
                          <h2 className="counting sub_title_5">
                            <CountUp start={0} end={subdata.counter} enableScrollSpy={true} scrollSpyDelay={3}>
                              {({ countUpRef, start }) => <span ref={countUpRef} />}
                            </CountUp>
                          </h2>
                          <span className="plus">+</span>
                        </div>
                        <RichText htmlContent={subdata.CounterDesc}></RichText>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
