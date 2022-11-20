import { gql } from "@apollo/client";

export const CREATE_ASSET = gql`
  mutation createAsset($asset: AssetInput) {
    createAsset(asset: $asset)
  }
`;

export const UPDATE_ASSET = gql`
  mutation updateAsset($assets: AssetInput) {
    updateAsset(assets: $assets)
  }
`;

export const DELETE_ASSET = gql`
  mutation deleteAsset($asset_id: ID!) {
    deleteAsset(asset_id: $asset_id)
  }
`;