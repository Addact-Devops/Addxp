import React from "react";
import { InlineWidget } from "react-calendly";

function Calendly() {
  return (
    <section className="strapi-cms-calendly">
      <div className="container">
        <div className="calendly-form-title">
          <div className="calendly-text">
            <h2 className="sub_title_5">We promise we are worth the time! And it’s FREE!</h2>
            <p>
              Looking for Strapi consultants? You are at the right place. Don’t miss out on your free consultation. Book
              a slot on our calendars now!
            </p>
          </div>
          <div className="calendly-inline-widget">
            <InlineWidget url="https://calendly.com/addact-nimesh/30min?hide_event_type_details=1&hide_gdpr_banner=1&text_color=#E97777&primary_color=#E97777" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calendly;
