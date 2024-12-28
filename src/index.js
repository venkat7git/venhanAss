import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DiagramProvider } from './DiagramContext';

ReactDOM.render(
  <DiagramProvider>
    <App />
  </DiagramProvider>,
  document.getElementById('root')
);
