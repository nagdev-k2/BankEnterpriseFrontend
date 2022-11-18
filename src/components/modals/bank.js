import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isEmpty } from 'lodash';
import { Form } from 'react-bootstrap';

const Bank = ({ show, setShow, selectedData, data, setData, createData, refetch, updateData, deleteData }) => {
  let isEdit = false;
  if (!isEmpty(selectedData)) isEdit = true;
  const handleClose = () => {
    setData({BANK_ID: '', BANK_NAME:''})
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
          <Modal.Title>{isEdit ? 'Edit Bank' : 'Add Bank'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control name="BANK_ID" className="input-field" type="text" placeholder="Bank ID" value={data.BANK_ID} onChange={updateFieldData} disabled={isEdit} />
          <Form.Control name="BANK_NAME" className="input-field" type="text" placeholder="Bank Name" value={data.BANK_NAME} onChange={updateFieldData} />
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