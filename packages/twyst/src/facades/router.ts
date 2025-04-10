import { Twyst } from '../index.js';
import { Router } from '../router.js';

type RouterInstance = InstanceType<typeof Router>;

const RouterFacade = new Proxy({} as RouterInstance, {
  get(target, prop, receiver) {
    // @ts-ignore
    return Twyst.instance.get('router')[prop];
  },
});

export { RouterFacade as Router };
