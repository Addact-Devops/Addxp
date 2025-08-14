export const PRIVATE_POLICY = `
query{
  privacyPolicy{
    data{
      id
      attributes{
        PageTitle
        Slug
        PrivatePolicy{
          id
          Title
          Description
        }
      }
    }
  }
}`;
