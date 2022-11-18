import { gql } from "@apollo/client";

export const getAllBranches = gql`
  query {
    getAllBranches {
      BANK_ID
      BRANCH_ID
      BRANCH_NAME
      CITY
    }
  }
`;

export const getBranchDetails = gql`
  query {
    getBranchDetails(branchId: ID) {
      BANK_ID
      BRANCH_ID
      BRANCH_NAME
      CITY
    }
  }
`;