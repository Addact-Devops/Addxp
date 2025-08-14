"use client";
import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

import RichText from "../Common";

function FAQS(data: any) {
  return (
    <>
      <section className="accrodian-section">
        <div className="container">
          <div className="accordian-top">
            <h2 className="sub_title_5">{data.data.data.attributes.faq_title.data.attributes.FAQTitle.Title}</h2>
            <RichText htmlContent={data.data.data.attributes.faq_title.data.attributes.FAQTitle.Description}></RichText>
          </div>
          <Accordion defaultActiveKey="" className="accordian_main">
            {data.data.data.attributes.faqs.data.map((faq: any, index: any) => (
              <Accordion.Item eventKey={String(index)} className="accordion-wrapper" key={faq.id}>
                <Accordion.Header>{faq.attributes.FAQ[0].Question}</Accordion.Header>
                <Accordion.Body className="collepsing-div">
                  <RichText htmlContent={faq.attributes.FAQ[0].Answer}></RichText>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}

export default FAQS;
