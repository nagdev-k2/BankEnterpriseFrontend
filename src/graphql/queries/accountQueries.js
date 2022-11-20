import { gql } from "@apollo/client";

export const getAllAccounts = gql`
  query {
    getAllAccounts {
      ACCOUNT_NO
      BRANCH_ID
      CUSTOMER_SSN
      BALANCE
      RECENT_ACCESS_DATE
      TYPE
      INTEREST_RATE
      OVERDRAFTS
    }
  }
`;

export const getAccountDetails = gql`
  query {
    getAccountDetails(accountNo: ID) {
      ACCOUNT_NO
      BRANCH_ID
      CUSTOMER_SSN
      BALANCE
      RECENT_ACCESS_DATE
      TYPE
      INTEREST_RATE
      OVERDRAFTS
    }
  }
`;