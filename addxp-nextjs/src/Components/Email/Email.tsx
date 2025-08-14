"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

import { useRouter } from "next/navigation";
import firebase from "@/Configurations/firebase";
import { collection, addDoc, Firestore, setDoc, doc } from "firebase/firestore";
export default function Email(data: any) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [searchText, setSearchText] = useState("");
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const datetime =
    mm + "/" + dd + "/" + yyyy + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  useEffect(() => {
    // setTimeout(() => {
    const elements = document.getElementsByClassName("consultaion-main banner-js");
    if (elements.length === 0) {
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const src = elements[i].getAttribute("data-img-src");
      if (src) {
        const elementWithStyle = elements[i] as HTMLElement;
        elementWithStyle.style.backgroundImage = `url(${src})`;
      }
    }
    // }, 1000);
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(strapi.strapigraphql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation createEmail($Email:String){
            createEmail(data: { Email: $Email}) {
              data {
                id
                attributes {
                  Email
                }
              }
            }
          }
          `,
          variables: {
            Email: searchText,
          },
        }),
      });

      const fireStore = await firebase();
      const emailCollection = collection(fireStore, "ConsultationFormData");
      const timestamp: string = Date.now().toString();
      const document = doc(fireStore, `ConsultationFormData/${timestamp}`);

      const data = {
        EmailID: searchText,
        Datetime: datetime,
      };

      const document2 = doc(fireStore, `mail/${timestamp}`);

      const data2 = {
        to: [process.env.NEXT_PUBLIC_EMAIL_TO],
        cc: [process.env.NEXT_PUBLIC_EMAIL_CC],
        bcc: [process.env.NEXT_PUBLIC_EMAIL_BCC],
        message: {
          // subject: document.title,
          text: "Welcome to the addxp",
          //html: 'Name: ' +`${UserName.val()}`+' <br>EmailID: '+`${UserEmailID.val()}`+'  <br>CompanyName: ' +`${UserCompanyName.val()}`+'  <br>Requirements: ' +`${UserRequirements.val()}`+'',
          html: `<html>
                <head>
                </head>
                <body>
                    <p>Hello Team,
                    <br>
                    We have got the Inquiry
                    <br></p>
                    <p><b>Email:</b> ${searchText}</p>
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

      // if (response.status == 200) {
      router.push("/thank-you");
      // }
    } catch (error) {
      // alert("Something Wrong");
      console.log({ error });
    }
  };

  function IsEmail(email: string) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <section className="consultaion-component">
      <div className="container">
        <div
          className="consultaion-main banner-js"
          style={{
            background: `url(${data.data.data.attributes.form_title.data.attributes.Form.Images.data.attributes.url}) no-repeat center !important`,
          }}
          data-img-src={data.data.data.attributes.form_title.data.attributes.Form.Images.data.attributes.url}
        >
          <div className="consultaion-desc">
            <h2 className="sub_title_5">{data.data.data.attributes.form_title.data.attributes.Form.Title}</h2>
            <RichText htmlContent={data.data.data.attributes.form_title.data.attributes.Form.Description}></RichText>
            <div className="search-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  id="CTAEmailID"
                  placeholder="Enter Your Business Email"
                  name="Email"
                  //validationMessage="Please enter Business Emaiil ID"
                  //autocomplete="off"
                  //value={formData.fieldName}
                  onChange={(e) => setSearchText(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  id="BtnSubscribe"
                  data-form-name="ConsultationFormData"
                  className="btn btn-primary btn-block submit-btn"
                  disabled={!IsEmail(searchText)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
