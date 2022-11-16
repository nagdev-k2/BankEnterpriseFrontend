import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { map } from 'lodash';

import { getAllBanks } from "../../graphql/queries/bankQueries";
import Layout from "../layout";
import './index.css'

const Home = () => {
  const { error, loading, data } = useQuery(getAllBanks);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    if (data) setBanks(data.getAllBanks);
  }, [data]);

  return (
    <Layout isLoading={loading}>
      <h1>All Banks</h1>
      <div>
        {map(banks, bank => (
          <h4 key={bank.BANK_ID}>{bank.BANK_NAME}</h4>
        ))}
      </div>
    </Layout>
  );
}

export default Home;