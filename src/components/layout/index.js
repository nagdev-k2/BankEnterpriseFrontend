import { React } from 'react';

import Header from './header';
import Sidebar from './sidebar';
import Loading from './loading';
import './index.css'

const Layout = ({ children, isLoading }) => (
  <>
    <Loading isLoading={isLoading} />
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