import { gql } from "@apollo/client";

export const CREATE_LOAN_PAYMENT = gql`
  mutation createLoanPayments($loan_payments: LoanPaymentsInput) {
    createLoanPayments(loan_payments: $loan_payments)
  }
`;
