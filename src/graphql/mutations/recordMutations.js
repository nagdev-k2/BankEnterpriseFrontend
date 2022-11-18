import { gql } from "@apollo/client";

export const CREATE_RECORD = gql`
  mutation createRecord($record: RecordInput) {
    createRecord(record: $record)
  }
`;

export const UPDATE_RECORD = gql`
  mutation updateRecord($record: RecordInput) {
    updateRecord(record: $record)
  }
`;

export const DELETE_RECORD = gql`
  mutation deleteRecord($accountNo: ID!) {
    deleteRecord(accountNo: $accountNo)
  }
`;