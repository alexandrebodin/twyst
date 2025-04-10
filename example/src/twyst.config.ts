import { defineRoute } from 'twyst/config';


defineRoute('GET', '/:id', (c) => {
  c.params.id;
});

defineRoute('POST', '/', (c) => {
  c.params.id;
});

defineMiddleware((c) => {
  c.params.id;
});

