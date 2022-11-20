import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_LOAN_PAYMENT } from '../../graphql/mutations/loanPaymentMutations';
import Loading from "../layout/loading";
import { getAllLoanPayments } from "../../graphql/queries/loanPaymentQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const LoanPayment = () => {
  const { error, loading, data, refetch } = useQuery(getAllLoanPayments);
  const [loanPayments, setLoanPayments] = useState([]);
  const [showLoanPaymentModal, setShowLoanPaymentModal] = useState(false);
  const [searchedLoanPayment, setSearchedLoanPayment] = useState(loanPayments);
  const [selectedLoanPayment, setSelectedLoanPayment] = useState({});
  const [loanPayment, setLoanPayment] = useState({
    TRANS_ID: isEmpty(selectedLoanPayment) ? '' : selectedLoanPayment.TRANS_ID,
    LOAN_NO: isEmpty(selectedLoanPayment) ? '' : selectedLoanPayment.LOAN_NO,
    AMOUNT: isEmpty(selectedLoanPayment) ? '' : selectedLoanPayment.AMOUNT,
    DATE: isEmpty(selectedLoanPayment) ? '' : selectedLoanPayment.DATE,
  })
  const [createLoanPayment, {err1, result1}] = useMutation(CREATE_LOAN_PAYMENT, {
    variables: {loan_payments: loanPayment}
  })

  useEffect(() => {
    if (data) {
      setLoanPayments(data.getAllLoanPayments);
      setSearchedLoanPayment(data.getAllLoanPayments)
    }
  }, [data]);

  const addLoanPayment = () => {
    setSelectedLoanPayment({});
    setShowLoanPaymentModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        {/* <Form.Control className="input-field" type="text" placeholder="Search LoanPayment Name" onKeyUp={onSearch} /> */}
        <Button className="add-btn" onClick={addLoanPayment}>Add New LoanPayment</Button>
      </div>
      <Table tableHeaders={['TRANSCATION NO', 'LOAN NO', 'AMOUNT', 'DATE']} tableRows={searchedLoanPayment} manageRow={() => {}} />
      <CustomModal
        title='Loan Payment'
        show={showLoanPaymentModal}
        setShow={setShowLoanPaymentModal}
        selectedData={selectedLoanPayment}
        data={loanPayment}
        setData={setLoanPayment}
        createData={createLoanPayment}
        refetch={refetch}
        defaultData={{TRANS_ID: '', LOAN_NO: '', AMOUNT:'', DATE: ''}}
      />
    </>
  );
}

export default LoanPayment;