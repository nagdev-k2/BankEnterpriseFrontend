import { React } from 'react';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import Routes from '../../routes';

const Sidebar = ({ activeMenuId, changeMenu }) => (
  <div className='sidebar'>
    {map(Routes, route => (
      <Button className={`menu-btn ${activeMenuId === route.id ? 'active' : ''}`} key={`btn-${route.id}`} onClick={() => changeMenu(route.id)}>
        {route.icon}
        <h4 className='menu-btn-title'>{route.name}</h4>
      </Button>
    ))}
  </div>
);

export default Sidebar;