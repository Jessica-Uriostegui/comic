import React from 'react';
import { Link, Outlet } from 'react-router-dom';



const App = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="browse">Browse Characters</Link></li>
          <li><Link to="comics">Comics</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
            

export default App;


