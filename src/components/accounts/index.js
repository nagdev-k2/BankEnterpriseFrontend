import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '../../graphql/mutations/accountMutations';
import Loading from "../layout/loading";
import { getAllAccounts } from "../../graphql/queries/accountQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const Account = () => {
  const { error, loading, data, refetch } = useQuery(getAllAccounts);
  const [accounts, setAccounts] = useState([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [searchedAccount, setSearchedAccount] = useState(accounts);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [account, setAccount] = useState({
    ACCOUNT_NO: isEmpty(selectedAccount) ? '' : selectedAccount.ACCOUNT_NO,
    BRANCH_ID: isEmpty(selectedAccount) ? '' : selectedAccount.BRANCH_ID,
    BALANCE: isEmpty(selectedAccount) ? '' : selectedAccount.BALANCE,
    RECENT_ACCESS_DATE: isEmpty(selectedAccount) ? '' : selectedAccount.RECENT_ACCESS_DATE,
    TYPE: isEmpty(selectedAccount) ? '' : selectedAccount.TYPE,
    INTEREST_RATE: isEmpty(selectedAccount) ? '' : selectedAccount.INTEREST_RATE,
    OVERDRAFTS: isEmpty(selectedAccount) ? '' : selectedAccount.OVERDRAFTS,
  })
  const [createAccount, {err1, result1}] = useMutation(CREATE_ACCOUNT, {
    variables: {account: {
      BRANCH_ID: account.BRANCH_ID,
      BALANCE: account.BALANCE,
      RECENT_ACCESS_DATE: account.RECENT_ACCESS_DATE,
      TYPE: account.TYPE,
      INTEREST_RATE: account.INTEREST_RATE,
      OVERDRAFTS: account.OVERDRAFTS,
    }}
  })
  const [updateAccount, {err2, result2}] = useMutation(UPDATE_ACCOUNT, {
    variables: {account}
  })
  const [deleteAccount, {err3, result3}] = useMutation(DELETE_ACCOUNT, {
    variables: {accountNo: account.ACCOUNT_NO}
  })

  let accountList = accounts;

  useEffect(() => {
    if (data) {
      setAccounts(data.getAllAccounts);
      setSearchedAccount(data.getAllAccounts)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) accountList = filter(accountList, b => includes(lowerCase(b.BALANCE), lowerCase(name)))
    else accountList = accounts;
    setSearchedAccount(accountList);
  }

  const addAccount = () => {
    setSelectedAccount({});
    setShowAccountModal(true)
  }

  const manageAccount = (row) => {
    setSelectedAccount(row);
    setAccount(row);
    setShowAccountModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Account Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addAccount}>Add New Account</Button>
      </div>
      <Table tableHeaders={['ACCOUNT_NO', 'BRANCH ID' , 'BALANCE', 'RECENT_ACCESS_DATE', 'TYPE', 'INTEREST_RATE', 'OVERDRAFTS']} tableRows={searchedAccount} manageRow={manageAccount}  />
      <CustomModal
        title='Account'
        show={showAccountModal}
        setShow={setShowAccountModal}
        selectedData={selectedAccount}
        data={account}
        setData={setAccount}
        createData={createAccount}
        refetch={refetch}
        updateData={updateAccount}
        deleteData={deleteAccount}
        defaultData={{ACCOUNT_NO: '', BRANCH_ID: '', BALANCE:'', RECENT_ACCESS_DATE: '', TYPE: '', INTEREST_RATE: '', OVERDRAFTS: '' }}
      />
    </>
  );
}

export default Account;