"use client";
import RichText from "@/Components/Common.jsx";

export default function BuisinessGuidelines(query: any) {
  return (
    <div className="brand-bottom">
      {query.data.businessdata.data.attributes.business.data.attributes.Description == null ? null : (
        <RichText htmlContent={query.data.businessdata.data.attributes.business.data.attributes.Description}></RichText>
      )}
      {query.data.businessdata.data.attributes.business.data.attributes.Tagline == null ? null : (
        <ul>
          {query.data.businessdata.data.attributes.business.data.attributes.Tagline.map((item: any) => (
            <li key={item.id}>{item.Title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
