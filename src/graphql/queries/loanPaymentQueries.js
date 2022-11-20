import { gql } from "@apollo/client";

export const getAllLoanPayments = gql`
  query {
    getAllLoanPayments {
      TRANS_ID
      LOAN_NO
      AMOUNT
      DATE
    }
  }
`;