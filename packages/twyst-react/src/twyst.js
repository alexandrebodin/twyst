import React from 'react';
import { bindActions } from '@twyst/store';

const ctx = React.createContext();

export class Subscribe extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.setState({});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store, actions, children } = this.props;
    return children({
      state: store.getState(),
      ...bindActions(store, actions)
    });
  }
}

export class Provider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ctx.Provider>{this.props.children}</ctx.Provider>
      </React.Fragment>
    );
  }
}
