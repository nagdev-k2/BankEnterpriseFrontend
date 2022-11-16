import { React, useState } from 'react';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import { AiFillHome, AiFillDatabase } from 'react-icons/ai';
import { BsBank2, BsFillPeopleFill }  from 'react-icons/bs';
import { IoMdGitBranch, IoIosPeople }  from 'react-icons/io';
import { GiBassetHoundHead, } from 'react-icons/gi';
import { MdAccountBalanceWallet }  from 'react-icons/md';

const Sidebar = () => {
  const btns = [
    {name: 'Home', icon: (<AiFillHome />), id: 0},
    {name: 'Banks', icon: (<BsBank2/>), id: 1},
    {name: 'Branches', icon: (<IoMdGitBranch/>), id: 2},
    {name: 'Assets', icon: (<GiBassetHoundHead />), id: 3},
    {name: 'Customers', icon: (<BsFillPeopleFill />), id: 4},
    {name: 'Employees', icon: (<IoIosPeople />), id: 5},
    {name: 'Accounts', icon: (<MdAccountBalanceWallet/>), id: 6},
    {name: 'Records', icon: (<AiFillDatabase/>), id: 7}
  ]
  const [activeMenuId, setMenuActive] = useState(0);
  const changeMenu = (btnId) => {
    setMenuActive(btnId)
  }
  return (
    <div className='sidebar'>
      {map(btns, btn => (
        <Button className={`menu-btn ${activeMenuId == btn.id ? 'active' : ''}`} key={`btn-${btn.id}`} onClick={() => changeMenu(btn.id)}>
          {btn.icon}
          <h4 className='menu-btn-title'>{btn.name}</h4>
        </Button>
      ))}
    </div>
);}

export default Sidebar;