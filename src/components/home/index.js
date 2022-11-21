import { React } from "react";

import BranchReport from "./branchReport";
import WeeklyReport from "./weeklyReport";

const Home = () =>(
  <>
    <h2>Reports</h2>
    <BranchReport />
    <WeeklyReport />    
  </>
);

export default Home;