import React from 'react';
import { isEmpty, map } from 'lodash';
import { MdOutlineEditNote } from 'react-icons/md';

const Table = ({ tableHeaders, tableRows, manageRow }) => isEmpty(tableRows) ? (
  <h5 className='no-data' > No Data Available </h5>
) : (
  <table className='table'>
    <thead>
      <tr className='table-row'>
        {map(tableHeaders, head => (
          <th className='table-head' key={`table-head-${head}`}>{head}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {map(tableRows, (row, index) => (
        <tr className='table-row' key={`table-row-${index}`}>
          {map(row, (col, index) => index !== '__typename' ? (<td onClick={() => manageRow(row)} className='table-col' key={`table-col-${index}`}>{col}</td>) : null)}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;