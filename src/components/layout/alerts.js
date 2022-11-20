import { React } from 'react';
import { Alert } from 'react-bootstrap';

const CustomAlert = ({ msg, type }) => (
  <Alert bsStyle={type}>
    <p>{msg}</p>
  </Alert>
);

export default CustomAlert;