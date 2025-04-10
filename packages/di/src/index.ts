class Container {
  resolved: { [key: string]: any } = {};
  registry: { [key: string]: any } = {};

  constructor() {}

  get<T>(name: string): T {
    if (this.resolved[name]) {
      return this.resolved[name];
    }

    const value = this.registry[name];

    if (typeof value === 'function') {
      this.resolved[name] = value(this);

      return this.resolved[name];
    }

    return value;
  }

  set(name: string, value: any) {
    this.registry[name] = value;
  }
}

export { Container };
