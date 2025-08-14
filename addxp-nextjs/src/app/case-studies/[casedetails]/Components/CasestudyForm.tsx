"use client";
import { useState } from "react";
import strapi from "../../../../Configurations/Config.json";
import { useRouter } from "next/navigation";
import firebase from "@/Configurations/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export default function DownloadForm({ data, title }: any) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailValidation, setemailValidation] = useState("");
  const [numbervalidation, setnumbervalidation] = useState("");
  const [nameValidation, setnameValidation] = useState("");

  // const pdfUrl = {title}

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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!IsEmail(businessEmail)) {
      // alert("Please enter valid email.")
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
      const response = await fetch(strapi.strapigraphql, {
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

      const fireStore = await firebase();
      const emailCollection = collection(fireStore, "CaseStudiesForm");
      const timestamp: string = Date.now().toString();
      const document = doc(fireStore, `CaseStudiesForm/${timestamp}`);

      const data = {
        Name: fullName,
        EmailID: businessEmail,
        PhoneNumber: parseInt(phoneNumber),
        Datetime: datetime,
      };

      const document2 = doc(fireStore, `mail/${timestamp}`);

      const data2 = {
        to: [process.env.NEXT_PUBLIC_EMAIL_TO],
        cc: [process.env.NEXT_PUBLIC_EMAIL_CC],
        bcc: [process.env.NEXT_PUBLIC_EMAIL_BCC],
        message: {
          text: "Welcome to the addxp",
          html: `<html>
          <head>
          </head>
          <body>
              <p>Hello Team,
              <br>
              We have got the following details from case studies form
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
      };

      await setDoc(document, data);
      await setDoc(document2, data2);
      router.push(title);
    } catch (error) {
      alert("Something Wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          id="CSFullname"
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
          id="CSEmail"
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
          id="CSNumber"
          className="inputText"
          placeholder="Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <span className="floating-label">Phone Number (Optional)</span>
        {numbervalidation ? <div className="validation">{numbervalidation}</div> : null}
      </div>
      <button type="submit" id="CSsubmit" data-form-name="CaseStudiesForm" className="btn btn-defualt">
        Download
      </button>
    </form>
  );
}
