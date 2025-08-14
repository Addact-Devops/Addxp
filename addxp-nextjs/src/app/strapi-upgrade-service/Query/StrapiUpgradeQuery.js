export const STRAPI_VERSIONS = `
query{
 strapiUpgrade{
  data{
    id
    attributes{
      srapi_versions{
        data{
          id
          attributes{
            MainTitle{
              id
              Title
              Description
            }
            VersionTab{
              id
              TabTitle
              TabId
              Target
              TabDesc
            }
            VersionDetails{
              id
              Title
              Description
            }

          }

        }
      }
    }
  }
}
}
`;
