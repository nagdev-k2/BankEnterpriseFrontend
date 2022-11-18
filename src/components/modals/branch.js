import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Form } from 'react-bootstrap';

const Branch = ({ show, setShow, selectedData, data, setData, createData, refetch, updateData, deleteData }) => {
  let isEdit = false;
  if (!isEmpty(selectedData)) isEdit = true;

  const handleClose = () => {
    setData({BANK_ID: '', BRANCH_NAME:'', BANK_ID: '', CITY: ''});
    setShow(false);
  }

  const updateFieldData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const saveBank = () => {
    if (isEdit) updateData();
    else createData();
    refetch();
    handleClose();
  }

  const deleteBankData = () => {
    deleteData();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Branch' : 'Add Branch'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control name="BANK_ID" className="input-field" type="text" placeholder="Bank ID" value={data.BANK_ID} onChange={updateFieldData} disabled={isEdit} />
          <Form.Control name="BRANCH_ID" className="input-field" type="text" placeholder="Branch ID" value={data.BRANCH_ID} onChange={updateFieldData} disabled={isEdit} />
          <Form.Control name="BRANCH_NAME" className="input-field" type="text" placeholder="Branch Name" value={data.BRANCH_NAME} onChange={updateFieldData} />
          <Form.Control name="CITY" className="input-field" type="text" placeholder="City" value={data.CITY} onChange={updateFieldData} />
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