import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from '../../graphql/mutations/employeeMutations';
import Loading from "../layout/loading";
import { getAllEmployees } from "../../graphql/queries/employeeQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const Employee = () => {
  const { error, loading, data, refetch } = useQuery(getAllEmployees);
  const [employees, setEmployees] = useState([]);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [searchedEmployee, setSearchedEmployee] = useState(employees);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [employee, setEmployee] = useState({
    SSN: isEmpty(selectedEmployee) ? '' : selectedEmployee.SSN,
    BRANCH_ID: isEmpty(selectedEmployee) ? '' : selectedEmployee.BRANCH_ID,
    NAME: isEmpty(selectedEmployee) ? '' : selectedEmployee.NAME,
    TELEPHONE: isEmpty(selectedEmployee) ? '' : selectedEmployee.TELEPHONE,
    ROLE: isEmpty(selectedEmployee) ? '' : selectedEmployee.ROLE,
    MANAGER_SSN: isEmpty(selectedEmployee) ? '' : selectedEmployee.MANAGER_SSN,
    START_DATE: isEmpty(selectedEmployee) ? '' : selectedEmployee.START_DATE
  })
  const [createEmployee, {err1, result1}] = useMutation(CREATE_EMPLOYEE, {
    variables: {employee}
  })
  const [updateEmployee, {err2, result2}] = useMutation(UPDATE_EMPLOYEE, {
    variables: {employee}
  })
  const [deleteEmployee, {err3, result3}] = useMutation(DELETE_EMPLOYEE, {
    variables: {ssn: employee.SSN}
  })

  let employeeList = employees;

  useEffect(() => {
    if (data) {
      setEmployees(data.getAllEmployees);
      setSearchedEmployee(data.getAllEmployees)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) employeeList = filter(employeeList, b => includes(lowerCase(b.NAME), lowerCase(name)))
    else employeeList = employees;
    setSearchedEmployee(employeeList);
  }

  const addEmployee = () => {
    setSelectedEmployee({});
    setShowEmployeeModal(true)
  }

  const manageEmployee = (row) => {
    setSelectedEmployee(row);
    setEmployee(row);
    setShowEmployeeModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Employee Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addEmployee}>Add New Employee</Button>
      </div>
      <Table tableHeaders={['SSN', 'BRANCH ID' , 'NAME', 'TELEPHONE', 'ROLE', 'MANAGER SSN', 'START DATE', 'LENGTH OF EMPLOYMENT']} tableRows={searchedEmployee} manageRow={manageEmployee}  />
      <CustomModal
        title='Employee'
        show={showEmployeeModal}
        setShow={setShowEmployeeModal}
        selectedData={selectedEmployee}
        data={employee}
        setData={setEmployee}
        createData={createEmployee}
        refetch={refetch}
        updateData={updateEmployee}
        deleteData={deleteEmployee}
        defaultData={{SSN: '', BRANCH_ID: '', NAME:'', TELEPHONE: '', ROLE: '', MANAGER_SSN: '', START_DATE: ''}}
      />
    </>
  );
}

export default Employee;