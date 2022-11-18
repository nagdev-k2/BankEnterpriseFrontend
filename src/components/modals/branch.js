import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Form } from 'react-bootstrap';

const Branch = ({ show, setShow, selectedBranch, branch, setBranch, createBranch, refetch, updateBranch, deleteBranch }) => {
  let isEdit = false;
  if (!isEmpty(selectedBranch)) isEdit = true;

  const handleClose = () => {
    setBranch({BANK_ID: '', BRANCH_NAME:'', BANK_ID: '', CITY: ''});
    setShow(false);
  }

  const updateData = (e) => {
    setBranch({
      ...branch,
      [e.target.name]: e.target.value
    })
  }

  const saveBank = () => {
    if (isEdit) updateBranch();
    else createBranch();
    refetch();
    handleClose();
  }

  const deleteBankData = () => {
    deleteBranch();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Branch' : 'Add Branch'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control name="BANK_ID" className="input-field" type="text" placeholder="Bank ID" value={branch.BANK_ID} onChange={updateData} disabled={isEdit} />
          <Form.Control name="BRANCH_ID" className="input-field" type="text" placeholder="Branch ID" value={branch.BRANCH_ID} onChange={updateData} disabled={isEdit} />
          <Form.Control name="BRANCH_NAME" className="input-field" type="text" placeholder="Branch Name" value={branch.BRANCH_NAME} onChange={updateData} />
          <Form.Control name="CITY" className="input-field" type="text" placeholder="City" value={branch.CITY} onChange={updateData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEdit && (
            <Button variant="danger" onClick={deleteBankData}>
              Delete Branch
            </Button>
          )}
          <Button variant="primary" onClick={saveBank}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Branch;