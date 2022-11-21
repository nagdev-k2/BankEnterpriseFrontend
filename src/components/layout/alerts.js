import { React } from 'react';
import Alert from 'react-bootstrap/Alert';

const CustomAlert = ({ error }) =>
  (error != undefined) ? (
    <Alert variant="danger">
      <h4>Something went wrong</h4>
      {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}> {message} </span>
      ))}
    </Alert>
  ) : null;

export default CustomAlert;