import { gql } from "@apollo/client";

export const getAllLoans = gql`
  query {
    getAllLoans {
      LOAN_NO
      LOAN_OFFICER_SSN
      BRANCH_ID
      CUSTOMER_SSN
      AMOUNT
      LOAN_TYPE
      CREDIT_LIMIT
      CREDIT_RATING
      INTEREST_RATE
    }
  }
`;

export const getLoanDetails = gql`
  query {
    getLoanDetails(loanNo: ID) {
      LOAN_NO
      LOAN_OFFICER_SSN
      BRANCH_ID
      CUSTOMER_SSN
      AMOUNT
      LOAN_TYPE
      CREDIT_LIMIT
      CREDIT_RATING
      INTEREST_RATE
    }
  }
`;