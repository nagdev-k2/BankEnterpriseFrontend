import { gql } from "@apollo/client";

export const getBranchReport = gql`
  query {
    getBranchReport {
      BRANCH_ID
      TOTAL_LOANS
      OUTSTANDING_BALANCE
      TOTAL_ACCOUNTS
      TOTAL_BALANCE
    }
  }
`;

export const getWeeklyReport = gql`
  query {
    getWeeklyReport {
      RECORD_NO
      ACCOUNT_NO
      DATE
      TYPE
      AMOUNT
    }
  }
`;