import RichText from "@/Components/Common.jsx";
import SEOData from "@/Components/SEO/SEOData";
import { SEO } from "@/Configurations/SEOQuery";
import { NOTFOUND } from "../Components/Navigations/Query/NavigationQuery.js";
import { getServerProps } from "../Components/Navigations/globalserverprops";

export default async function PageNotFound() {
  const seodatavalue = await getServerProps(SEO("pageNotFound"));
  const seodata = seodatavalue.props.data.data.pageNotFound;

  const notdatavalue = await getServerProps(NOTFOUND);
  const notfounddata = notdatavalue.props.data.data.pageNotFound;
  return (
    <>
      <SEOData data={seodata} name="" />
      <section
        className="about-banner page-not-found banner-js"
        style={
          notfounddata.data.attributes.Description.Images.data[0].data === null
            ? {
                backgroundImage: `url(https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png)  !important`,
              }
            : {
                backgroundImage: `url(${notfounddata.data.attributes.Description.Images.data[0].attributes.url})`,
                width: "100%",
                backgroundPosition: " top left",
              }
        }
      >
        <div className="container">
          <h1 className="d-none">{notfounddata.data.attributes.Description.Title}</h1>
          <h2 className="sub_title_5"> {notfounddata.data.attributes.Description.SubTitle}</h2>
          <RichText htmlContent={notfounddata?.data.attributes.Description.Description}></RichText>
          <a href={notfounddata.data.attributes.GoBackLink.href} className="btn-defualt">
            {notfounddata.data.attributes.GoBackLink.label}
          </a>
        </div>
      </section>
    </>
  );
}
