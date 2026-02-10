import 'antd/dist/antd.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Root from './config/Root';
import store from './config/configureStore';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
