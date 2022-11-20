import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { getBranchReport, getWeeklyReport } from "../../graphql/queries/reportQueries";
import Table from "../layout/table";

const Home = () => {
  const { data } = useQuery(getBranchReport);
  const [branchReport, setBranchReport] = useState([])

  useEffect(() => {
    if (data) {
      setBranchReport(data.getBranchReport)
    }
  }, [data])
  // const { data } = useQuery(getWeeklyReport);
  
  return (
    <>
      <h1>Reports</h1>
      <h4>Branch Report</h4>
      <Table tableHeaders={['BRANCH ID', 'TOTAL LOANS', 'OUTSTANDING BALANCE', 'TOTAL ACCOUNTS', 'TOTAL BALANCE',]} tableRows={branchReport} manageRow={() => {}} />
      <h4>Weekly Report</h4>
      {/* <Table tableHeaders={['BRANCH_ID', 'TOTAL_LOANS', 'OUTSTANDING_BALANCE', 'TOTAL_ACCOUNTS', 'TOTAL_BALANCE',]} tableRows={getBranchReport} manageRow={() => {}} /> */}
    </>
  );
}

export default Home;