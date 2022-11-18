import { gql } from "@apollo/client";

export const CREATE_BANK = gql`
  mutation createBank($bank: BankInput) {
    createBank(bank: $bank)
  }
`;

export const UPDATE_BANK = gql`
  mutation updateBank($bank: BankInput) {
    updateBank(bank: $bank)
  }
`;

export const DELETE_BANK = gql`
  mutation deleteBank($bankId: ID!) {
    deleteBank(bankId: $bankId)
  }
`;