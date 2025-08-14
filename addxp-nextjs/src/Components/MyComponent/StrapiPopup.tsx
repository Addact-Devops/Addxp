import React, { ReactNode, useState, useEffect } from "react";
import strapi from "../../Configurations/Config.json";
import { usePathname } from "next/navigation";
import { collection, doc, setDoc } from "firebase/firestore";
import firebase from "@/Configurations/firebase";

interface MyComponentProps {
  children: ReactNode;
}

const StrapiPopup: React.FC<MyComponentProps> = ({ children }) => {
  const [UserEmail, setUserEmail] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const cooldownPeriod = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    const lastPopupTime = localStorage.getItem("lastPopupTime");
    if (lastPopupTime) {
      const timeElapsed = Date.now() - parseInt(lastPopupTime, 10);
      if (timeElapsed < cooldownPeriod) {
        return;
      }
    }
  }, []);

  const handleMouseLeave = (event: MouseEvent) => {
    if (event.clientY <= 0) {
      setTimeout(() => {
        const lastPopupTime = localStorage.getItem("lastPopupTime");
        if (!lastPopupTime || Date.now() - parseInt(lastPopupTime, 10) >= cooldownPeriod) {
          setShowAlert(true);
        }
      }, 100);
    }
  };

  useEffect(() => {
    const handleMouseLeaveEvent = (event: MouseEvent) => handleMouseLeave(event);

    document.addEventListener("mouseleave", handleMouseLeaveEvent);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeaveEvent);
    };
  }, []);

  const handleAlertClose = () => {
    localStorage.setItem("lastPopupTime", Date.now().toString());
    setShowAlert(false);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const pathname = usePathname();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;

    if (!UserEmail.trim()) {
      setError("Please enter your business email");
      isValid = false;
    } else if (!isValidEmail(UserEmail.trim())) {
      setError("Please enter a valid email address");
      isValid = false;
    } else {
      setError("");
    }

    if (isValid) {
      try {
        const graphqlResponse = await fetch(strapi.strapigraphql, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
       mutation createPopupdata($UserEmail:String!,$PageName:String!){
        createPopupDatas(data: { UserEmail: $UserEmail,PageName:$PageName}){
          data{
            id
            attributes{
              UserEmail
              PageName
            }
          }
        }
      }
       `,
            variables: {
              UserEmail: UserEmail,
              PageName: pathname,
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
                          We have got the following details from Strapi Pop up  
                          <br></p>
                          <p><b>Email Address:</b> ${UserEmail}</p>
                          <p><b>Page Name:</b> ${pathname === "/" ? "Home" : pathname?.split("/")[1]}</p>
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
            to: [UserEmail],
            message: {
              subject: "Thank You for Your Inquiry",
              text: "Thank you for your inquiry. We will get back to you shortly.",
              html: `<html>
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
                          <p>Dear ${UserEmail},</p>
                          <p>Thank you for your inquiry.</p>
                          <p>We have received your message and will get back to you shortly.</p>
                          <p>Here is the information you submitted:</p>
                          <table>
                              <tr><th>Email</th><td>${UserEmail}</td></tr>
                              <tr><th>Page Title</th><td>${pathname}</td></tr>
                          </table>
                          <br/>
                          <span>Regards,</span><br/>
                          <span>Team Addxp</span>
                      </body>
                  </html>`,
            },
          }),
        });

        if (graphqlResponse.ok) {
          localStorage.setItem("lastPopupTime", Date.now().toString());
          setShowAlert(false);
        }
      } catch (error) {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      {showAlert && (
        <div className="popup strapi-popup popup-wrapper">
          <div className="popup-content">
            <span className="close" onClick={handleAlertClose}>
              &times;
            </span>
            <h2 className="pop-up-title">
              Boost Your
              <br /> Strapi Site <br />
              with AI
            </h2>
            <form id="emailForm" className="pop-up-form-wrapper" onSubmit={handleFormSubmit}>
              <input type="hidden" name="pageTitle" value="Popup CTA" />
              <input type="hidden" name="date" />
              <input type="hidden" name="time" />
              <input type="text" name="bname" id="bname" style={{ display: "none" }} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="pop-up-input-box w-50"
                onChange={(e) => {
                  const email = e.target.value;
                  setUserEmail(email);
                  setError(
                    email.trim() === ""
                      ? "Please enter your business email"
                      : !isValidEmail(email)
                      ? "Please enter a valid email address"
                      : ""
                  );
                }}
              />
              <button type="submit" className="btn-radius">
                Get a Free Consultation
              </button>
            </form>
            {error ? (
              <div
                className="EmailValidation"
                style={{ margin: 0, paddingBottom: "15px", marginTop: "-25px", fontSize: "14px" }}
              >
                {error}
              </div>
            ) : null}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default StrapiPopup;
