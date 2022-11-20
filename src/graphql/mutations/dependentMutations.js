import { gql } from "@apollo/client";

export const CREATE_DEPENDENT = gql`
  mutation createDependents($dependents: DependentsInput) {
    createDependents(dependents: $dependents)
  }
`;

export const UPDATE_DEPENDENT = gql`
  mutation updateDependents($dependents: DependentsInput) {
    updateDependents(dependents: $dependents)
  }
`;

export const DELETE_DEPENDENT = gql`
  mutation deleteDependents($dep_id: ID!) {
    deleteDependents(dep_id: $dep_id)
  }
`;