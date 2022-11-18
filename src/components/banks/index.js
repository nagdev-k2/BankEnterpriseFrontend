import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_BANK, UPDATE_BANK, DELETE_BANK } from '../../graphql/mutations/bankMutations';
import Loading from "../layout/loading";
import { getAllBanks } from "../../graphql/queries/bankQueries";
import Table from "../layout/table";
import BankModal from '../modals/bank';
import './index.css'

const Home = () => {
  const { error, loading, data, refetch } = useQuery(getAllBanks);
  const [banks, setBanks] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [searchedBanks, setSearchedBanks] = useState(banks);
  const [selectedBank, setSelectedBank] = useState({});
  const [bank, setBank] = useState({
    BANK_ID: isEmpty(selectedBank) ? '' : selectedBank.BANK_ID,
    BANK_NAME: isEmpty(selectedBank) ? '' : selectedBank.BANK_NAME,
  })
  const [createBank, {err1, result1}] = useMutation(CREATE_BANK, {
    variables: {bank}
  })
  const [updateBank, {err2, result2}] = useMutation(UPDATE_BANK, {
    variables: {bank}
  })
  const [deleteBank, {err3, result3}] = useMutation(DELETE_BANK, {
    variables: {bankId: bank.BANK_ID}
  })

  let banksList = banks;

  useEffect(() => {
    if (data) {
      setBanks(data.getAllBanks);
      setSearchedBanks(data.getAllBanks)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) banksList = filter(banksList, b => includes(lowerCase(b.BANK_NAME), lowerCase(name)))
    else banksList = banks;
    setSearchedBanks(banksList);
  }

  const addBank = () => {
    setSelectedBank({});
    setShowBankModal(true)
  }

  const manageBank = (row) => {
    setSelectedBank(row);
    setBank(row);
    setShowBankModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Bank Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addBank}>Add New Bank</Button>
      </div>
      <Table tableHeaders={['ID', 'Name']} tableRows={searchedBanks} manageRow={manageBank}  />
      <BankModal
        show={showBankModal}
        setShow={setShowBankModal}
        selectedBank={selectedBank}
        bank={bank}
        setBank={setBank}
        createBank={createBank}
        refetch={refetch}
        updateBank={updateBank}
        deleteBank={deleteBank}
      />
    </>
  );
}

export default Home;