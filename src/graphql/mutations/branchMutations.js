import { gql } from "@apollo/client";

export const CREATE_BRANCH = gql`
  mutation createBranch($branch: BranchInput) {
    createBranch(branch: $branch)
  }
`;

export const UPDATE_BRANCH = gql`
  mutation updateBranch($branch: BranchInput) {
    updateBranch(branch: $branch)
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranch($branchId: ID!) {
    deleteBranch(branchId: $branchId)
  }
`;