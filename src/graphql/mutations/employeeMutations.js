import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($employee: EmployeeInput) {
    createEmployee(employee: $employee)
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($employee: EmployeeInput) {
    updateEmployee(employee: $employee)
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($ssn: ID!) {
    deleteEmployee(ssn: $ssn)
  }
`;