import { gql } from "@apollo/client";

export const getAllEmployees = gql`
  query {
    getAllEmployees {
      SSN
      BRANCH_ID
      NAME
      TELEPHONE
      ROLE
      START_DATE
      MANAGER_SSN
      LENGTH_OF_EMPLOYMENT
    }
  }
`;

export const getEmployeeDetails = gql`
  query {
    getEmployeeDetails(ssn: ID) {
      SSN
      BRANCH_ID
      NAME
      TELEPHONE
      ROLE
      START_DATE
      MANAGER_SSN
    }
  }
`;