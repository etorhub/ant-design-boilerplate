import 'antd/dist/antd.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Root from '@/config/Root';
import store from '@/config/configureStore';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

root.render(
  <Provider store={store}>
    <Root />
  </Provider>,
);
