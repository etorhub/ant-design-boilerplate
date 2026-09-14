import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '@/containers/Main/index';

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </Router>
);

export default Root;
