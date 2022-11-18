import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Form } from 'react-bootstrap';

const Bank = ({ show, setShow, selectedBank, bank, setBank, createBank, refetch, updateBank, deleteBank }) => {
  let isEdit = false;
  if (!isEmpty(selectedBank)) isEdit = true;
  const handleClose = () => {
    setBank({BANK_ID: '', BANK_NAME:''})
    setShow(false);
  }

  const updateData = (e) => {
    setBank({
      ...bank,
      [e.target.name]: e.target.value
    })
  }

  const saveBank = () => {
    if (isEdit) updateBank();
    else createBank();
    refetch();
    handleClose();
  }

  const deleteBankData = () => {
    deleteBank();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Bank' : 'Add Bank'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control name="BANK_ID" className="input-field" type="text" placeholder="Bank ID" value={bank.BANK_ID} onChange={updateData} disabled={isEdit} />
          <Form.Control name="BANK_NAME" className="input-field" type="text" placeholder="Bank Name" value={bank.BANK_NAME} onChange={updateData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEdit && (
            <Button variant="danger" onClick={deleteBankData}>
              Delete Bank
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

export default Bank;