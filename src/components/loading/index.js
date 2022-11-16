import { React } from 'react';

import './index.css';

const Loading = ({ isLoading }) => isLoading ? (
  <div className='overlay'>
    <h5>Loading. Please Wait!!!</h5>
  </div>
) : null;

export default Loading;