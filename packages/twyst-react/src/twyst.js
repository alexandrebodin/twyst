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
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.setState({}));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <React.Fragment>
        <ctx.Provider value={this.props.store}>
          {this.props.children}
        </ctx.Provider>
      </React.Fragment>
    );
  }
}

// TODO: Implement a shallow compare to avoid to many rerenders
export function connect(mapStateToProps, actions) {
  return function Wrap(Cmp) {
    function WrappedComponent({ children, ...props }) {
      return (
        <Consumer>
          {store => {
            const finalProps = {
              ...props,
              ...mapStateToProps(store.getState(), props)
            };

            return (
              <Cmp {...finalProps} {...bindActions(store, actions)}>
                {children}
              </Cmp>
            );
          }}
        </Consumer>
      );
    }

    WrappedComponent.displayName =
      Cmp.displayName || Cmp.name || `TwystConnected`;

    return WrappedComponent;
  };
}
