"use client";

import strapi from "../../../Configurations/Config.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RichText from "@/Components/Common";
import firebase from "@/Configurations/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import createS3Instance from "@/Configurations/aws";
import crossIcon from "../../../assets/src/images/resume-cross-icon.svg";
import { usePathname } from "next/navigation";
export default function UploadForm(data: any) {
  const router = useRouter();

  const [file, setFile] = useState<File>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [HyperLink, setHyperLink] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [id, setId] = useState("");
  const pathname = usePathname();
  const [emailValidation, setemailValidation] = useState("");
  const [numbervalidation, setnumbervalidation] = useState("");
  const [fileValidation, setfileValidation] = useState("");
  const [fNameValidation, setFNameValidation] = useState("");
  const [lNameValidation, setLNameValidation] = useState("");

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const datetime =
    mm + "/" + dd + "/" + yyyy + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  function IsEmail(email: any) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validationPhonenum(call: string) {
    var regex = /^\d{10}$/;
    if (!regex.test(call)) {
      return false;
    } else {
      return true;
    }
  }

  async function fetchdata() {
    try {
      if (pathname == "/ui-ux-designer") {
        setId("career-details-form");
      }
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let isValid = true;

    // **Validation Checks**
    if (!firstName.trim()) {
      setFNameValidation("Please enter your full name");
      isValid = false;
    }

    if (!lastName.trim()) {
      setLNameValidation("Please enter your last name");
      isValid = false;
    }

    if (!IsEmail(email.trim())) {
      setemailValidation("Please enter a valid email");
      isValid = false;
    }

    if (!validationPhonenum(phoneNumber.trim())) {
      setnumbervalidation("Please enter a valid phone number.");
      isValid = false;
    }

    if (!file) {
      setfileValidation("Please upload a file");
      isValid = false;
    }

    if (!isValid) return; // 🚀 Stop execution if validation fails

    try {
      // **Fix for 'fileName' possibly being 'undefined'**
      let fileExtension = file?.name?.substr(file?.name.lastIndexOf("."))?.toLowerCase() ?? "";
      let fileName = file?.name ? file.name.replace(fileExtension, "") : ""; // ✅ Safe from 'undefined' issues

      let d = new Date().toLocaleDateString("en-GB").replace(/\//g, "");
      let t = new Date().toLocaleTimeString().replace(/[^0-9]/g, "");
      const key = `FileUpload/${fileName.replace(/[^\w.-]/g, "-")}-${d}${t}${fileExtension}`;
      fileExtension = fileExtension.replace(".", "");

      const bucketName = "addxp-strapi";

      // **S3 Upload Parameters**
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: file,
        ACL: "public-read",
      };

      const s3 = createS3Instance();

      // **GraphQL API Request**
      const graphqlResponse = await fetch(strapi.strapigraphql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation createUploadForm($FirstName:String!,$LastName:String!,$Email:String!,$PhoneNumber:Long!,$HyperLink:String!,$ResumePath:String!){
              createUploadForm(data: { FirstName: $FirstName, LastName:$LastName, Email:$Email, PhoneNumber:$PhoneNumber, HyperLink:$HyperLink, ResumePath:$ResumePath }) {
                data {
                  id
                  attributes {
                    FirstName
                    LastName
                    Email
                    PhoneNumber
                    HyperLink
                    ResumePath
                  }
                }
              }
            }`,
          variables: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: parseInt(phoneNumber),
            HyperLink: HyperLink,
            ResumePath:
              file?.name.endsWith(".pdf") || file?.name.endsWith(".docx")
                ? file.name
                : alert("Please select only PDF or DOCX"),
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
          type: "inquiry",
          to: [process.env.NEXT_PUBLIC_EMAIL_HR_TO],
          cc: [""],
          bcc: [process.env.NEXT_PUBLIC_EMAIL_BCC],
          message: {
            subject: `Addxp - Business Inquiry : ${pathname === "/" ? "Home" : pathname?.split("/")[1]}`,
            text: "Welcome to Addxp",
            html: `
                   <html>
                      <head></head>
                      <body>
                         <p>Hello Team,</p>
                         <p>We have received the following details:</p>
                         <p><b>Full Name:</b> ${firstName} ${lastName}</p>
                         <p><b>Email:</b> ${email}</p>
                         <p><b>Phone Number:</b> ${phoneNumber}</p>
                         <p><b>Portfolio Link:</b> ${HyperLink}</p>
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
          type: "thank-you",
          to: [email],
          message: {
            subject: "Thank you for applying",
            text: "We have received your message and will get back to you shortly.",
            html: `
                       <html>
                          <head>
                              <title>Thank you for applying</title>
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
                              <p>Dear ${firstName} ${lastName},</p>
                              <p>Thank you for applying.</p>
                              <p>We have received your message and will get back to you shortly.</p>
                              <p>Here is the information you submitted:</p>
                              <table>
                                  <tr><th>Full Name</th><td>${firstName} ${lastName}</td></tr>
                                  <tr><th>Email</th><td>${email}</td></tr>
                                  <tr><th>Phone NUmber</th><td> ${phoneNumber}</td></tr>
                                  <tr><th>Portfolio Link</th><td> ${HyperLink}</td></tr>
                              </table>
                              <br/>
                              <span>Regards,</span><br/>
                              <span>Team Addxp</span>
                          </body>
                      </html>`,
          },
        }),
      });
      // **Redirect after successful submission**
      router.push("/thank-you-career");
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="contact-form career-form" id={id}>
      <div className="container">
        <div className="contatc-main">
          <div className="contact-left">
            <img
              src={data.data.data.attributes.upload_form_title.data.attributes.Left.Image.data.attributes.url}
              loading="lazy"
              alt={
                data.data.data.attributes.upload_form_title.data.attributes.Left.Image.data.attributes.alternativeText
              }
            />
            <div className="caption">
              <div className="type5">{data.data.data.attributes.upload_form_title.data.attributes.Left.Title}</div>
              <RichText
                htmlContent={data.data.data.attributes.upload_form_title.data.attributes.Left.Description}
              ></RichText>
            </div>
          </div>
          <div className="contact-right">
            <h2 className="sub_title_5">
              {data.data.data.attributes.upload_form_title.data.attributes.RightHead.Title}
            </h2>
            <RichText
              htmlContent={data.data.data.attributes.upload_form_title.data.attributes.RightHead.Description}
            ></RichText>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="career-top" id="UploadBox">
                <img
                  src={data.data.data.attributes.upload_form_title.data.attributes.Right.Image.data.attributes.url}
                  loading="lazy"
                  alt={
                    data.data.data.attributes.upload_form_title.data.attributes.Right.Image.data.attributes
                      .alternativeText
                  }
                />
                <div className="career-figcaption">
                  <div className="career-fig-left">
                    <h3 className="large">{data.data.data.attributes.upload_form_title.data.attributes.Right.Title}</h3>
                    <RichText
                      htmlContent={data.data.data.attributes.upload_form_title.data.attributes.Right.Description}
                    ></RichText>
                  </div>
                  <div className="career-fig-right">
                    <div className="upload-btn-wrapper">
                      <button type="button" id="resumeBtn" className="btn">
                        {file?.name ? (
                          <>
                            <p>{file.name}</p>
                            <img
                              className="cross-btn-career"
                              src={crossIcon.src}
                              alt="Remove File"
                              onClick={() => {
                                setFile(undefined);
                                setResumePath("");
                                setfileValidation("Please upload a file");
                                (document.getElementById("resumeInput") as HTMLInputElement).value = "";
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </>
                        ) : (
                          <p>Upload Resume</p>
                        )}
                      </button>
                      <input
                        id="resumeInput"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const uploadedFile = e.target.files[0];

                            if (uploadedFile.size > 1 * 1024 * 1024) {
                              alert("File with maximum size of 1MB is allowed");
                              e.target.value = "";
                              return;
                            }

                            const fileExtension = uploadedFile.name.split(".").pop()?.toLowerCase();
                            if (!["pdf", "doc", "docx"].includes(fileExtension || "")) {
                              alert("Only PDF or Word files are allowed to upload");
                              e.target.value = "";
                              return;
                            }

                            setFile(uploadedFile);
                            setResumePath(e.target.value);
                            setfileValidation("");
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {fileValidation && <div className="validation">{fileValidation}</div>}

              <div className="row">
                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="CandidateFName"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFNameValidation(e.target.value.trim() ? "" : "Please enter your full name");
                      }}
                    />
                    <label htmlFor="CandidateFName">First Name*</label>
                  </div>
                  {fNameValidation && <div className="validation">{fNameValidation}</div>}
                </div>
                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="CandidateLName"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLNameValidation(e.target.value.trim() ? "" : "Please enter your last name");
                      }}
                    />
                    <label htmlFor="CandidateLName">Last Name*</label>
                  </div>
                  {lNameValidation && <div className="validation">{lNameValidation}</div>}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="CandidateEmail"
                      placeholder="Email*"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setemailValidation(IsEmail(e.target.value.trim()) ? "" : "Please enter a valid email");
                      }}
                    />
                    <label htmlFor="CandidateEmail">Email*</label>
                  </div>
                  {emailValidation && <div className="validation">{emailValidation}</div>}
                </div>
                <div className="col">
                  <div className="form-floating form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="CandidatePhone"
                      placeholder="Phone Number*"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setnumbervalidation(
                          validationPhonenum(e.target.value.trim()) ? "" : "Please enter a valid phone number."
                        );
                      }}
                    />
                    <label htmlFor="CandidatePhone">Phone Number*</label>
                  </div>
                  {numbervalidation && <div className="validation">{numbervalidation}</div>}
                </div>
              </div>
              <div className="form-floating form-group">
                <input
                  type="text"
                  className="form-control"
                  id="CandidateHyperLink1"
                  placeholder="Hyperlink"
                  onChange={(e) => setHyperLink(e.target.value)}
                />
                <label htmlFor="CandidateHyperLink1">Hyperlink</label>
              </div>
              <button
                type="submit"
                id="CarreerApplicationSubmit"
                data-form-name="CareerFormData"
                className="btn btn-defualt btn-block"
                // disabled={!file || !validationPhonenum(phoneNumber) || !lastName || !firstName || !IsEmail(email) || !HyperLink}
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
