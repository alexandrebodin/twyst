import React from 'react';
import { Subscribe } from '@twyst/react';
import createStore from '@twyst/store';
import produce from 'immer';

const actions = {
  increment: ({ state }) => ({ count: state.count + 1 }),
  decrement: ({ state }) => ({ count: state.count - 1 }),
  incrementBy: ({ state }, val) => ({ count: state.count + val }),
  reset: () => ({ count: 0 }),
  incrementAsync: ({ actions }) => {
    setTimeout(() => {
      actions.incrementBy(10);
    }, 2000);
  },

  // correct
  asyncAction: ({ store }) => {
    setTimeout(() => {
      store.setState(state => ({
        count: state.count + 1
      }));
    }, 5000);
  },

  // incorrect, here state might have change since then, return an updater function
  badAsyncAction: ({ store, state }) => {
    setTimeout(() => {
      store.setState({
        count: state.count + 1
      });
    }, 5000);
  },

  /** WITH IMMER */
  incrementWithImmer: () =>
    // return a producer func that will be called with the state
    produce(draft => {
      draft.count++;
    }),

  decrementWithImmer: ({ state }) =>
    // call the produce function directly
    produce(state, draft => {
      draft.count--;
    })
};

const Example1 = () => {
  const store = createStore({
    count: 0
  });
  return (
    <Subscribe store={store} actions={actions}>
      {({ state, ...actions }) => (
        <div>
          <header>
            <p>Counter: {state.count}</p>
            <p>
              <button onClick={actions.increment}>Increment</button>
              <button onClick={actions.decrement}>Decrement</button>
            </p>
            <p>
              <button onClick={actions.incrementAsync}>Increment ASYNC</button>
              <br />
              <button onClick={actions.reset}>Reset</button>
            </p>

            <p>
              <button onClick={actions.asyncAction}>asyncAction</button>
              <button onClick={actions.badAsyncAction}>badAsyncAction</button>
            </p>

            <p>
              <button onClick={actions.incrementWithImmer}>incrementWithImmer</button>
              <button onClick={actions.decrementWithImmer}>decrementWithImmer</button>
            </p>
          </header>
        </div>
      )}
    </Subscribe>
  );
};

export default Example1;
