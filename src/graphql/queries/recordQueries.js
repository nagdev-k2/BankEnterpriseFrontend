import { gql } from "@apollo/client";

export const getAllRecords = gql`
  query {
    getAllRecords {
      ACCOUNT_NO
      DATE
      TYPE
      AMOUNT
    }
  }
`;

export const getRecordDetails = gql`
  query {
    getRecordDetails(accountNo: ID) {
      ACCOUNT_NO
      DATE
      TYPE
      AMOUNT
    }
  }
`;