import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../../graphql/mutations/customerMutations';
import Loading from "../layout/loading";
import { getAllCustomers } from "../../graphql/queries/customerQueries";
import Table from "../layout/table";
import CustomModal from '../modals';
import './index.css'

const Customer = () => {
  const { error, loading, data, refetch } = useQuery(getAllCustomers);
  const [customers, setCustomers] = useState([]);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [searchedCustomer, setSearchedCustomer] = useState(customers);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [customer, setCustomer] = useState({
    SSN: isEmpty(selectedCustomer) ? '' : selectedCustomer.SSN,
    NAME: isEmpty(selectedCustomer) ? '' : selectedCustomer.NAME,
    STREET: isEmpty(selectedCustomer) ? '' : selectedCustomer.STREET,
    CITY: isEmpty(selectedCustomer) ? '' : selectedCustomer.CITY,
    ASSOCIATED_EMPLOYEE_SSN: isEmpty(selectedCustomer) ? '' : selectedCustomer.ASSOCIATED_EMPLOYEE_SSN,
    ASSOCIATED_EMPLOYEE_TYPE: isEmpty(selectedCustomer) ? '' : selectedCustomer.ASSOCIATED_EMPLOYEE_TYPE,
  })
  const [createCustomer, {err1, result1}] = useMutation(CREATE_CUSTOMER, {
    variables: {customer}
  })
  const [updateCustomer, {err2, result2}] = useMutation(UPDATE_CUSTOMER, {
    variables: {customer}
  })
  const [deleteCustomer, {err3, result3}] = useMutation(DELETE_CUSTOMER, {
    variables: {ssn: customer.SSN}
  })

  let customerList = customers;

  useEffect(() => {
    if (data) {
      setCustomers(data.getAllCustomers);
      setSearchedCustomer(data.getAllCustomers)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) customerList = filter(customerList, b => includes(lowerCase(b.NAME), lowerCase(name)))
    else customerList = customers;
    setSearchedCustomer(customerList);
  }

  const addCustomer = () => {
    setSelectedCustomer({});
    setShowCustomerModal(true)
  }

  const manageCustomer = (row) => {
    setSelectedCustomer(row);
    setCustomer(row);
    setShowCustomerModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Customer Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addCustomer}>Add New Customer</Button>
      </div>
      <Table tableHeaders={['SSN', 'NAME', 'STREET', 'CITY', 'ASSOCIATED EMPLOYEE SSN', 'ASSOCIATED EMPLOYEE ROLE']} tableRows={searchedCustomer} manageRow={manageCustomer}  />
      <CustomModal
        title='Customer'
        show={showCustomerModal}
        setShow={setShowCustomerModal}
        selectedData={selectedCustomer}
        data={customer}
        setData={setCustomer}
        createData={createCustomer}
        refetch={refetch}
        updateData={updateCustomer}
        deleteData={deleteCustomer}
        defaultData={{SSN: '', NAME:'', STREET: '', CITY: '', ASSOCIATED_EMPLOYEE_SSN: '', ASSOCIATED_EMPLOYEE_TYPE: ''}}
      />
    </>
  );
}

export default Customer;