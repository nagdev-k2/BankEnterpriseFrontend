import { gql } from "@apollo/client";

export const CREATE_LOAN = gql`
  mutation createLoan($loans: LoanInput) {
    createLoan(loans: $loans)
  }
`;

export const UPDATE_LOAN = gql`
  mutation updateLoan($loan: LoanInput) {
    updateLoan(loan: $loan)
  }
`;

export const DELETE_LOAN = gql`
  mutation deleteLoan($loan_no: ID!) {
    deleteLoan(loan_no: $loan_no)
  }
`;