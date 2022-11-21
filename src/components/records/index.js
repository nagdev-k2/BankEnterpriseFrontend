import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_RECORD } from '../../graphql/mutations/recordMutations';
import Loading from "../layout/loading";
import { getAllRecords } from "../../graphql/queries/recordQueries";
import Table from "../layout/table";
import CustomModal from '../modals';
import CustomAlert from "../layout/alerts";

const Record = () => {
  const { loading, data, refetch } = useQuery(getAllRecords);
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
  const [createRecord, {error, result1}] = useMutation(CREATE_RECORD, {
    variables: {records: record}
  })

  let recordList = records;

  useEffect(() => {
    if (data) {
      setRecords(data.getAllRecords);
      setSearchedRecord(data.getAllRecords)
    }
  }, [data]);

  const addRecord = () => {
    setSelectedRecord({});
    setShowRecordModal(true)
  }

  if(loading) return (<Loading isLoading={loading} />)
  return (
    <>
      <CustomAlert error={error} />
      <div className="operation-row">
        {/* <Form.Control className="input-field" type="text" placeholder="Search Record Name" onKeyUp={onSearch} /> */}
        <Button className="add-btn" onClick={addRecord}>Add New Record</Button>
      </div>
      <Table tableHeaders={['RECORD NO', 'ACCOUNT_NO', 'DATE', 'TYPE', 'AMOUNT',]} tableRows={searchedRecord} manageRow={() => {}} />
      <CustomModal
        title='Record'
        show={showRecordModal}
        setShow={setShowRecordModal}
        selectedData={selectedRecord}
        data={record}
        setData={setRecord}
        createData={createRecord}
        refetch={refetch}
        defaultData={{ACCOUNT_NO: '', TYPE: '', DATE:'', AMOUNT: ''}}
      />
    </>
  );
}

export default Record;