import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { WordContextProvider } from './wordContext';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <StrictMode>
    < WordContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </WordContextProvider>

  </StrictMode>,
  rootElement
);
