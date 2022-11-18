import { gql } from "@apollo/client";

export const getAllAssets = gql`
  query {
    getAllAssets {
      ASSET_ID
      BRANCH_ID
      NAME
      TYPE
      COST
      STATUS
      DATE_OF_PURCHASE
    }
  }
`;

export const getAssetDetails = gql`
  query {
    getAssetDetails(assetId: ID) {
      ASSET_ID
      BRANCH_ID
      NAME
      TYPE
      COST
      STATUS
      DATE_OF_PURCHASE
    }
  }
`;