import { gql } from "@apollo/client";

export const CREATE_ASSET = gql`
  mutation createAsset($asset: AssetInput) {
    createAsset(asset: $asset)
  }
`;

export const UPDATE_ASSET = gql`
  mutation updateAsset($asset: AssetInput) {
    updateAsset(asset: $asset)
  }
`;

export const DELETE_ASSET = gql`
  mutation deleteAsset($assetId: ID!) {
    deleteAsset(assetId: $assetId)
  }
`;