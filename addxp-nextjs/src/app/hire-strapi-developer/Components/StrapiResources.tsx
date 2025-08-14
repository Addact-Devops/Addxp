"use client";
import CountUp from "react-countup";
import RichText from "@/Components/Common";
export default function StrapiResources(data: any) {
  return (
    <section className="why-hire-section">
      <div className="container">
        <div className="hire-cms-box">
          <div className="hire-cms-left">
            <span className="tag-line">{data.data.data.attributes.innovation.data.attributes.Innovation[0].Title}</span>
            <h2 className="sub_title_5">
              {data.data.data.attributes.innovation.data.attributes.Innovation[0].SubTitle}
            </h2>
            <RichText htmlContent={data.data.data.attributes.innovation.data.attributes.Innovation[0].Body}></RichText>
            <div className="hire-cms-bottom">
              <div className="row">
                {data.data.data.attributes.innovation.data.attributes.counter.data.map((counterdata: any) =>
                  counterdata.attributes.AboutCounter.map((subdata: any) => (
                    <div className="col-lg-3 stats" key={subdata.id}>
                      <div className="counter-box">
                        <h2 className="sub_title_5 counting">
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
          <div className="hire-cms-right">
            <img
              src={data.data.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes.url}
              loading="lazy"
              alt={
                data.data.data.attributes.innovation.data.attributes.Innovation[0].Images.data[0].attributes
                  .alternativeText
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
