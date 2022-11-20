import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown'
import { isEmpty, map, includes, isEqual } from 'lodash';
import { Form } from 'react-bootstrap';


const Input = ({ k, data, index, updateFieldData, isEdit, title }) => {
  let opts = ['DEPOSIT', 'WITHDRAW'];
  if (isEqual(title, 'Account')) opts = ['SAVINGS', 'CHECKINGS', 'CD ACCOUNT']
  if (isEqual(k, 'TYPE')) {
    return (
      <Dropdown>
        <Dropdown.Toggle className='dropdown' variant={'secondary'} id="dropdown-basic">
          {k}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {map(opts, (opt, index) => (
            <Dropdown.Item key={`${index}-${opt}`} id={opt}>{opt}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return (
      <Form.Control
        className="input-field"
        type="text"  
        key={`form-control-${k}-${index}`}
        name={k}
        placeholder={k}
        value={data[k]}
        onChange={updateFieldData}
        disabled={includes(k, 'ID') && isEdit} />
    )
  }
}

const CustomModal = ({ show, title, defaultData, setShow, selectedData, data, setData, createData, refetch, updateData, deleteData }) => {
  let isEdit = false;
  if (!isEmpty(selectedData)) isEdit = true;

  const handleClose = () => {
    setData(defaultData);
    setShow(false);
  }

  const updateFieldData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const saveData = () => {
    if (isEdit) updateData();
    else createData();
    refetch();
    handleClose();
  }

  const deleteSelectedData = () => {
    deleteData();
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? `Edit ${title}` : `Add ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {map(Object.keys(data), (k, index) =>(
            !isEqual(k, '__typename')
            && (isEqual(title, 'Customer')
           || isEqual(title, 'Employee')
           || !isEqual(Object.keys(defaultData)[0], k))) && (
            <Input
              key={`form-control-${k}-${index}`}
              k={k}
              title={title}
              index={index}
              data={data[k]}
              value={data[k]}
              updateFieldData={updateFieldData}
              isEdit={isEdit} />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {isEdit && (
            <Button variant="danger" onClick={deleteSelectedData}>
              Delete Data
            </Button>
          )}
          <Button variant="primary" onClick={saveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomModal;