// import React from "react";
// import Link from "next/link";
// import strapi from "../../Configurations/Config.json";
// import { INFOGRAPHICS_LIST_QUERY } from "@/Configurations/CommonQuery";

// async function getServerSideProps() {
//   const response = await fetch(strapi.strapigraphql, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: INFOGRAPHICS_LIST_QUERY,
//     }),
//   });

//   const data = await response.json();
//   return data;
// }

// export default async function InfographicsListingPage() {
//   const response = await getServerSideProps();
//   const infographics = response?.data?.infographics?.data || [];

//   if (!infographics.length) {
//     return <p>No infographics available.</p>;
//   }

//   return (
//     <section className="infographics-listing">
//       <div className="container">
//         <h1 className="main-title">Infographics</h1>
//         <div className="grid">
//           {infographics.map((item: any) => (
//             <div className="card" key={item.id}>
//               <Link href={`/infographics/${item.attributes.Slug}`}>
//                 <img
//                   src={item.attributes.InfographicImage.data[0]?.attributes.url}
//                   alt={item.attributes.InfographicImage.data[0]?.attributes.alternativeText || "Infographic Image"}
//                   loading="lazy"
//                 />
//                 <h3>{item.attributes.Title}</h3>
//                 <p>{item.attributes.Description?.substring(0, 100)}...</p>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import NotFound from "@/app/not-found";

export default function InfographicsListingPage() {
  return <NotFound />;
}
