import { watch } from 'chokidar';

const watcher = watch('.', {
  ignored: (path) => path.includes('node_modules') || path.includes('.git'),
  persistent: true,
});

watcher.on('all', (event, path) => {
  console.log(event, path);
});
