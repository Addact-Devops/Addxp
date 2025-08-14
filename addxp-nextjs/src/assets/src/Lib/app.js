// require("dotenv").config();

// dbUser = process.env.DATABASE_USER;
// dbPassword = process.env.DATABASE_PASSWORD;
// dbCluster = process.env.DATABASE_CLUSTER;

// $(document).ready(function () {
//   // Clear the checkbox value when the page is unloaded (on back navigation)
//   $(window).on("unload", function () {
//     if ($(":checkbox").length > 0) {
//       $(":checkbox").prop("checked", false);
//     }
//     if ($("form").length > 0) {
//       $("form").each(function (i) {
//         $('form input[type="text"]').val("");
//         $('form input[type="email"]').val("");
//         $('form input[type="phone"]').val("");
//       });
//     }
//   });
// });

// var box = document.getElementById("UploadBox");
// var file = document.getElementById("file-input");
// if (box !== null) {
//   box.addEventListener("click", function (e) {
//     file.click();
//   });
//   if ($("#file-input").length > 0) {
//     $("#file-input").change(function () {
//       if ($("#file-input")[0].files.length > 0) {
//         $("#resumeBtn").html("Reupload");
//       }
//     });
//   }
// }

// var fileUploadedURL = "";
// /* ============================ Firebase: Start ============================ */

// /* ===================== AddXp Config ===================== */
// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// var firestore = firebase.firestore();

// // Contact Us Form
// $("#submit").click(function (e) {
//   e.preventDefault();
//   submitForm(e);
// });

// $("#submit1").click(function (e) {
//   e.preventDefault();
//   submitForm(e);
// });

// function submitForm(e) {
//   var UserName = $("#UserName");
//   var UserEmailID = $("#UserEmailID");
//   var UserCompanyName = $("#UserCompanyName");
//   var UserRequirements = $("#UserRequirements");
//   var UserPrivacyPolicy = $("#form2Example34");
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   var yyyy = today.getFullYear();
//   var datetime =
//     mm +
//     "/" +
//     dd +
//     "/" +
//     yyyy +
//     " " +
//     today.getHours() +
//     ":" +
//     today.getMinutes() +
//     ":" +
//     today.getSeconds();
//   // Firebase Form Name
//   var strFormName = $(e.target).attr("data-form-name");

//   // Access Firebase Database Collection
//   const db = firestore.collection(strFormName);

//   if (strFormName == "HeaderContactUsData") {
//     UserName = $("#HUserName");
//     UserEmailID = $("#HUserEmailID");
//     UserCompanyName = $("#HUserCompanyName");
//     UserRequirements = $("#HUserRequirements");
//     UserPrivacyPolicy = $("#form2Example33");
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, "0");
//     var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//     var yyyy = today.getFullYear();
//     var datetime =
//       mm +
//       "/" +
//       dd +
//       "/" +
//       yyyy +
//       " " +
//       today.getHours() +
//       ":" +
//       today.getMinutes() +
//       ":" +
//       today.getSeconds();
//   }

//   var focusSet = false;
//   if (!UserName.val()) {
//     if (UserName.parent().next(".validation").length == 0) {
//       UserName.parent().after(
//         "<div class='validation'>Please enter User Name</div>"
//       );
//     }
//     e.preventDefault();
//     UserName.focus();
//     focusSet = true;
//   } else {
//     UserName.parent().next(".validation").remove();
//   }

//   if (UserName.val() && IsUsername(UserName.val()) == false) {
//     if (UserName.parent().next(".validation").length == 0) {
//       UserName.parent().after(
//         "<div class='validation'>Please enter Valid Name</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       UserName.focus();
//     }
//   } else if (UserName.val() != "") {
//     UserName.parent().next(".validation").remove();
//   }

//   if (!UserEmailID.val()) {
//     if (UserEmailID.parent().next(".validation").length == 0) {
//       UserEmailID.parent().after(
//         "<div class='validation'>Please enter Email Address</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       UserEmailID.focus();
//     }
//   } else {
//     UserEmailID.parent().next(".validation").remove();
//   }

//   if (UserEmailID.val() && IsEmail(UserEmailID.val()) == false) {
//     if (UserEmailID.parent().next(".validation").length == 0) {
//       UserEmailID.parent().after(
//         "<div class='validation'>Please enter Valid Email</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       UserEmailID.focus();
//     }
//   } else if (UserEmailID.val() != "") {
//     UserEmailID.parent().next(".validation").remove();
//   }

//   if (!UserCompanyName.val()) {
//     if (UserCompanyName.parent().next(".validation").length == 0) {
//       UserCompanyName.parent().after(
//         "<div class='validation'>Please enter Company Name</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       UserCompanyName.focus();
//     }
//   } else {
//     UserCompanyName.parent().next(".validation").remove();
//   }

//   if (!UserPrivacyPolicy.is(":checked")) {
//     if (UserPrivacyPolicy.parent().next(".validation").length == 0) {
//       UserPrivacyPolicy.parent().after(
//         "<div class='validation'>This field is required.</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       UserPrivacyPolicy.focus();
//     }
//   } else {
//     UserPrivacyPolicy.parent().next(".validation").remove();
//   }

//   if (
//     !UserName.val() ||
//     IsUsername(UserName.val()) == false ||
//     !UserEmailID.val() ||
//     !UserCompanyName.val() ||
//     !UserPrivacyPolicy.is(":checked") ||
//     IsEmail(UserEmailID.val()) == false
//   ) {
//     return false;
//   }
//   //Pushing Data to Firebase
//   db.doc()
//     .set({
//       Name: UserName.val(),
//       EmailID: UserEmailID.val(),
//       CompanyName: UserCompanyName.val(),
//       Requirements: UserRequirements.val(),
//       Datetime: datetime,
//     })
//     .then(() => {
//       const db = firestore.collection("mail");

//       //Pushing Data to Firebase
//       db.doc().set({
//         to: [process.env.to],
//         cc: [process.env.cc],
//         bcc: [process.env.bcc],
//         message: {
//           subject: document.title,
//           text: "Welcome to the addxp",
//           //html: 'Name: ' +`${UserName.val()}`+' <br>EmailID: '+`${UserEmailID.val()}`+'  <br>CompanyName: ' +`${UserCompanyName.val()}`+'  <br>Requirements: ' +`${UserRequirements.val()}`+'',
//           html: `<html>
//               <head>
//               </head>
//               <body>
//                   <p>Hello Team,
//                   <br>
//                   We have got the following details from Contact US Inquiry
//                   <br></p>
//                   <p><b>Full Name:</b> ${UserName.val()}</p>
//                   <p><b>Email:</b> ${UserEmailID.val()}</p>
//                   <p><b>Company Name:</b> ${UserCompanyName.val()}</p>
//                   <p><b>Requirements:</b> ${UserRequirements.val()}</p>
//                   <br>
//                   <p>Thank you & Regards,
//                   <br>
//                   <b>Addxp</b></p>
//               </body>
//           </html>`,
//         },
//       });
//       window.location = "thank-you";
//       document;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// //brandguidline form component
// $("#Bsubmit").click(function (e) {
//   e.preventDefault();

//   var FullName = $("#BFullname");
//   var BrandEmailID = $("#BEmail");
//   var PhoneNumber = $("#BNumber");
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   var yyyy = today.getFullYear();
//   var datetime =
//     mm +
//     "/" +
//     dd +
//     "/" +
//     yyyy +
//     " " +
//     today.getHours() +
//     ":" +
//     today.getMinutes() +
//     ":" +
//     today.getSeconds();
//   // var currentdate = new Date();
//   // var datetime =  currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear() + " @ " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
//   var pdfUrl = "./src/file/Brand Guidelines - Addxp Technologies.pdf";

//   var focusSet = false;
//   if (!FullName.val()) {
//     if (FullName.parent().next(".validation").length == 0) {
//       // only add if not added
//       FullName.parent().after(
//         "<div class='validation'>Please enter User Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     FullName.focus();
//     focusSet = true;
//   } else {
//     FullName.parent().next(".validation").remove(); // remove it
//   }

//   if (FullName.val() && IsUsername(FullName.val()) == false) {
//     if (FullName.parent().next(".validation").length == 0) {
//       // only add if not added
//       FullName.parent().after(
//         "<div class='validation'>Please enter Valid Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       FullName.focus();
//     }
//   } else if (FullName.val() != "") {
//     FullName.parent().next(".validation").remove(); // remove it
//   }

//   if (!BrandEmailID.val()) {
//     if (BrandEmailID.parent().next(".validation").length == 0) {
//       // only add if not added
//       BrandEmailID.parent().after(
//         "<div class='validation'>Please enter Email Address</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       BrandEmailID.focus();
//     }
//   } else {
//     BrandEmailID.parent().next(".validation").remove();
//   }

//   if (BrandEmailID.val() && IsEmail(BrandEmailID.val()) == false) {
//     if (BrandEmailID.parent().next(".validation").length == 0) {
//       BrandEmailID.parent().after(
//         "<div class='validation'>Please enter Valid Email</div>"
//       );
//     }
//     e.preventDefault();
//     if (!focusSet) {
//       BrandEmailID.focus();
//     }
//   } else if (BrandEmailID.val() != "") {
//     BrandEmailID.parent().next(".validation").remove();
//   }

//   // Phonenumber validation

//   if (PhoneNumber.val() && validationPhonenum(PhoneNumber.val()) == false) {
//     if (PhoneNumber.parent().next(".validation").length == 0) {
//       // only add if not added
//       PhoneNumber.parent().after(
//         "<div class='validation'>Please enter Valid Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       PhoneNumber.focus();
//     }
//   } else if (PhoneNumber.val() != "") {
//     PhoneNumber.parent().next(".validation").remove(); // remove it
//   }

//   if (
//     !FullName.val() ||
//     IsUsername(FullName.val()) == false ||
//     !BrandEmailID.val() ||
//     IsEmail(BrandEmailID.val()) == false ||
//     (PhoneNumber.val() && validationPhonenum(PhoneNumber.val()) == false)
//   ) {
//     return false;
//   }

//   window.open(pdfUrl, "_blank");
//   // Firebase Form Name
//   var strFormName = $(this).attr("data-form-name");

//   // Access Firebase Database Collection
//   const db = firestore.collection(strFormName);

//   //Pushing Data to Firebase
//   db.doc()
//     .set({
//       fullName: FullName.val(),
//       EmailID: BrandEmailID.val(),
//       PhoneNumber: PhoneNumber.val(),
//       Datetime: datetime,
//     })
//     .then(() => {
//       const db = firestore.collection("mail");

//       //Pushing Data to Firebase
//       db.doc().set({
//         to: [process.env.to],
//         cc: [process.env.cc],
//         bcc: [process.env.bcc],
//         message: {
//           subject: document.title,
//           text: "Welcome to the addxp",
//           //html: 'Name: ' +`${UserName.val()}`+' <br>EmailID: '+`${UserEmailID.val()}`+'  <br>CompanyName: ' +`${UserCompanyName.val()}`+'  <br>Requirements: ' +`${UserRequirements.val()}`+'',
//           html: `<html>
//               <head>
//               </head>
//               <body>
//                   <p>Hello Team,
//                   <br>
//                   We have got the following details from Brand Guidelines form
//                   <br></p>
//                   <p><b>Full Name:</b> ${FullName.val()}</p>
//                   <p><b>Business Email:</b> ${BrandEmailID.val()}</p>
//                   <p><b>Phone Number:</b> ${PhoneNumber.val()}</p>
//                   <br>
//                   <p>Thank you & Regards,
//                   <br>
//                   <b>Addxp</b></p>
//               </body>
//           </html>`,
//         },
//       });

//       window.location = "brand-guidelines";
//       document;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// //Only Email Form
// $("#BtnSubscribe").click(function (e) {
//   e.preventDefault();

//   var UserEmailID = $("#CTAEmailID");
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   var yyyy = today.getFullYear();
//   var datetime =
//     mm +
//     "/" +
//     dd +
//     "/" +
//     yyyy +
//     " " +
//     today.getHours() +
//     ":" +
//     today.getMinutes() +
//     ":" +
//     today.getSeconds();

//   if (!UserEmailID.val() || IsEmail(UserEmailID.val()) == false) {
//     e.preventDefault();
//     UserEmailID.attr("style", "box-shadow: 0 0 5pt 2pt #E97777;");
//     UserEmailID.focus();

//     return false;
//   }
//   // Firebase Form Name
//   var strFormName = $(this).attr("data-form-name");

//   // Access Firebase Database Collection
//   const db = firestore.collection(strFormName);

//   //Pushing Data to Firebase
//   db.doc()
//     .set({
//       EmailID: UserEmailID.val(),
//       Datetime: datetime,
//     })
//     .then(() => {
//       const db = firestore.collection("mail");

//       //Pushing Data to Firebase
//       db.doc().set({
//         to: [process.env.to],
//         cc: [process.env.cc],
//         bcc: [process.env.bcc],
//         message: {
//           subject: document.title,
//           text: "Welcome to the addxp",
//           //html: 'Name: ' +`${UserName.val()}`+' <br>EmailID: '+`${UserEmailID.val()}`+'  <br>CompanyName: ' +`${UserCompanyName.val()}`+'  <br>Requirements: ' +`${UserRequirements.val()}`+'',
//           html: `<html>
//               <head>
//               </head>
//               <body>
//                   <p>Hello Team,
//                   <br>
//                   We have got the Inquiry
//                   <br></p>
//                   <p><b>Email:</b> ${UserEmailID.val()}</p>
//                   <br>
//                   <p>Thank you & Regards,
//                   <br>
//                   <b>Addxp</b></p>
//               </body>
//               </html>`,
//         },
//       });

//       window.location = "thank-you";
//       document;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// // Career Detail Form Submit
// $("#CarreerApplicationSubmit").click(function (e) {
//   e.preventDefault();

//   var CandidateFileName = $("#file-input");
//   var CandidateFName = $("#CandidateFName");
//   var CandidateLName = $("#CandidateLName");
//   var CandidateEmail = $("#CandidateEmail");
//   var CandidatePhone = $("#CandidatePhone");
//   var CandidateLink1 = $("#CandidateHyperLink1");
//   var today = new Date();
//   var dd = String(today.getDate()).padStart(2, "0");
//   var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
//   var yyyy = today.getFullYear();
//   var datetime =
//     mm +
//     "/" +
//     dd +
//     "/" +
//     yyyy +
//     " " +
//     today.getHours() +
//     ":" +
//     today.getMinutes() +
//     ":" +
//     today.getSeconds();

//   if (!CandidateFileName.val()) {
//     if (
//       CandidateFileName.parent().parent().parent().parent().next(".validation")
//         .length == 0
//     ) {
//       // only add if not added
//       CandidateFileName.parent()
//         .parent()
//         .parent()
//         .parent()
//         .after("<div class='validation'>Please select PDF file</div>");
//     }
//     e.preventDefault(); // prevent form from POST to server
//     CandidateFileName.focus();
//     focusSet = true;
//   } else {
//     CandidateFileName.parent()
//       .parent()
//       .parent()
//       .parent()
//       .next(".validation")
//       .remove(); // remove it
//   }

//   //First name
//   if (!CandidateFName.val()) {
//     if (CandidateFName.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateFName.parent().after(
//         "<div class='validation'>Please enter User Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     CandidateFName.focus();
//     focusSet = true;
//   } else {
//     CandidateFName.parent().next(".validation").remove(); // remove it
//   }
//   if (CandidateFName.val() && IsUsername(CandidateFName.val()) == false) {
//     if (CandidateFName.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateFName.parent().after(
//         "<div class='validation'>Please enter Valid Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidateFName.focus();
//     }
//   } else if (CandidateFName.val() != "") {
//     CandidateFName.parent().next(".validation").remove(); // remove it
//   }

//   //Last Name
//   if (!CandidateLName.val()) {
//     if (CandidateLName.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateLName.parent().after(
//         "<div class='validation'>Please enter Last Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidateLName.focus();
//     }
//   } else {
//     CandidateLName.parent().next(".validation").remove(); // remove it
//   }

//   if (CandidateLName.val() && IsUsername(CandidateLName.val()) == false) {
//     if (CandidateLName.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateLName.parent().after(
//         "<div class='validation'>Please enter Valid Name</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidateLName.focus();
//     }
//   } else if (CandidateLName.val() != "") {
//     CandidateLName.parent().next(".validation").remove(); // remove it
//   }

//   //Email
//   if (!CandidateEmail.val()) {
//     if (CandidateEmail.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateEmail.parent().after(
//         "<div class='validation'>Please enter Email Address</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidateEmail.focus();
//     }
//   } else {
//     CandidateEmail.parent().next(".validation").remove(); // remove it
//   }

//   if (CandidateEmail.val() && IsEmail(CandidateEmail.val()) == false) {
//     if (CandidateEmail.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidateEmail.parent().after(
//         "<div class='validation'>Please enter Valid Email</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidateEmail.focus();
//     }
//   } else if (CandidateEmail.val() != "") {
//     CandidateEmail.parent().next(".validation").remove(); // remove it
//   }

//   //Phone Number
//   if (!CandidatePhone.val()) {
//     if (CandidatePhone.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidatePhone.parent().after(
//         "<div class='validation'>Please enter Phone Number</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidatePhone.focus();
//     }
//   } else {
//     CandidatePhone.parent().next(".validation").remove(); // remove it
//   }

//   if (
//     CandidatePhone.val() &&
//     validationPhonenum(CandidatePhone.val()) == false
//   ) {
//     if (CandidatePhone.parent().next(".validation").length == 0) {
//       // only add if not added
//       CandidatePhone.parent().after(
//         "<div class='validation'>Please enter valid Phone Number</div>"
//       );
//     }
//     e.preventDefault(); // prevent form from POST to server
//     if (!focusSet) {
//       CandidatePhone.focus();
//     }
//   } else if (CandidatePhone.val() != "") {
//     CandidatePhone.parent().next(".validation").remove(); // remove it
//   }

//   // Firebase Form Name
//   var strFormName = $(this).attr("data-form-name");

//   Promise.resolve(
//     fileUploadToS3(
//       CandidateFName,
//       CandidateLName,
//       CandidateEmail,
//       CandidatePhone,
//       CandidateLink1,
//       datetime,

//       strFormName
//     )
//   );
// });

// /* ============================ Firebase: End ============================ */

// /* ============================ S3 Bucket: Start ============================ */

// // Configure your AWS SDK
// AWS.config.update({
//   region: process.env.region,
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
// });

// // Create an S3 instance
// const s3 = new AWS.S3();

// async function fileUploadToS3(
//   CandidateFName,
//   CandidateLName,
//   CandidateEmail,
//   CandidatePhone,
//   CandidateLink1,
//   datetime,

//   strFormName
// ) {
//   const file = document.getElementById("file-input").files[0];

//   if (file) {
//     var fileExtension = file.name
//       .substr(file.name.lastIndexOf("."))
//       .toLowerCase();
//     var fileName = file.name.replace(fileExtension, "");

//     var d = new Date().toLocaleDateString("en-GB").replace(/\//g, "");
//     var t = new Date().toLocaleTimeString().replace(/[^0-9]/g, "");
//     const key = `FileUpload/${fileName.replace(
//       /[^\w.-]/g,
//       "-"
//     )}-${d}${t}${fileExtension}`;

//     fileExtension = fileExtension.replace(".", "");

//     const bucketName = "addxp";

//     let returnData;

//     // Prepare the S3 upload parameters
//     const params = {
//       Bucket: bucketName,
//       Key: key,
//       Body: file,
//       ACL: "public-read", // Set appropriate ACL permissions
//     };

//     if (fileExtension == "pdf") {
//       if (
//         !CandidateFName.val() ||
//         !CandidateLName.val() ||
//         !CandidateEmail.val() ||
//         IsEmail(CandidateEmail.val()) == false ||
//         !CandidatePhone.val() ||
//         validationPhonenum(CandidatePhone.val()) == false
//       ) {
//         return false;
//       }

//       // Upload the file to S3
//       await s3.upload(params, function (err, data) {
//         if (err) {
//           console.error("Error:", err);
//         } else {
//           console.log("File uploaded successfully.", data.Location);
//           // return  data.Location;

//           // Access Firebase Database Collection
//           const db = firestore.collection(strFormName);

//           //Pushing Data to Firebase
//           db.doc()
//             .set({
//               Document: `${data.Location}`,
//               FirstName: CandidateFName.val(),
//               LastName: CandidateLName.val(),
//               Email: CandidateEmail.val(),
//               PhoneNumber: CandidatePhone.val(),
//               Hyperlink1: CandidateLink1.val(),
//               Datetime: datetime,
//             })
//             .then(() => {
//               const db = firestore.collection("mail");

//               //Pushing Data to Firebase
//               db.doc().set({
//                 to: [process.env.hrto],
//                 bcc: [process.env.bcc],
//                 message: {
//                   subject: document.title,
//                   text: "Welcome to the addxp",
//                   //html: 'Name: ' +`${UserName.val()}`+' <br>EmailID: '+`${UserEmailID.val()}`+'  <br>CompanyName: ' +`${UserCompanyName.val()}`+'  <br>Requirements: ' +`${UserRequirements.val()}`+'',
//                   html: `<html>
//                       <head>
//                       </head>
//                       <body>
//                           <p>Hello Team,
//                           <br><br>
//                           We have got the following details of Candidate from Career detail form
//                           <br></p>
//                           <p><b>First Name:</b> ${CandidateFName.val()} </p>
//                           <p><b>Last Name:</b> ${CandidateLName.val()} </p>
//                           <p><b>Email:</b> ${CandidateEmail.val()}</p>
//                           <p><b>Phone Number:</b> ${CandidatePhone.val()}</p>
//                           <p><b>Hyperlink:</b> ${CandidateLink1.val()}</p>
//                           <br>
//                           <br>
//                           <p>Thank you & Regards,
//                           <br>
//                           <b>Addxp</b></p>
//                       </body>
//                       </html>`,
//                 },
//               });

//               window.location = "thank-you-for-job-application";
//               document;
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       });
//     } else {
//       alert("Invalid file format. Only PDF files are allowed.");
//     }

//     // return returnData
//   }
// }
// /* ============================ S3 Bucket: End ============================ */

// function IsEmail(email) {
//   var regex =
//     /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//   if (!regex.test(email)) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function validationPhonenum(call) {
//   var regex = /^\d{10}$/;
//   if (!regex.test(call)) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function IsUsername(username) {
//   var regex = /^[a-zA-Z\s]+$/;
//   if (!regex.test(username)) {
//     return false;
//   } else {
//     return true;
//   }
// }
