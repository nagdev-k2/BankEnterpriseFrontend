import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($ssn: CustomerInput) {
    createCustomer(ssn: $ssn)
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($ssn: CustomerInput) {
    updateCustomer(ssn: $ssn)
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($ssn: ID!) {
    deleteCustomer(ssn: $ssn)
  }
`;