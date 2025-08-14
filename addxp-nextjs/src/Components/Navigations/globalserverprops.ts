import strapi from "../../Configurations/Config.json";

export async function getServerProps(q: any) {
   const response = await fetch(strapi.strapigraphql, {
      next: { revalidate: 3600 },
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: q }),
   });
   const repo = await response.json();
   return {
      props: {
         data: repo,
      },
   };
}
