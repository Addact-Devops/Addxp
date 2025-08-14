"use client";
import RichText from "@/Components/Common";

export default function WeekDays(data: any) {
  return (
    <section className="weekday-component" id="weekday-component">
      <div className="container">
        {data.data.contactWeekdays.data.map((item: any) =>
          item.attributes.ContactWeekday.map((subitem: any) => (
            <div className="row align-items-center m-0" key={subitem.id}>
              <div className="col-md-5 p-0">
                <div className="quote-image">
                  {subitem?.Images.data == null ? (
                    <img
                      src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                      alt="Addxp_Place_holder_4333d94906.png"
                      loading="lazy"
                    />
                  ) : (
                    <img src={subitem?.Images.data[0].attributes.url} alt="weekday-image" loading="lazy" />
                  )}
                </div>
              </div>
              <div className="col-md-7 p-0">
                <div className="weekday-desc">
                  <h2 className="sub_title_5">
                    <span>{subitem.Title}</span> {subitem.SubTitle}
                  </h2>
                  <RichText htmlContent={subitem.Body}></RichText>
                  <ul>
                    {item.attributes.week_days.data.map((subitemcnt: any) =>
                      subitemcnt.attributes.AboutWeekdays.map((childcnt: any) => (
                        <li key={childcnt.id}>
                          <RichText htmlContent={childcnt.Description}></RichText>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
