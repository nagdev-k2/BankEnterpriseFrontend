import { gql } from "@apollo/client";

export const getAllDependents = gql`
  query {
    getAllDependents {
      DEPENDENT_ID
      EMPLOYEE_SSN
      DEPENDENT_SSN
      NAME
    }
  }
`;

export const getDependentDetails = gql`
  query {
    getDependentDetails(accountNo: ID) {
      DEPENDENT_ID
      EMPLOYEE_SSN
      DEPENDENT_SSN
      NAME
    }
  }
`;