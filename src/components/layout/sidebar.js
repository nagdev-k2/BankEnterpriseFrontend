import { React } from 'react';
import { map } from 'lodash';
import Routes from '../../routes';

const Sidebar = ({ activeMenuId, changeMenu }) => (
  <div className='sidebar'>
    {map(Routes, route => (
      <button className={`menu-btn ${activeMenuId === route.id ? 'active' : ''}`} key={`btn-${route.id}`} onClick={() => changeMenu(route.id)}>
        {route.icon}
        <span className='menu-btn-title'>{route.name}</span>
      </button>
    ))}
  </div>
);

export default Sidebar;