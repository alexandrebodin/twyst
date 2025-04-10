type Action = (...args: unknown[]) => void | Promise<void>;

class Hooks {
  private store = new Map<string, Action[]>();

  add(name: string, action: Action) {
    const handlers = this.store.get(name);

    if (handlers) {
      handlers.push(action);
    } else {
      this.store.set(name, [action]);
    }

    return this;
  }

  remove(name: string, action: Action) {
    const handlers = this.store.get(name);

    if (!handlers) {
      return this;
    }

    handlers.splice(handlers.indexOf(action), 1);

    return this;
  }

  async run(name, ...args: unknown[]): Promise<void> {
    const handlers = this.store.get(name);
    if (!handlers) {
      return;
    }

    for (let handler of handlers) {
      await handler(...args);
    }
  }
}

export default () => {
  return new Hooks();
};
