import React from 'react';
import { Provider, connect } from '@twyst/react';
import createStore from '@twyst/store';

const actions = {
  increment({ state }) {
    return {
      count: state.count + 1
    };
  }
};

const SubCmp = connect(
  state => ({
    count: state.count
  }),
  actions
)(({ count, increment }) => {
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={increment}>Increment</button>
    </div>
  );
});

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
