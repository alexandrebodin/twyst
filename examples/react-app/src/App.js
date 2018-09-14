import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider as TwystProvider } from '@twyst/react';

import Example1 from './pages/example1';

const Root = () => (
  <div>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/example1">Example 1</Link>
          </li>
          <li>
            <Link to="/example2">Example 2</Link>
          </li>
          <li>
            <Link to="/example3">Example 3</Link>
          </li>
        </ul>
      </nav>
    </header>
    <div>
      <Route path="/example1" component={Example1} />
    </div>
  </div>
);

export default () => (
  <TwystProvider>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </TwystProvider>
);
