import { gql } from "@apollo/client";

export const getAllDependents = gql`
  query {
    getAllDependents {
      DEP_ID
      EMPLOYEE_SSN
      DEPENDENT_SSN
      NAME
    }
  }
`;

export const getDependentDetails = gql`
  query {
    getDependentDetails(accountNo: ID) {
      DEP_ID
      EMPLOYEE_SSN
      DEPENDENT_SSN
      NAME
    }
  }
`;