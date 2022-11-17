import React from 'react';
import { map } from 'lodash';
import { AiFillEdit } from 'react-icons/ai';

const Table = ({ tableHeaders, tableRows, manageRow }) => (
  <table className='table'>
    <thead>
      <tr className='table-row'>
        {map(tableHeaders, head => (
          <th className='table-head' key={`table-head-${head}`}>{head}</th>
        ))}
        <th className='table-head' key={`table-head-mng`}>Manage</th>
      </tr>
    </thead>
    <tbody>
      {map(tableRows, (row, index) => (
        <tr className='table-row' key={`table-row-${index}`}>
          {map(row, (col, index) => index !== '__typename' ? (<td className='table-col' key={`table-col-${index}`}>{col}</td>) : null)}
          <td className='table-col center' key={`table-col-mng`} onClick={() => manageRow(row)}> <AiFillEdit /> </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;