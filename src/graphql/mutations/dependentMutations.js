import { gql } from "@apollo/client";

export const CREATE_DEPENDENT = gql`
  mutation createDependent($dependent: DependentInput) {
    createDependent(dependent: $dependent)
  }
`;

export const UPDATE_DEPENDENT = gql`
  mutation updateDependent($dependent: DependentInput) {
    updateDependent(dependent: $dependent)
  }
`;

export const DELETE_DEPENDENT = gql`
  mutation deleteDependent($dependentId: ID!) {
    deleteDependent(dependentId: $dependentId)
  }
`;