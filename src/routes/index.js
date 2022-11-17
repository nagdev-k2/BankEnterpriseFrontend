import { AiFillHome, AiFillDatabase } from 'react-icons/ai';
import { BsBank2, BsFillPeopleFill }  from 'react-icons/bs';
import { IoMdGitBranch, IoIosPeople }  from 'react-icons/io';
import { GiBassetHoundHead, } from 'react-icons/gi';
import { MdAccountBalanceWallet }  from 'react-icons/md';
import Home from '../components/home';
import Bank from '../components/banks';

const routes = [
  {name: 'Home', icon: (<AiFillHome />), id: 0, component: <Home />},
  {name: 'Banks', icon: (<BsBank2/>), id: 1, component: <Bank />},
  {name: 'Branches', icon: (<IoMdGitBranch/>), id: 2, component: <></>},
  {name: 'Assets', icon: (<GiBassetHoundHead />), id: 3, component: <></>},
  {name: 'Customers', icon: (<BsFillPeopleFill />), id: 4, component: <></>},
  {name: 'Employees', icon: (<IoIosPeople />), id: 5, component: <></>},
  {name: 'Accounts', icon: (<MdAccountBalanceWallet/>), id: 6, component: <></>},
  {name: 'Records', icon: (<AiFillDatabase/>), id: 7, component: <></>}
];

export default routes;