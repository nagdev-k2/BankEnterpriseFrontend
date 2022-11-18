import { gql } from "@apollo/client";

export const getAllCustomers = gql`
  query {
    getAllCustomers {
      SSN
      NAME
      STREET
      CITY
      ASSOCIATED_EMPLOYEE_SSN
      ASSOCIATED_EMPLOYEE_TYPE
    }
  }
`;

export const getCustomerDetails = gql`
  query {
    getCustomerDetails(ssn: ID) {
      SSN
      NAME
      STREET
      CITY
      ASSOCIATED_EMPLOYEE_SSN
      ASSOCIATED_EMPLOYEE_TYPE
    }
  }
`;