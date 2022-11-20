import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_DEPENDENT, UPDATE_DEPENDENT, DELETE_DEPENDENT } from '../../graphql/mutations/dependentMutations';
import Loading from "../layout/loading";
import { getAllDependents } from "../../graphql/queries/dependentQueries";
import Table from "../layout/table";
import CustomModal from '../modals';

const Dependent = () => {
  const { error, loading, data, refetch } = useQuery(getAllDependents);
  const [dependents, setDependents] = useState([]);
  const [showDependentModal, setShowDependentModal] = useState(false);
  const [searchedDependent, setSearchedDependent] = useState(dependents);
  const [selectedDependent, setSelectedDependent] = useState({});
  const [dependent, setDependent] = useState({
    DEPENDENT_ID: isEmpty(selectedDependent) ? '' : selectedDependent.DEPENDENT_ID,
    EMPLOYEE_SSN: isEmpty(selectedDependent) ? '' : selectedDependent.EMPLOYEE_SSN,
    DEPENDENT_SSN: isEmpty(selectedDependent) ? '' : selectedDependent.DEPENDENT_SSN,
    NAME: isEmpty(selectedDependent) ? '' : selectedDependent.NAME,
  })
  const [createDependent, {err1, result1}] = useMutation(CREATE_DEPENDENT, {
    variables: {dependent: {
      EMPLOYEE_SSN: dependent.EMPLOYEE_SSN,
      DEPENDENT_SSN: dependent.DEPENDENT_SSN,
      NAME: dependent.NAME,
    }}
  })
  const [updateDependent, {err2, result2}] = useMutation(UPDATE_DEPENDENT, {
    variables: {dependent}
  })
  const [deleteDependent, {err3, result3}] = useMutation(DELETE_DEPENDENT, {
    variables: {dependentId: dependent.DEPENDENT_ID}
  })

  let dependentList = dependents;

  useEffect(() => {
    if (data) {
      setDependents(data.getAllDependents);
      setSearchedDependent(data.getAllDependents)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) dependentList = filter(dependentList, b => includes(lowerCase(b.DEPENDENT_SSN), lowerCase(name)))
    else dependentList = dependents;
    setSearchedDependent(dependentList);
  }

  const addDependent = () => {
    setSelectedDependent({});
    setShowDependentModal(true)
  }

  const manageDependent = (row) => {
    setSelectedDependent(row);
    setDependent(row);
    setShowDependentModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Dependent Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addDependent}>Add New Dependent</Button>
      </div>
      <Table tableHeaders={['DEPENDENT ID', 'DEPENDENT SSN', 'EMPLOYEE SSN', 'NAME']} tableRows={searchedDependent} manageRow={manageDependent}  />
      <CustomModal
        title='Dependent'
        show={showDependentModal}
        setShow={setShowDependentModal}
        selectedData={selectedDependent}
        data={dependent}
        setData={setDependent}
        createData={createDependent}
        refetch={refetch}
        updateData={updateDependent}
        deleteData={deleteDependent}
        defaultData={{DEPENDENT_ID: '', EMPLOYEE_SSN: '', DEPENDENT_SSN:'', NAME: ''}}
      />
    </>
  );
}

export default Dependent;