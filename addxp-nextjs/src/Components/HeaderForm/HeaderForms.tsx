"use client";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

import { usePathname, useRouter } from "next/navigation";
import firebase from "@/Configurations/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { hideForm } from "@/store/formActions";

export default function HeaderForms(props: any) {
  const router = useRouter();
  const formState = useSelector((state: any) => state.form.isOpen);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const pathname = usePathname();
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  // const [checked, setchecked] = useState(false);
  const [nameValidation, setnameValidation] = useState("");
  const [emailValidation, setemailValidation] = useState("");
  const [companyValidation, setcompanyValidation] = useState("");
  // const [checkedValidation, setcheckedValidation] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const datetime =
    mm + "/" + dd + "/" + yyyy + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const toggleForm = () => {
    if (isOpen === true) {
      dispatch(hideForm());
    }
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  useEffect(() => {
    document.body.classList.toggle("show_form", isOpen);
  }, [isOpen]);

  function IsEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|io|ai|co\.uk|in)$/i.test(email);
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let isValid = true;
    if (!businessEmail.trim()) {
      setemailValidation("Please enter your business email");
      isValid = false;
    } else if (!IsEmail(businessEmail.trim())) {
      setemailValidation("Please enter a valid business email");
      isValid = false;
    } else {
      setemailValidation("");
    }

    if (!fullName.trim()) {
      setnameValidation("Please enter your full name");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
      setnameValidation("Please enter a valid full name (only characters allowed)");
      isValid = false;
    } else {
      setnameValidation("");
    }

    if (!companyName.trim()) {
      setcompanyValidation("Please enter valid Company name.");
      isValid = false;
    } else setcompanyValidation("");

    // if (!checked) {
    //    setcheckedValidation("Please enter check this box to continue.");
    //    isValid = false;
    // } else setcheckedValidation("");

    if (isValid) {
      try {
        const graphqlResponse = await fetch(strapi.strapigraphql, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
          mutation createContactFormData($FullName:String!,$BusinessEmail:String!,$CompanyName:String!,$Requirement:String!){
            createContactFormData(data: { FullName: $FullName,BusinessEmail:$BusinessEmail,CompanyName:$CompanyName,Requirement:$Requirement}) {
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

                                <p>Dear ${fullName},</p>
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
        alert(error);
      }
    }
  };

  useEffect(() => {
    if (formState !== isOpen) {
      setIsOpen(formState);
    }
  }, [formState]);

  return (
    <div className="form-icon">
      <span className="icon-rocket" onClick={toggleForm}>
        <img
          src="https://do7q3d8g8n6kn.cloudfront.net/rocket-icon.svg"
          alt="rocket-icon"
          className="icon"
          loading="lazy"
        />
        <img
          src="https://do7q3d8g8n6kn.cloudfront.net/plane-line.svg"
          alt="plane-line-svg"
          className="icon-hover"
          loading="lazy"
        />
      </span>
      <div className="slide-form">
        <span className="slide-form-close" onClick={toggleForm}>
          Close
          <img
            src={"https://do7q3d8g8n6kn.cloudfront.net/slide_close_3b3e805087.svg"}
            alt="slide-close"
            loading="lazy"
          />
        </span>
        <h2 className="sub_title_5">{props.data.Title}</h2>
        <RichText htmlContent={props.data.Description}></RichText>
        <form id="HeaderContactUs" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-floating form-group">
                <input
                  type="text"
                  className="form-control"
                  id="HUserName"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="HUserName">Full Name*</label>
              </div>
              {nameValidation ? <div className="validation">{nameValidation}</div> : null}
            </div>

            <div className="col">
              <div className="form-floating form-group">
                <input
                  type="email"
                  className="form-control"
                  id="HUserEmailID"
                  placeholder="Business Email"
                  value={businessEmail}
                  onChange={(e) => {
                    setBusinessEmail(e.target.value);
                    if (!IsEmail(e.target.value.trim())) {
                      setemailValidation("Please enter a valid business email");
                    } else {
                      setemailValidation("");
                    }
                  }}
                />
                <label htmlFor="HUserEmailID">Business Email*</label>
              </div>
              {emailValidation ? <div className="validation">{emailValidation}</div> : null}
            </div>

            <div className="col-12">
              <div className="form-floating form-group">
                <input
                  type="text"
                  className="form-control"
                  id="HUserCompanyName"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label htmlFor="HUserCompanyName">Company Name*</label>
              </div>
              {companyValidation ? <div className="validation">{companyValidation}</div> : null}
            </div>

            <div className="col-12">
              <div className="form-floating form-group">
                <input
                  type="text"
                  className="form-control"
                  id="HUserRequirements"
                  placeholder="Company Name"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                />
                <label htmlFor="HUserRequirements">Describe Your Requirements (Optional)</label>
              </div>

              {/* <div className='form-check d-flex'>
                        <input
                           className='form-check-input'
                           type='checkbox'
                           aria-label="termsconditioncheckbox"
                           checked={checked}
                           onChange={(e) => setchecked(e.target.checked)}
                        />
                        <label className='form-check-label' htmlFor='form2Example33'>
                           I agree to receive future communications from Addxp, in accordance with the
                           <a href='/privacy-policy'> Privacy Policy</a> & <a href='/terms-conditions'>Terms Of Use</a>
                        </label>
                     </div>
                     {checkedValidation ? <div className='validation'>{checkedValidation}</div> : null} */}
            </div>

            <button
              type="submit"
              id="submit"
              data-form-name="HeaderContactUsData"
              className="btn btn-defualt btn-block"
              // disabled={!IsEmail(businessEmail) || !fullName || !companyName || !requirement }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
