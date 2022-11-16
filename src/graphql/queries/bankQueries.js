import { gql } from "@apollo/client";

export const getAllBanks = gql`
  query {
    getAllBanks {
      BANK_ID
      BANK_NAME
    }
  }
`;

export const getBankDetails = gql`
  query {
    getBankDetails(bankId: ID) {
      BANK_ID
      BANK_NAME
    }
  }
`;