import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { getBranchReport } from "../../graphql/queries/reportQueries";
import Table from "../layout/table";

const BranchReport = () => {
  const { data } = useQuery(getBranchReport);
  const [branchReport, setBranchReport] = useState([])

  useEffect(() => {
    if (data) {
      setBranchReport(data.getBranchReport)
    }
  }, [data])
  
  return (
    <>
      <h4>Branch Report</h4>
      <Table tableHeaders={['BRANCH ID', 'TOTAL LOANS', 'OUTSTANDING BALANCE', 'TOTAL ACCOUNTS', 'TOTAL BALANCE',]} tableRows={branchReport} manageRow={() => {}} />
    </>
  );
}

export default BranchReport;