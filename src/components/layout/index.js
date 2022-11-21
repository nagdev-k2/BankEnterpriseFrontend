import { React, useState } from 'react';
import { map } from 'lodash';

import Header from './header';
import Sidebar from './sidebar';
import Routes from '../../routes';
import './index.css'

const Layout = () => {
  const [activeMenuId, setMenuActive] = useState(0);
  const changeMenu = (btnId) => {
    setMenuActive(btnId);
  }
  return (
    <>
      <Header />
      <div className='body'>
        <Sidebar activeMenuId={activeMenuId} changeMenu={changeMenu} />
        {map(Routes, route => route.id === activeMenuId && (
          <div className='content' key={`route-${route.id}`}>{route.component}</div>
        ))}
      </div>
    </>
  );
}

export default Layout;