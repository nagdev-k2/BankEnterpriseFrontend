import { React } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import './index.css'

const Layout = ({ children }) => (
  <>
    <Header />
    <div className='body'>
      <Sidebar />
      <div className='content'>
        {children}
      </div>
    </div>
  </>
);

export default Layout;