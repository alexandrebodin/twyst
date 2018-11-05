import React, { useContext } from 'react';
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
  constructor(props) {
    super(props);
    this.state = {
      store: props.store
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.setState({
        store: this.props.store
      })
    );
  }

  componentDidUpdate(prevProps) {
    // replace store if changed
    if (prevProps.store !== this.props.store) {
      this.unsubscribe();
      this.setState({
        store: this.props.store
      });
      this.unsubscribe = this.props.store.subscribe(() =>
        this.setState({
          store: this.props.store
        })
      );
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <React.Fragment>
        <ctx.Provider value={this.state}>{this.props.children}</ctx.Provider>
      </React.Fragment>
    );
  }
}

export function connect(mapStateToProps, actions) {
  return function Wrap(Cmp) {
    function WrappedComponent({ children, ...props }) {
      return (
        <ctx.Consumer>
          {({ store }) => {
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
        </ctx.Consumer>
      );
    }

    WrappedComponent.displayName =
      Cmp.displayName || Cmp.name || `TwystConnected`;

    return WrappedComponent;
  };
}

export function useTwyst(mapStateToProps, actions) {
  const { store } = useContext(ctx);

  return {
    ...mapStateToProps(store.getState()),
    ...bindActions(store, actions)
  };
}
