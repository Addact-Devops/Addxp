import RichText from "@/Components/Common";
import moment from "moment";

export default function CaseStudyList(data: any) {
  const userdetails = [...data.data.data[0].attributes.case_studies_details.data];

  // Sort the case studies by Date in descending order (latest first)
  userdetails.sort(
    (a: any, b: any) =>
      new Date(b.attributes.casedetail.Date).getTime() - new Date(a.attributes.casedetail.Date).getTime()
  );

  return (
    <section className="press-listing-component">
      {userdetails.map((data: any) => (
        <div className="container" key={data.id}>
          <div className="press-listing-box">
            <div className="press-listing-left">
              <img
                src={data.attributes.casedetail.image.data.attributes.url}
                alt={data.attributes.casedetail.image.data.attributes.alternativeText}
              />
            </div>

            <div className="press-listing-right">
              <h2 className="large"> {data.attributes.casedetail.Title}</h2>
              <div className="press-listing-date">{moment(data.attributes.casedetail.Date).format("DD MMMM YYYY")}</div>
              <RichText htmlContent={data.attributes.HeadDescription}></RichText>
              <a href={`/case-studies/${data.attributes.casedetail.Links.href}`} className="btn-defualt">
                {data.attributes.casedetail.Links.label}
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
