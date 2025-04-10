import http from 'http';
import type { JSX } from 'twyst/jsx-runtime';

/**
 * This file is used to setup the application. It is loaded before building the application.
 */

class App {}

const app = new App();

type Data = {
  title: string;
};

type Props = {
  children?: any;
};

const HTML = ({ children }: Props) => {
  return (
    <html>
      <head>
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  );
};

const route = (data: Data) => {
  return (
    <HTML>
      <div
        key="1"
        onClick={() => {
          console.log('clicked');
        }}
      >
        <p>{data.title}</p>
      </div>
    </HTML>
  );
};