function assign(object, ...objs) {
  for (let i in objs) {
    let props = objs[i];
    for (let i in props) object[i] = props[i];
  }

  return object;
}

export function createStore(initialState = {}) {
  let _state = initialState;
  let _listeners = [];

  function getState() {
    return _state;
  }

  function setState(updater) {
    if (typeof updater === 'function') {
      _state = assign({}, _state, updater(_state));
    } else {
      _state = assign({}, _state, updater);
    }
    notify();
  }

  function notify() {
    let listeners = _listeners;
    for (let i = 0; i < listeners.length; i++) listeners[i](_state);
  }

  function subscribe(cb) {
    _listeners.push(cb);
    return () => {
      unsubscribe(cb);
    };
  }

  function unsubscribe(listener) {
    const idx = _listeners.indexOf(listener);
    _listeners.splice(idx, 1);
  }

  const store = {
    getState,
    setState,
    subscribe,
    unsubscribe
  };

  return store;
}

/**
 *
 * @param {Object} store a twyst sotre
 * @param {Object} actions an object of actions
 * @param {Object} options an options object
 */
export function bindActions(store, actions) {
  function setState(result) {
    store.setState(result);
  }

  let bindedActions = {};
  for (let i in actions) {
    bindedActions[i] = function boundAction(...args) {
      const state = store.getState();
      let cArgs = [{ store, state, actions: bindedActions }, ...args];
      let ret = actions[i].apply(null, cArgs);
      if (ret != null) {
        return setState(ret);
      }
    };
  }

  return bindedActions;
}

export default createStore;
