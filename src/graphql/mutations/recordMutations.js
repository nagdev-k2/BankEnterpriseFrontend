import { gql } from "@apollo/client";

export const CREATE_RECORD = gql`
  mutation createRecords($records: RecordsInput) {
    createRecords(records: $records)
  }
`;
