import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($customer: CustomerInput) {
    createCustomer(customer: $customer)
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($customer: CustomerInput) {
    updateCustomer(customer: $customer)
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($ssn: ID!) {
    deleteCustomer(ssn: $ssn)
  }
`;