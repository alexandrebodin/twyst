type Handler = (c: any) => void;

class Router {
  get(path: string, handler: Handler) {
    console.log('GET', path);
  }

  post(path: string, handler: Handler) {
    console.log('POST', path);
  }
}

export { Router };
