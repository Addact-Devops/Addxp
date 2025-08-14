export const SEO = (parameter) => `
query{
  ${parameter}{
    data{
      id
      attributes{
        PageTitle
        Slug
        SEO{
          id
          metaTitle
          metaDescription
          metaImage{
            data{
              id
              attributes{
                name
                alternativeText
                url
              }
            }
          }
          keywords
          metaRobots
          metaViewport
          canonicalURL
          h1
          Sitename
          metaSocial{
            id
            socialNetwork
            title
            description
            image{
              data{
                id
                attributes{
                  name
                  alternativeText
                  url
                }
              }
            }
            Height
            Width
            locate
            type
            
          }
          structuredData{
            id
            structuredData
          }
          SEOCard{
            id
            Card
            Creator
            Site
            Title
            Description
            label1
            data1
            label2
            data2
            Publisher
            Image{
              data{
                id
                attributes{
                  name
                  alternativeText
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}

`;

export const SEO_DETAILS = (parameter) => `
/api/blogs?filters[Slug][$eq]=${parameter}&populate=SEO.metaSocial&populate=SEO.metaSocial.image&populate=SEO.SEOCard.Image&populate=SEO.structuredData

`;
export const SEO_CASE_DETAILS = (parameter) => `
/api/case-studies-details?filters[Slug][$eq]=${parameter}&populate=SEO.metaSocial&populate=SEO.metaSocial.image&populate=SEO.SEOCard.Image&populate=SEO.structuredData

`;
 