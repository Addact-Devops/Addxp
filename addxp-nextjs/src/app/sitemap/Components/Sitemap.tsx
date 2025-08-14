"use client";

export default function Sitemap(data: any) {
   function replaceSecondUnderscore(inputString: any) {
      const underscoreIndexes = [];
      for (let i = 0; i < inputString.length; i++) {
         if (inputString[i] === "_") {
            underscoreIndexes.push(i);
         }
      }

      if (underscoreIndexes.length >= 2) {
         const secondUnderscoreIndex = underscoreIndexes[1];
         const firstPart = inputString.substring(0, secondUnderscoreIndex);
         const secondPart = inputString.substring(secondUnderscoreIndex + 1);

         return `${firstPart} ${secondPart.replace(/_/g, "-")}`;
      } else {
         return inputString.replace(/_/g, "-");
      }
   }
   return (
      <section className='sitemap-section'>
         <div className='container'>
            <div className='sitemap-title row'>
               <a href={`${data.data.data.attributes.HomeLinks[0].href}`}>
                  {data.data.data.attributes.HomeLinks[0].label}
               </a>
            </div>

            <div className='sitemap-services'>
               <div className='sitemap-title sitemap-title-services'>Services</div>

               <div className='sitemap-services-list'>
                  <div className='row'>
                     <div className='col-md-6 col-12'>
                        <a
                           href={`${data.data.data.attributes.StrapiServices.LinkIcons[0].href}`}
                           className='hover-border-left'
                        >
                           <img
                              src={data.data.data.attributes.StrapiServices.Icons.data.attributes.url}
                              alt={data.data.data.attributes.StrapiServices.Icons.data.attributes.alternativeText}
                              className='hover-border-left'
                              loading='lazy'
                           />
                        </a>
                        <ul>
                           {data.data.data.attributes.StrapiChild.map((strapichild: any) => (
                              <div key={strapichild.id}>
                                 <a href={strapichild.href}>
                                    <li>
                                       <p>{strapichild.label}</p>
                                    </li>
                                 </a>
                              </div>
                           ))}
                        </ul>
                     </div>
                     <div className='col-md-6 col-12 services-images'>
                        {data.data.data.attributes.ServicesImage.map((serviceimg: any) => (
                           <div key={serviceimg.id}>
                              <a href={`${serviceimg.LinkIcons[0].href}`} className='hover-border-left'>
                                 <img
                                    src={serviceimg.Icons.data.attributes.url}
                                    alt={serviceimg.Icons.data.attributes.alternativeText}
                                    loading='lazy'
                                 />
                              </a>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            <div className='row'>
               <div className='col-md-6 col-12'>
                  <div className='sitemap-title'>{data.data.data.attributes.SolutionTitle}</div>

                  {data.data.data.attributes.SolutionLinks.map((solutionlinks: any) => (
                     <div className='sitemap-subtitle' key={solutionlinks.id}>
                        <a href={solutionlinks.Links[0].href}>
                           <div className='icon-text'>
                              <span
                                 className={replaceSecondUnderscore(solutionlinks.Class).replaceAll("_", "-")}
                              ></span>
                              {solutionlinks.Links[0].label}
                           </div>
                        </a>
                     </div>
                  ))}
               </div>
               <div className='col-md-6 col-12'>
                  <div className='sitemap-title'>{data.data.data.attributes.CompanyTitle}</div>
                  {data.data.data.attributes.CompanyLinks.map((company: any) => (
                     <div className='sitemap-subtitle' key={company.id}>
                        <a href={`${company.Links[0].href}`}>
                           <div className='icon-text'>
                              <span className={replaceSecondUnderscore(company.Class).replaceAll("_", "-")}></span>
                              {company.Links[0].label}
                           </div>
                        </a>
                     </div>
                  ))}
               </div>
            </div>
            <div className='row'>
               <div className='col-md-6 col-12'>
                  <div className='sitemap-title'>{data.data.data.attributes.InsightsTitle}</div>
                  {data.data.data.attributes.InsightsLinks.map((insights: any) => (
                     <div className='sitemap-subtitle' key={insights.id}>
                        <a href={`${insights.Links[0].href}`}>
                           <div className='icon-text'>
                              <span className={replaceSecondUnderscore(insights.Class).replaceAll("_", "-")}></span>
                              {insights.Links[0].label}
                           </div>
                        </a>
                     </div>
                  ))}
               </div>

               <div className='col-md-6 col-12'>
                  {data.data.data.attributes.OtherLinks.map((otherlinks: any) => (
                     <div
                        className={replaceSecondUnderscore(otherlinks.Class).replaceAll("_", "-")}
                        key={otherlinks.id}
                     >
                        <a href={`${otherlinks.Links[0].href}`}>{otherlinks.Links[0].label}</a>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
