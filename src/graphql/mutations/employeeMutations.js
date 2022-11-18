import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($ssn: CustomerInput) {
    createEmployee(ssn: $ssn)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($ssn: EmployeeInput) {
    updateEmployee(ssn: $ssn)
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($ssn: ID!) {
    deleteEmployee(ssn: $ssn)
  }
`;