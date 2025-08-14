"use client";
import RichText from "@/Components/Common.jsx";

export default function PrivatePolicy(data: any) {
  return (
    <section className="privacy-policy-section">
      <div className="container">
        <h1 className="sub_title_5">{data.data.data.attributes.PrivatePolicy.Title}</h1>
        <RichText htmlContent={data.data.data.attributes.PrivatePolicy.Description}></RichText>
      </div>
    </section>
  );
}
