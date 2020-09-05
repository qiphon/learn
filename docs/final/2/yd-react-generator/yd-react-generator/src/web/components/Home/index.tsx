import * as React from 'react';
import './home.css';
import { NavLink, Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="components-home">
      <span>
        <NavLink to="/login">登录页</NavLink>
      </span>
      <h2 data-testid="js-h2">京程一灯</h2>
      <ul data-testid="js-ul">
        <li>JavaScript</li>
        <li>CSS</li>
      </ul>
    </div>
  );
};
export default Home;
