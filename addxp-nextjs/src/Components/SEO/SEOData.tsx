"use client";
import { Helmet } from "react-helmet";
import { useParams, usePathname } from "next/navigation";

export default function SEOData(data: any) {
  const searchParams = useParams();
  const parameters = searchParams.blogdetails;
  const caseStudyParameters = searchParams.casedetails;

  return (
    <>
      <Helmet defer={false}>
        <script type="text/javascript">
          {`(function(c,l,a,r,i,t,y){         
   c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};        
   t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;         
   y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);     
   })
   (window, document, "clarity", "script", "ncvpr4h81q");`}
        </script>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-1046480411"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-1046480411');
          `}
        </script>
      </Helmet>
      {data.name == parameters || data.name == caseStudyParameters ? (
        <>
          <title>{data.data.data[0].attributes.PageTitle}</title>
          <Helmet defer={false}>
            {data.data.data[0].attributes.SEO.structuredData.map((structuredata: any) => (
              <script type="application/ld+json" key={structuredata.id}>
                {structuredata.structuredData}
              </script>
            ))}
          </Helmet>
          {/* check condition for canonical */}
          {data.data.data[0].attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <a rel="canonical" aria-label="canonicalURL" href={`${data.data.data[0].attributes.SEO.canonicalURL}`}></a>
          )}
          {/* check condition for og:locale */}
          {data.data.data[0].attributes.SEO.metaSocial.locate == null ? (
            ""
          ) : (
            <meta property="og:locale" content={`${data.data.data[0].attributes.SEO.metaSocial.locate}`} />
          )}
          {/* check condition for og:type */}
          {data.data.data[0].attributes.SEO.metaSocial.type == null ? (
            ""
          ) : (
            <meta property="og:type" content={`${data.data.data[0].attributes.SEO.metaSocial.type}`}></meta>
          )}
          {/* check condition for metaTitle */}
          {data.data.data[0].attributes.SEO.metaTitle == null ? (
            ""
          ) : (
            <meta property="og:title" content={`${data.data.data[0].attributes.SEO.metaTitle}`} />
          )}

          {/* check condition for metaDescription */}
          {data.data.data[0].attributes.SEO.metaDescription == null ? (
            ""
          ) : (
            <>
              <meta property="og:description" content={`${data.data.data[0].attributes.SEO.metaDescription}`} />
              <meta name="description" content={`${data.data.data[0].attributes.SEO.metaDescription}`} />
            </>
          )}

          {/* check condition for og:image */}
          {data.data.data[0].attributes.SEO.metaSocial.image.data == null ? (
            ""
          ) : (
            <meta
              property="og:image"
              content={`${data.data.data[0].attributes.SEO.metaSocial.image.data.attributes.url}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {data.data.data[0].attributes.SEO.metaSocial.Width == null ? (
            ""
          ) : (
            <meta property="og:image:width" content={`${data.data.data[0].attributes.SEO.metaSocial.Width}`}></meta>
          )}
          {/* check condition for og:image:width */}
          {data.data.data[0].attributes.SEO.metaSocial.Height == null ? (
            ""
          ) : (
            <meta property="og:image:height" content={`${data.data.data[0].attributes.SEO.metaSocial.Height}`}></meta>
          )}
          {/* check condition for or:url */}
          {data.data.data[0].attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <meta property="og:url" content={`${data.data.data[0].attributes.SEO.canonicalURL}`}></meta>
          )}

          {/* check condition for og:site_name */}
          {data.data.data[0].attributes.SEO.Sitename == null ? (
            ""
          ) : (
            <meta property="og:site_name" content={`${data.data.data[0].attributes.SEO.Sitename}`}></meta>
          )}
          {/* check condition for article:publisher */}
          {data.data.data[0].attributes.SEO.SEOCard.Publisher == null ? (
            ""
          ) : (
            <meta property="article:publisher" content={`${data.data.data[0].attributes.SEO.SEOCard.Publisher}`} />
          )}
          {/* check condition for twitter:card */}
          {data.data.data[0].attributes.SEO.SEOCard.Card == null ? (
            ""
          ) : (
            <meta name="twitter:card" content={`${data.data.data[0].attributes.SEO.SEOCard.Card}`} />
          )}
          {/* check condition for twitter:Creator */}
          {data.data.data[0].attributes.SEO.SEOCard.Creator == null ? (
            ""
          ) : (
            <meta name="twitter:creator" content={`${data.data.data[0].attributes.SEO.SEOCard.Creator}`} />
          )}
          {/* check condition for twitter:site */}
          {data.data.data[0].attributes.SEO.SEOCard.Site == null ? (
            ""
          ) : (
            <meta name="twitter:site" content={`${data.data.data[0].attributes.SEO.SEOCard.Site}`} />
          )}
          {/* check condition for twitter:Title */}
          {data.data.data[0].attributes.SEO.SEOCard.Title == null ? (
            ""
          ) : (
            <meta name="twitter:title" content={`${data.data.data[0].attributes.SEO.SEOCard.Title}`} />
          )}
          {/* check condition for twitter:description */}
          {data.data.data[0].attributes.SEO.SEOCard.Description == null ? (
            ""
          ) : (
            <meta name="twitter:description" content={`${data.data.data[0].attributes.SEO.SEOCard.Description}`} />
          )}
          {/* check condition for twitter:image */}
          {data.data.data[0].attributes.SEO.SEOCard.Image.data == null ? (
            ""
          ) : (
            <meta
              name="twitter:image"
              content={`${data.data.data[0].attributes.SEO.SEOCard.Image.data.attributes.url}`}
            />
          )}
          {/* check condition for twitter:label1 */}
          {data.data.data[0].attributes.SEO.SEOCard.label1 == null ? (
            ""
          ) : (
            <meta name="twitter:label1" content={`${data.data.data[0].attributes.SEO.SEOCard.label1}`}></meta>
          )}
          {/* check condition for twitter:data1 */}
          {data.data.data[0].attributes.SEO.SEOCard.data1 == null ? (
            ""
          ) : (
            <meta name="twitter:data1" content={`${data.data.data[0].attributes.SEO.SEOCard.data1}`}></meta>
          )}
          {/* check condition for twitter:label2 */}
          {data.data.data[0].attributes.SEO.SEOCard.label2 == null ? (
            ""
          ) : (
            <meta name="twitter:label2" content={`${data.data.data[0].attributes.SEO.SEOCard.label2}`}></meta>
          )}
          {/* check condition for twitter:data2 */}
          {data.data.data[0].attributes.SEO.SEOCard.data2 == null ? (
            ""
          ) : (
            <meta name="twitter:data2" content={`${data.data.data[0].attributes.SEO.SEOCard.data2}`}></meta>
          )}
        </>
      ) : (
        <>
          <title>{data.data.data.attributes.PageTitle}</title>
          <Helmet defer={false}>
            {data.data.data.attributes.SEO.structuredData.map((structuredata: any) => (
              <script type="application/ld+json" key={structuredata.id}>
                {structuredata.structuredData}
              </script>
            ))}
          </Helmet>
          {/* check condition for canonical */}
          {data.data.data.attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <a rel="canonical" aria-label="canonicalURL" href={`${data.data.data.attributes.SEO.canonicalURL}`}></a>
          )}
          {/* check condition for og:locale */}
          {data.data.data.attributes.SEO.metaSocial.locate == null ? (
            ""
          ) : (
            <meta property="og:locale" content={`${data.data.data.attributes.SEO.metaSocial.locate}`} />
          )}
          {/* check condition for og:type */}
          {data.data.data.attributes.SEO.metaSocial.type == null ? (
            ""
          ) : (
            <meta property="og:type" content={`${data.data.data.attributes.SEO.metaSocial.type}`}></meta>
          )}
          {/* check condition for metaTitle */}
          {data.data.data.attributes.SEO.metaTitle == null ? (
            ""
          ) : (
            <meta property="og:title" content={`${data.data.data.attributes.SEO.metaTitle}`} />
          )}

          {/* check condition for metaDescription */}
          {data.data.data.attributes.SEO.metaDescription == null ? (
            ""
          ) : (
            <>
              <meta property="og:description" content={`${data.data.data.attributes.SEO.metaDescription}`} />
              <meta name="description" content={`${data.data.data.attributes.SEO.metaDescription}`} />
            </>
          )}

          {/* check condition for og:image */}
          {data.data.data.attributes.SEO.metaSocial.image.data == null ? (
            ""
          ) : (
            <meta
              property="og:image"
              content={`${data.data.data.attributes.SEO.metaSocial.image.data.attributes.url}`}
            ></meta>
          )}
          {/* check condition for og:image:width */}
          {data.data.data.attributes.SEO.metaSocial.Width == null ? (
            ""
          ) : (
            <meta property="og:image:width" content={`${data.data.data.attributes.SEO.metaSocial.Width}`}></meta>
          )}
          {/* check condition for og:image:width */}
          {data.data.data.attributes.SEO.metaSocial.Height == null ? (
            ""
          ) : (
            <meta property="og:image:height" content={`${data.data.data.attributes.SEO.metaSocial.Height}`}></meta>
          )}
          {/* check condition for og:url */}
          {data.data.data.attributes.SEO.canonicalURL == null ? (
            ""
          ) : (
            <meta property="og:url" content={`${data.data.data.attributes.SEO.canonicalURL}`}></meta>
          )}

          {/* check condition for og:site_name */}
          {data.data.data.attributes.SEO.Sitename == null ? (
            ""
          ) : (
            <meta property="og:site_name" content={`${data.data.data.attributes.SEO.Sitename}`}></meta>
          )}
          {/* check condition for article:publisher */}
          {data.data.data.attributes.SEO.SEOCard.Publisher == null ? (
            ""
          ) : (
            <meta property="article:publisher" content={`${data.data.data.attributes.SEO.SEOCard.Publisher}`} />
          )}
          {/* check condition for twitter:card */}
          {data.data.data.attributes.SEO.SEOCard.Card == null ? (
            ""
          ) : (
            <meta name="twitter:card" content={`${data.data.data.attributes.SEO.SEOCard.Card}`} />
          )}
          {/* check condition for twitter:Creator */}
          {data.data.data.attributes.SEO.SEOCard.Creator == null ? (
            ""
          ) : (
            <meta name="twitter:creator" content={`${data.data.data.attributes.SEO.SEOCard.Creator}`} />
          )}
          {/* check condition for twitter:site */}
          {data.data.data.attributes.SEO.SEOCard.Site == null ? (
            ""
          ) : (
            <meta name="twitter:site" content={`${data.data.data.attributes.SEO.SEOCard.Site}`} />
          )}
          {/* check condition for twitter:Title */}
          {data.data.data.attributes.SEO.SEOCard.Title == null ? (
            ""
          ) : (
            <meta name="twitter:title" content={`${data.data.data.attributes.SEO.SEOCard.Title}`} />
          )}
          {/* check condition for twitter:description */}
          {data.data.data.attributes.SEO.SEOCard.Description == null ? (
            ""
          ) : (
            <meta name="twitter:description" content={`${data.data.data.attributes.SEO.SEOCard.Description}`} />
          )}
          {/* check condition for twitter:image */}
          {data.data.data.attributes.SEO.SEOCard.Image.data == null ? (
            ""
          ) : (
            <meta name="twitter:image" content={`${data.data.data.attributes.SEO.SEOCard.Image.data.attributes.url}`} />
          )}
          {/* check condition for twitter:label1 */}
          {data.data.data.attributes.SEO.SEOCard.label1 == null ? (
            ""
          ) : (
            <meta name="twitter:label1" content={`${data.data.data.attributes.SEO.SEOCard.label1}`}></meta>
          )}
          {/* check condition for twitter:data1 */}
          {data.data.data.attributes.SEO.SEOCard.data1 == null ? (
            ""
          ) : (
            <meta name="twitter:data1" content={`${data.data.data.attributes.SEO.SEOCard.data1}`}></meta>
          )}
          {/* check condition for twitter:label2 */}
          {data.data.data.attributes.SEO.SEOCard.label2 == null ? (
            ""
          ) : (
            <meta name="twitter:label2" content={`${data.data.data.attributes.SEO.SEOCard.label2}`}></meta>
          )}
          {/* check condition for twitter:data2 */}
          {data.data.data.attributes.SEO.SEOCard.data2 == null ? (
            ""
          ) : (
            <meta name="twitter:data2" content={`${data.data.data.attributes.SEO.SEOCard.data2}`}></meta>
          )}
        </>
      )}
    </>
  );
}
