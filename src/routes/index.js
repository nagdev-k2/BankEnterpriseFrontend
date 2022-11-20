import { AiFillHome, AiFillDatabase } from 'react-icons/ai';
import { BsBank2, BsFillPeopleFill }  from 'react-icons/bs';
import { IoMdGitBranch, IoIosPeople }  from 'react-icons/io';
import { GiBassetHoundHead, GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { MdAccountBalanceWallet }  from 'react-icons/md';
import Home from '../components/home';
import Banks from '../components/banks';
import Branches from '../components/branches';
import Assetes from '../components/assets';
import Customers from '../components/customers';
import Employees from '../components/employees';
import Accounts from '../components/accounts';
import Records from '../components/records';
import Loans from '../components/loans';
import Dependents from '../components/dependents';
import LoanPayment from '../components/loanPayments';

const routes = [
  {name: 'Home', icon: (<AiFillHome />), id: 0, component: <Home />},
  {name: 'Banks', icon: (<BsBank2/>), id: 1, component: <Banks />},
  {name: 'Branches', icon: (<IoMdGitBranch/>), id: 2, component: <Branches />},
  {name: 'Assets', icon: (<GiBassetHoundHead />), id: 3, component: <Assetes />},
  {name: 'Customers', icon: (<BsFillPeopleFill />), id: 4, component: <Customers />},
  {name: 'Employees', icon: (<IoIosPeople />), id: 5, component: <Employees />},
  {name: 'Dependents', icon: (<IoIosPeople />), id: 6, component: <Dependents />},
  {name: 'Accounts', icon: (<MdAccountBalanceWallet/>), id: 7, component: <Accounts />},
  {name: 'Records', icon: (<AiFillDatabase/>), id: 8, component: <Records />},
  {name: 'Loans', icon: (<GiReceiveMoney/>), id: 9, component: <Loans />},
  {name: 'Loan Payment', icon: (<GiPayMoney/>), id: 10, component: <LoanPayment />},
];

export default routes;