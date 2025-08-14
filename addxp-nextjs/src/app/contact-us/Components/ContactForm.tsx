"use client";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";
import { collection, doc, setDoc } from "firebase/firestore";

import { usePathname, useRouter } from "next/navigation";
import firebase from "@/Configurations/firebase";

export default function ContactForm(data: any) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [id, setId] = useState("");
  const [sectionClass, setSectionClass] = useState("contact-form light-gray-bg");
  const pathname = usePathname();
  const [fullNameError, setFullNameError] = useState("");
  const [businessEmailError, setBusinessEmailError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  // const [agreementChecked, setAgreementChecked] = useState(false);
  // const [agreementError, setAgreementError] = useState("");
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const datetime =
    mm + "/" + dd + "/" + yyyy + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  async function fetchdata() {
    try {
      if (pathname == "/") {
        setId("connect-now");
        setSectionClass("contact-form");
      }
      if (pathname == "/contact-us") {
        setId("contact-page-form");
      }
      if (pathname == "/contentstack-cms-services") {
        setId("connect-now");
      }
      if (pathname == "/contentful-cms-services") {
        setId("connect-now");
      }
      if (pathname == "/umbraco-development-service") {
        setId("connect-now");
      }
      if (pathname == "/strapi-cms-services") {
        setId("connect-now");
      }
      if (pathname == "/kentico-development-service") {
        setId("connect-now");
      }
      if (pathname == "/kontent-ai-development-service") {
        setId("connect-now");
      }
      if (pathname == "/virto-commerce-services") {
        setId("connect-now");
      }
      if (pathname == "/strapi-cms-development-service") {
        setId("strapi-cms-page-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-plugin-development-service") {
        setId("strapi-plugin-development-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-upgrade-service") {
        setId("strapi-upgrade-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-migration-service") {
        setId("strapi-migration-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-cms-consultation-service") {
        setId("connect-now");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-support-maintenance-service") {
        setId("strapi-maintenance-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/strapi-ui-design-service") {
        setId("strapi-ui-ux-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/hire-strapi-developer") {
        setId("strapi-resources-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/hire-umbraco-developer") {
        setId("umbraco-resources-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/hire-kentico-developer") {
        setId("kentico-resources-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/hire-asp-net-developer") {
        setId("asp-net-resources-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/hire-sitecore-xm-cloud-developer") {
        setId("xmc-resources-form");
        setSectionClass("contact-form");
      }
      if (pathname == "/commerce-experience") {
        setSectionClass("contact-form");
        setId("connect-now");
      }
      if (pathname == "/content-experience") {
        setSectionClass("contact-form");
        setId("connect-now");
      }
      if (pathname == "/user-experience") {
        setSectionClass("contact-form");
        setId("connect-now");
      }
      if (pathname == "/sitecore-xm-cloud-service") {
        setId("connect-now");
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    // Validation checks
    if (!fullName.trim()) {
      setFullNameError("Please enter your full name");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
      setFullNameError("Please enter a valid full name (only characters allowed)");
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!businessEmail.trim()) {
      setBusinessEmailError("Please enter your business email");
      isValid = false;
    } else if (!isValidEmail(businessEmail.trim())) {
      setBusinessEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setBusinessEmailError("");
    }

    if (!companyName.trim()) {
      setCompanyNameError("Please enter your company name");
      isValid = false;
    } else {
      setCompanyNameError("");
    }

    // if (!agreementChecked) {
    //    setAgreementError('Please agree to the terms and conditions');
    //    isValid = false;
    // } else {
    //    setAgreementError('');
    // }

    if (isValid) {
      try {
        const graphqlResponse = await fetch(strapi.strapigraphql, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            mutation createContactFormData($FullName: String!, $BusinessEmail: String!, $CompanyName: String!, $Requirement: String!) {
              createContactFormData(data: { FullName: $FullName, BusinessEmail: $BusinessEmail, CompanyName: $CompanyName, Requirement: $Requirement }) {
                data {
                  id
                  attributes {
                    FullName
                    BusinessEmail
                    CompanyName
                    Requirement
                  }
                }
              }
            }
          `,
            variables: {
              FullName: fullName,
              BusinessEmail: businessEmail,
              CompanyName: companyName,
              Requirement: requirement,
            },
          }),
        });

        const graphqlData = await graphqlResponse.json();
        if (!graphqlResponse.ok) {
          throw new Error("Failed to submit data to GraphQL");
        }

        const emailResponse = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: [process.env.NEXT_PUBLIC_EMAIL_TO],
            cc: [""],
            bcc: [process.env.NEXT_PUBLIC_EMAIL_BCC],
            message: {
              subject: `Addxp - Business Inquiry : ${pathname === "/" ? "Home" : pathname?.split("/")[1]}`,
              text: "Welcome to Addxp",
              html: `
                     <html>
                        <head></head>
                        <body>
                           <p>Hello Team,<br>We have received the following details from a Contact Us Inquiry:</p>
                           <p><b>Full Name:</b> ${fullName}</p>
                           <p><b>Email:</b> ${businessEmail}</p>
                           <p><b>Company Name:</b> ${companyName}</p>
                           <p><b>Requirements:</b> ${requirement}</p>
                           <br>
                           <p>Thank you & Regards,<br><b>Addxp</b></p>
                        </body>
                     </html>`,
            },
          }),
        });

        const thankYouResponse = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: [businessEmail],
            message: {
              subject: "Thank You for Your Inquiry",
              text: "Thank you for your inquiry. We will get back to you shortly.",
              html: `
                        <html>
                            <head>
                                <title>Thank You for Your Inquiry</title>
                                <style>
                                    table {
                                        width: 100%;
                                        border-collapse: collapse;
                                        background-color: #FFF1F0;
                                        border: 1px solid #ddd;
                                        border-radius: 20px;
                                    }
                                    th {
                                        border-right: 1px solid #ddd;
                                        text-align: left;
                                    }
                                    th, td {
                                        padding: 15px;
                                    }
                                    td {
                                        text-align: left;
                                    }

                                    img{
                                      width: 100%;
                                    }
                                </style>
                            </head>
                            <body>
                                <img src="https://do7q3d8g8n6kn.cloudfront.net/thank_you_email_header_d90a167a92.png" alt="Addxp Banner">

                                <p style="margin-top: 40px;">Dear ${fullName},</p>
                                <p>Thank you for your inquiry.</p>
                                <p>We have received your message and will get back to you shortly.</p>
                                <p>Here is the information you submitted:</p>
                                <table>
                                    <tr><th>Full Name</th><td>${fullName}</td></tr>
                                    <tr><th>Email</th><td>${businessEmail}</td></tr>
                                    <tr><th>Company Name</th><td>${companyName}</td></tr>
                                    <tr><th>Requirements</th><td>${requirement}</td></tr>
                                </table>
                                <br/>
                                <span>Regards,</span><br/>
                                <span>Team Addxp</span>
                            </body>
                        </html>`,
            },
          }),
        });

        router.push("/thank-you");
      } catch (error) {
        alert("Error occurred while sending the email.");
      }
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|ai|co\.uk|in)$/i;
    return emailRegex.test(email);
  };

  return (
    <section className={sectionClass} id={id}>
      <div className="container">
        <div className="contatc-main">
          <div className="contact-left">
            {data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop == null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <img
                src={
                  data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes.url
                }
                loading="lazy"
                alt={
                  data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes
                    .alternativeText
                }
              />
            )}
            {data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageMobile == null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <img
                src={
                  data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageMobile.data.attributes.url
                }
                loading="lazy"
                alt={
                  data.data.data.attributes.contact_form.data.attributes.Left.ImageData.ImageMobile.data.attributes
                    .alternativeText
                }
                className="contact-mobile"
              />
            )}

            <div className="caption">
              <div className="type5">{data.data.data.attributes.contact_form.data.attributes.Left.Details.Title}</div>
              <RichText
                htmlContent={data.data.data.attributes.contact_form.data.attributes.Left.Details.Description}
              ></RichText>
            </div>
          </div>
          <div className="contact-right">
            <h2 className="sub_title_5">{data.data.data.attributes.contact_form.data.attributes.Right.Title}</h2>
            <RichText htmlContent={data.data.data.attributes.contact_form.data.attributes.Right.Description}></RichText>
            <form id="ContactUsData" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="UserName"
                      placeholder="Full Name"
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <label htmlFor="UserName">Full Name*</label>
                  </div>
                  {fullNameError ? <div className="validation">{fullNameError}</div> : null}
                </div>

                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="UserEmailID"
                      placeholder="Business Email"
                      onChange={(e) => setBusinessEmail(e.target.value)}
                    />
                    <label htmlFor="UserEmailID">Business Email*</label>
                  </div>
                  {businessEmailError ? <div className="validation">{businessEmailError}</div> : null}
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="UserCompanyName"
                    placeholder="Company Name"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <label htmlFor="UserCompanyName">Company Name*</label>
                </div>
                {companyNameError ? <div className="validation">{companyNameError}</div> : null}
              </div>

              <div className="col-12">
                <div className="form-floating form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="UserRequirements"
                    placeholder="Company Name"
                    onChange={(e) => setRequirement(e.target.value)}
                  />
                  <label htmlFor="UserRequirements">Describe Your Requirements (Optional)</label>
                </div>
              </div>

              {/* <div className='form-check d-flex'>
                        <input
                           className='form-check-input'
                           type='checkbox'
                           aria-label="termsconditioncheckbox"
                           value=''
                           id='form2Example34'
                           checked={agreementChecked}
                           onChange={(e) => setAgreementChecked(e.target.checked)}
                        />
                        <label className='form-check-label' htmlFor='form2Example34'>
                           I agree to receive future communications from Addxp, in accordance with the{" "}
                           <a href='/privacy-policy'>Privacy Policy</a> & <a href='/terms-conditions'>Terms Of Use</a>.
                        </label>
                     </div>
                     {agreementError ? <div className='validation'>{agreementError}</div> : null} */}

              <input type="reset" id="reset" name="reset" className="d-none" />
              <button
                type="submit"
                id="submit1"
                data-form-name="FooterContactUsData"
                className="btn btn-defualt btn-block abc"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
