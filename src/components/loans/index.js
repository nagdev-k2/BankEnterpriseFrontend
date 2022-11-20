import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_LOAN, UPDATE_LOAN, DELETE_LOAN } from '../../graphql/mutations/loanMutations';
import Loading from "../layout/loading";
import { getAllLoans } from "../../graphql/queries/loanQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const Loan = () => {
  const { error, loading, data, refetch } = useQuery(getAllLoans);
  const [loans, setLoans] = useState([]);
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [searchedLoan, setSearchedLoan] = useState(loans);
  const [selectedLoan, setSelectedLoan] = useState({});
  const [loan, setLoan] = useState({
    LOAN_NO: isEmpty(selectedLoan) ? '' : selectedLoan.LOAN_NO,
    LOAN_OFFICER_SSN: isEmpty(selectedLoan) ? '' : selectedLoan.LOAN_OFFICER_SSN,
    BRANCH_ID: isEmpty(selectedLoan) ? '' : selectedLoan.BRANCH_ID,
    AMOUNT: isEmpty(selectedLoan) ? '' : selectedLoan.AMOUNT,
    LOAN_TYPE: isEmpty(selectedLoan) ? '' : selectedLoan.LOAN_TYPE,
    CREDIT_LIMIT: isEmpty(selectedLoan) ? '' : selectedLoan.CREDIT_LIMIT,
    CREDIT_RATING: isEmpty(selectedLoan) ? '' : selectedLoan.CREDIT_RATING,
    INTEREST_RATE: isEmpty(selectedLoan) ? '' : selectedLoan.INTEREST_RATE,
  })
  const [createLoan, {err1, result1}] = useMutation(CREATE_LOAN, {
    variables: {loan: {
      LOAN_OFFICER_SSN: loan.LOAN_OFFICER_SSN,
      BRANCH_ID: loan.BRANCH_ID,
      AMOUNT: loan.AMOUNT,
      LOAN_TYPE: loan.LOAN_TYPE,
      CREDIT_LIMIT: loan.CREDIT_LIMIT,
      CREDIT_RATING: loan.CREDIT_RATING,
      INTEREST_RATE: loan.INTEREST_RATE,
    }}
  })
  const [updateLoan, {err2, result2}] = useMutation(UPDATE_LOAN, {
    variables: {loan}
  })
  const [deleteLoan, {err3, result3}] = useMutation(DELETE_LOAN, {
    variables: {loanNo: loan.LOAN_NO}
  })

  let loanList = loans;

  useEffect(() => {
    if (data) {
      setLoans(data.getAllLoans);
      setSearchedLoan(data.getAllLoans)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) loanList = filter(loanList, b => includes(lowerCase(b.DATE), lowerCase(name)))
    else loanList = loans;
    setSearchedLoan(loanList);
  }

  const addLoan = () => {
    setSelectedLoan({});
    setShowLoanModal(true)
  }

  const manageLoan = (row) => {
    setSelectedLoan(row);
    setLoan(row);
    setShowLoanModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Loan Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addLoan}>Add New Loan</Button>
      </div>
      <Table tableHeaders={['LOAN NO', 'LOAN OFFICER SSN', 'BRANCH ID', 'AMOUNT', 'LOAN TYPE', 'CREDIT LIMIT', 'CREDIT RATING', 'INTEREST RATE']} tableRows={searchedLoan} manageRow={manageLoan}  />
      <CustomModal
        title='Loan'
        show={showLoanModal}
        setShow={setShowLoanModal}
        selectedData={selectedLoan}
        data={loan}
        setData={setLoan}
        createData={createLoan}
        refetch={refetch}
        updateData={updateLoan}
        deleteData={deleteLoan}
        defaultData={{LOAN_NO: '', LOAN_OFFICER_SSN: '', BRANCH_ID: '', AMOUNT: '', LOAN_TYPE: '', CREDIT_LIMIT: '', CREDIT_RATING: '', INTEREST_RATE: ''}}
      />
    </>
  );
}

export default Loan;