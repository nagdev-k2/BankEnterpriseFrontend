import { React, useState } from 'react';
import { map } from 'lodash';

import Header from './header';
import Sidebar from './sidebar';
import Loading from './loading';
import Routes from '../../routes';
import './index.css'

const Layout = ({ children, isLoading }) => {
  const [activeMenuId, setMenuActive] = useState(0);
  const changeMenu = (btnId) => {
    setMenuActive(btnId);
  }
  return (
  <>
    <Loading isLoading={isLoading} />
    <Header />
    <div className='body'>
      <Sidebar activeMenuId={activeMenuId} changeMenu={changeMenu} />
      <div className='content'>
        {map(Routes, route => route.id == activeMenuId && (
          <div key={`route-${route.id}`}>{route.component}</div>
        ))}
      </div>
    </div>
  </>
);}

export default Layout;