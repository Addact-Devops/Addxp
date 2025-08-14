"use client";
import { useState } from "react";
import strapi from "../../../Configurations/Config.json";
import { usePathname, useRouter } from "next/navigation";
import firebase from "@/Configurations/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function DownloadForm(data: any) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const pathname = usePathname();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValidation, setemailValidation] = useState("");
  const [numbervalidation, setnumbervalidation] = useState("");
  const [nameValidation, setnameValidation] = useState("");

  const pdfUrl = "/pdf/Brand Guidelines - Addxp Technologies.pdf";

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const datetime =
    mm + "/" + dd + "/" + yyyy + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  function IsEmail(email: string) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  function validationPhonenum(call: string) {
    var regex = /^\d{10}$/;
    if (!regex.test(call)) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!IsEmail(businessEmail)) {
      setemailValidation("Please enter valid email");
      return;
    } else setemailValidation("");

    if (!fullName) {
      setnameValidation("Please enter your name.");
      return;
    } else setnameValidation("");

    if (phoneNumber) {
      if (!validationPhonenum(phoneNumber)) {
        setnumbervalidation("Please enter valid Phone number.");
        return;
      } else setnumbervalidation("");
    }

    try {
      const graphqlResponse = await fetch(strapi.strapigraphql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                mutation createDownloadFormData($FullName:String!,$BusinessEmail:String!,$PhoneNumber:Long!){
                  createDownloadFormData(data: { FullName: $FullName,BusinessEmail:$BusinessEmail,PhoneNumber:$PhoneNumber}) {
                    data{
                      id
                      attributes{
                        FullName
                        BusinessEmail
                        PhoneNumber
                      }
                    }
                  }
                }
                `,
          variables: {
            FullName: fullName,
            BusinessEmail: businessEmail,
            PhoneNumber: parseInt(phoneNumber),
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
            html: `<html>
                        <head>
                        </head>
                        <body>
                           <p>Hello Team,
                           <br>
                           We have got the following details from Brand Guidelines form
                           <br></p>
                           <p><b>Full Name:</b> ${fullName}</p>
                           <p><b>Business Email:</b> ${businessEmail}</p>
                           <p><b>Phone Number:</b> ${parseInt(phoneNumber) ?? "Not Provided"}</p>
                           <br>
                           <p>Thank you & Regards,
                           <br>
                           <b>Addxp</b></p>
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
                                        background-color: #f9f9f9;
                                    }
                                    table, th, td {
                                        border: 1px solid #ddd;
                                        padding: 8px;
                                    }
                                    th {
                                        background-color: #f2f2f2;
                                        text-align: left;
                                    }
                                    td {
                                        text-align: left;
                                    }
                                </style>
                            </head>
                            <body>
                                <p>Dear ${fullName},</p>
                                <p>Thank you for your inquiry.</p>
                                <p>We have received your message and will get back to you shortly.</p>
                                <p>Here is the information you submitted:</p>
                                <table>
                                    <tr><th>Full Name</th><td>${fullName}</td></tr>
                                    <tr><th>Email</th><td>${businessEmail}</td></tr>
                                    <tr><th>Phone Number</th><td> ${parseInt(phoneNumber) ?? "Not Provided"}</td></tr>
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
  };

  return (
    <section className="brand-tagline">
      <div className="container">
        <div className="brand-tagline_bottom">
          <div className="brand-tag-left">
            {data.data.datadownload.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data ==
            null ? (
              <img
                src={"https://do7q3d8g8n6kn.cloudfront.net/Addxp_Place_holder_4333d94906.png"}
                alt="Addxp_Place_holder_4333d94906.png"
                loading="lazy"
              />
            ) : (
              <img
                src={
                  data.data.datadownload.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data
                    .attributes.url
                }
                loading="lazy"
                alt={
                  data.data.datadownload.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data
                    .attributes.alternativeText
                }
              />
            )}
            {data.data.datadownload.data.attributes.contact_form.data.attributes.Left.Details.Title == null ? null : (
              <h2 className="sub_title_5">
                {data.data.datadownload.data.attributes.contact_form.data.attributes.Left.Details.Title}
              </h2>
            )}
          </div>
          <div className="brand-tag-right">
            <div className="brand-right">
              <h2 className="sub_title_5">
                {data.data.datadownload.data.attributes.contact_form.data.attributes.Right.Title}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="BFullname"
                    className="inputText"
                    placeholder="Full Name*"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <span className="floating-label">Full Name*</span>
                  {nameValidation ? <div className="validation">{nameValidation}</div> : null}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="BEmail"
                    className="inputText"
                    placeholder="Business Email*"
                    required
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                  <span className="floating-label">Business Email*</span>
                  {emailValidation ? <div className="validation">{emailValidation}</div> : null}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    id="BNumber"
                    className="inputText"
                    placeholder="Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <span className="floating-label">Phone Number (Optional)</span>
                  {numbervalidation ? <div className="validation">{numbervalidation}</div> : null}
                </div>

                <button
                  type="submit"
                  id="Bsubmit"
                  data-form-name="BrandguidelinedownloadForm"
                  className="btn btn-defualt"
                  // disabled={!IsEmail(businessEmail) || !fullName || ! validationPhonenum(phoneNumber)}
                >
                  Download
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
