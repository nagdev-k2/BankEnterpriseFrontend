import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown'
import { isEmpty, map, includes, isEqual } from 'lodash';
import { Form } from 'react-bootstrap';


const Input = ({ k, data, index, updateFieldData, isEdit, title }) => {  
  const onChange = (e) => {
    let ev = {target: { name: k, value: e.target.id }}
    updateFieldData(ev);
  }
  let opts = [];
  if (isEqual(title, 'Asset')) opts = ['Electronics', 'Stationary', 'Automobile', 'Other']
  if (isEqual(title, 'Loan')) opts = ['Personal', 'Car', 'Educational', 'Home', 'Other']
  if (isEqual(title, 'Record')) opts = ['DEPOSIT', 'WITHDRAW']
  if (isEqual(title, 'Account')) opts = ['SAVINGS', 'CHECKINGS', 'CD ACCOUNT']
  if (isEqual(title, 'Customer')) opts = ['PERSONAL BANKER', 'LOAN OFFICER']
  if (includes(k, 'TYPE')) {
    return (
      <Dropdown name={k} onSelect={(_, e) => onChange(e)}>
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
        value={data}
        onChange={updateFieldData}
        disabled={(includes(k, 'ID') || isEqual(k, 'SSN')) && isEdit} />
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
    if(
      includes(e.target.name, 'SSN')
      || includes(e.target.name, 'COST')
      || includes(e.target.name, 'RATE')
      || includes(e.target.name, 'CREDIT')
      || includes(e.target.name, 'AMOUNT')
      || includes(e.target.name, 'OVERDRAFTS')  ) {
      setData({
        ...data,
        [e.target.name]: parseInt(e.target.value)
      })  
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    }
  }

  const saveData = () => {
    if (isEdit) {updateData()}
    else {createData()}
    refetch();
    handleClose();
  }

  const deleteSelectedData = () => {
    deleteData();
    refetch();
    handleClose();
  }
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? `Edit ${title}` : `Add ${title}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {map(Object.keys(data), (k, index) =>(
            !isEqual(k, 'LENGTH_OF_EMPLOYMENT')
            && !isEqual(k, 'RECENT_ACCESS_DATE')
            && (isEqual(title, 'Customer')
           || isEqual(title, 'Employee')
           || isEqual(title, 'Record')
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