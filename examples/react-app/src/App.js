import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Example1 from './pages/example1';
import Example2 from './pages/example2';
import Example3 from './pages/example3';

const Root = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/example1">Subscribe</Link>
          </li>
          <li>
            <Link to="/example2">connect</Link>
          </li>
          <li>
            <Link to="/example3">hooks</Link>
          </li>
        </ul>
      </nav>
    </header>
    <div>
      <Route exact path="/example1" component={Example1} />
      <Route exact path="/example2" component={Example2} />
      <Route exact path="/example3" component={Example3} />
    </div>
  </div>
);

export default () => (
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
