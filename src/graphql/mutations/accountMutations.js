import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation createAccounts($accounts: AccountsInput) {
    createAccounts(accounts: $accounts)
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccounts($accounts: AccountsInput) {
    updateAccounts(accounts: $accounts)
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccounts($account_no: ID!) {
    deleteAccounts(account_no: $account_no)
  }
`;