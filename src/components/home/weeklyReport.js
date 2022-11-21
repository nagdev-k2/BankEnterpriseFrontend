import { React, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { getWeeklyReport } from "../../graphql/queries/reportQueries";
import Table from "../layout/table";
import CustomAlert from "../layout/alerts";
import Loading from "../layout/loading";

const WeeklyReport = () => {
  const { error, loading, data } = useQuery(getWeeklyReport, { errorPolicy: "all" });
  const [weeklyReport, setWeeklyReport] = useState([])

  useEffect(() => {
    if (data) {
      setWeeklyReport(data.getWeeklyReport)
    }
  }, [data])

  if (loading) return <Loading isLoading={loading} />;
  return (
    <>
      <CustomAlert error={error} />
      <h4>Weekly Report</h4>
      <Table tableHeaders={['BRANCH ID', 'WEEK START DATE', 'LOAN OFFICER', 'NO OF LOAN HANDLED', 'TYPE', 'TOTAL AMOUNT DEPOSITED']} tableRows={weeklyReport} manageRow={() => {}} />
    </>
  );
}

export default WeeklyReport;