import { gql } from "@apollo/client";

export const getAllRecords = gql`
  query {
    getAllRecords {
      RECORD_NO
      ACCOUNT_NO
      DATE
      TYPE
      AMOUNT
    }
  }
`;

export const getRecordDetails = gql`
  query {
    getRecordDetails(account_no: ID) {
      RECORD_NO
      ACCOUNT_NO
      DATE
      TYPE
      AMOUNT
    }
  }
`;