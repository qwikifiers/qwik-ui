import { Alert } from './components/alert/alert';
import { Button } from './components/button/button';
import './index.css';

export default () => {
  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <title>Qwik Blank App</title>
      </head>
      <body>
        <Button class="btn btn-primary">Click Me</Button>
        <Alert>Hey </Alert>
      </body>
    </>
  );
};
