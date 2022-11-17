import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, lowerCase } from 'lodash';

import Loading from "../layout/loading";
import { getAllBanks } from "../../graphql/queries/bankQueries";
import Table from "../layout/table";
import './index.css'

const Home = () => {
  const { error, loading, data } = useQuery(getAllBanks);
  const [banks, setBanks] = useState([]);
  const [searchedBanks, setSearchedBanks] = useState(banks);

  let banksList = banks;

  useEffect(() => {
    if (data) {
      setBanks(data.getAllBanks);
      setSearchedBanks(data.getAllBanks)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) banksList = filter(banksList, bank => includes(lowerCase(bank.BANK_NAME), lowerCase(name)))
    else banksList = banks;
    setSearchedBanks(banksList);
  }
  
  return (
    <>
      <Loading isLoading={loading} />
      <div>
        <Form.Control className="input-field" type="text" placeholder="Search Bank Name" onKeyUp={onSearch} />
      </div>
      <Table tableHeaders={['ID', 'Name']} tableRows={searchedBanks} manageRow={(row) => alert(row.BANK_ID)}  />
    </>
  );
}

export default Home;