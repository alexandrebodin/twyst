interface FuncHandler {
  (...args: any[]): any;
}

class FunctionChain<T extends FuncHandler> {
  private handlers: Array<T> = [];

  add(handler: T) {
    this.handlers.push(handler);
    return this;
  }

  run(ctx: any): any {
    let i = -1;
    let handler = this.handlers[0];

    const next = () => {
      i += 1;
      handler = this.handlers[i];

      if (!handler) {
        return;
      }

      handler(ctx, next);
    };

    while (i < this.handlers.length) {
      next();
    }
  }
}

interface Handler {
  next: Handler;
  setNext(next: Handler): void;
  run(...args: any[]): any;
}

class Chain<T extends Handler> {
  private handlers: Array<T> = [];

  add(handler: T) {
    this.handlers.push(handler);
    return this;
  }

  run(ctx: any): any {
    let i = -1;
    let handler = this.handlers[0];

    const nextHandler = () => {
      i += 1;
      handler = this.handlers[i];

      if (!handler) {
        return;
      }

      handler.setNext(next);
      handler.run(ctx);
    };

    while (i < this.handlers.length) {
      next();
    }
  }
}

const logger = (ctx, next) => {
  const t0 = performance.now();
  next();
  const t1 = performance.now();

  console.log('execution: ', t1 - t0);
};

new Chain<(ctx: any, next: any) => void>()
  .add(logger)
  .add((ctx, next) => {
    console.log('a ', ctx);
    next();
    console.log('a ', ctx);
  })
  .add((ctx, next) => {
    console.log('b ', ctx);
    ctx.s = 'bar';
    next();
    console.log('b ', ctx);
  })
  .run({ s: 'foo' });
