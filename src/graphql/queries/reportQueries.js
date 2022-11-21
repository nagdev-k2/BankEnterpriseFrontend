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
      BRANCH_ID
      WEEK_START_DATE
      LOAN_OFFICER_SSN
      NO_OF_LOANS_HANDLED
      LOAN_TYPE
      AMOUNT_DEPOSITED
    }
  }
`;