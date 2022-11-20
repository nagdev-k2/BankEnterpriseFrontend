import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_RECORD, UPDATE_RECORD, DELETE_RECORD } from '../../graphql/mutations/recordMutations';
import Loading from "../layout/loading";
import { getAllRecords } from "../../graphql/queries/recordQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const Record = () => {
  const { error, loading, data, refetch } = useQuery(getAllRecords);
  const [records, setRecords] = useState([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [searchedRecord, setSearchedRecord] = useState(records);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [record, setRecord] = useState({
    ACCOUNT_NO: isEmpty(selectedRecord) ? '' : selectedRecord.ACCOUNT_NO,
    TYPE: isEmpty(selectedRecord) ? '' : selectedRecord.TYPE,
    DATE: isEmpty(selectedRecord) ? '' : selectedRecord.DATE,
    AMOUNT: isEmpty(selectedRecord) ? '' : selectedRecord.AMOUNT,
  })
  const [createRecord, {err1, result1}] = useMutation(CREATE_RECORD, {
    variables: {record}
  })
  const [updateRecord, {err2, result2}] = useMutation(UPDATE_RECORD, {
    variables: {record}
  })
  const [deleteRecord, {err3, result3}] = useMutation(DELETE_RECORD, {
    variables: {accountNo: record.ACCOUNT_NO}
  })

  let recordList = records;

  useEffect(() => {
    if (data) {
      setRecords(data.getAllRecords);
      setSearchedRecord(data.getAllRecords)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) recordList = filter(recordList, b => includes(lowerCase(b.DATE), lowerCase(name)))
    else recordList = records;
    setSearchedRecord(recordList);
  }

  const addRecord = () => {
    setSelectedRecord({});
    setShowRecordModal(true)
  }

  const manageRecord = (row) => {
    setSelectedRecord(row);
    setRecord(row);
    setShowRecordModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Record Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addRecord}>Add New Record</Button>
      </div>
      <Table tableHeaders={['ACCOUNT_NO', 'DATE', 'TYPE', 'AMOUNT',]} tableRows={searchedRecord} manageRow={manageRecord}  />
      <CustomModal
        title='Record'
        show={showRecordModal}
        setShow={setShowRecordModal}
        selectedData={selectedRecord}
        data={record}
        setData={setRecord}
        createData={createRecord}
        refetch={refetch}
        updateData={updateRecord}
        deleteData={deleteRecord}
        defaultData={{ACCOUNT_NO: '', TYPE: '', DATE:'', AMOUNT: ''}}
      />
    </>
  );
}

export default Record;