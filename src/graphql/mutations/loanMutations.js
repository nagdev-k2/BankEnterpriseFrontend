import { gql } from "@apollo/client";

export const CREATE_LOAN = gql`
  mutation createLoan($loan: LoanInput) {
    createLoan(loan: $loan)
  }
`;

export const UPDATE_LOAN = gql`
  mutation updateLoan($loan: LoanInput) {
    updateLoan(loan: $loan)
  }
`;

export const DELETE_LOAN = gql`
  mutation deleteLoan($loanNo: ID!) {
    deleteLoan(loanNo: $loanNo)
  }
`;