import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_BRANCH, UPDATE_BRANCH, DELETE_BRANCH } from '../../graphql/mutations/branchMutations';
import Loading from "../layout/loading";
import { getAllBranches } from "../../graphql/queries/branchQueries";
import Table from "../layout/table";
import BranchModal from '../modals/branch';
import './index.css'

const Branch = () => {
  const { error, loading, data, refetch } = useQuery(getAllBranches);
  const [branches, setBranches] = useState([]);
  const [showBranchModal, setShowBranchModal] = useState(false);
  const [searchedBranch, setSearchedBranches] = useState(branches);
  const [selectedBranch, setSelectedBank] = useState({});
  const [branch, setBranch] = useState({
    BANK_ID: isEmpty(selectedBranch) ? '' : selectedBranch.BANK_ID,
    BRANCH_ID: isEmpty(selectedBranch) ? '' : selectedBranch.BRANCH_ID,
    CITY: isEmpty(selectedBranch) ? '' : selectedBranch.CITY,
    BRANCH_NAME: isEmpty(selectedBranch) ? '' : selectedBranch.BRANCH_NAME,
  })
  const [createBranch, {err1, result1}] = useMutation(CREATE_BRANCH, {
    variables: {branch}
  })
  const [updateBranch, {err2, result2}] = useMutation(UPDATE_BRANCH, {
    variables: {branch}
  })
  const [deleteBranch, {err3, result3}] = useMutation(DELETE_BRANCH, {
    variables: {branchId: branch.BRANCH_ID}
  })

  let branchList = branches;

  useEffect(() => {
    if (data) {
      setBranches(data.getAllBranches);
      setSearchedBranches(data.getAllBranches)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) branchList = filter(branchList, b => includes(lowerCase(b.BANK_NAME), lowerCase(name)))
    else branchList = branches;
    setSearchedBranches(branchList);
  }

  const addBranch = () => {
    setSelectedBank({});
    setShowBranchModal(true)
  }

  const manageBranch = (row) => {
    setSelectedBank(row);
    setBranch(row);
    setShowBranchModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Branch Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addBranch}>Add New Branch</Button>
      </div>
      <Table tableHeaders={['BANK ID', 'BRANCH ID', 'Name', 'CITY']} tableRows={searchedBranch} manageRow={manageBranch}  />
      <BranchModal
        show={showBranchModal}
        setShow={setShowBranchModal}
        selectedBranch={selectedBranch}
        branch={branch}
        setBranch={setBranch}
        createBranch={createBranch}
        refetch={refetch}
        updateBranch={updateBranch}
        deleteBranch={deleteBranch}
      />
    </>
  );
}

export default Branch;