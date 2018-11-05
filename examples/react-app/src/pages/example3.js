import React from 'react';
import { Provider, useTwyst } from '@twyst/react';
import createStore from '@twyst/store';

const actions = {
  increment({ state }) {
    return {
      count: state.count + 1
    };
  },
  decrement({ state }) {
    return {
      count: state.count - 1
    };
  }
};

const selector = state => ({
  count: state.count
});

const SubCmp = () => {
  const { count, increment, decrement } = useTwyst(selector, actions);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const Example2 = () => {
  const store = createStore({
    count: 0
  });

  return (
    <Provider store={store}>
      <div>
        <SubCmp />
      </div>
    </Provider>
  );
};

export default Example2;
