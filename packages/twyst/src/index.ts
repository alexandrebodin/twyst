import { Container } from '@twyst/di';
import { Router } from './router.js';

class Twyst extends Container {
  static instance: Twyst;

  constructor() {
    super();

    Twyst.instance = this;

    this.set('router', new Router());

    // @ts-ignore
    global.app = this;
  }
}

export { Twyst };
