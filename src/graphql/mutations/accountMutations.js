import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation createAccount($account: AccountInput) {
    createAccount(account: $account)
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($account: AccountInput) {
    updateAccount(account: $account)
  }
`;

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($accountNo: ID!) {
    deleteAccount(accountNo: $accountNo)
  }
`;