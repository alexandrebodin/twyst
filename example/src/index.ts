import { Twyst } from 'twyst';
import { Router } from 'twyst/router';

const app = new Twyst();

// app.get('router').get('/', (c) => {
//   c.params.id;
// });

Router.get('/:id', (c) => {
  c.params.id;
});

Router.post('/', (c) => {
  c.params.id;
});

export default app;


