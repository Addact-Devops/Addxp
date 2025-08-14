export const TERMS_CONDITION = `
query{
  termsCondition{
    data{
      attributes{
        PageTitle
        Slug
        TermsConditions{
          id
          Title
          Description
        }
      }
    }
  }
}`;
