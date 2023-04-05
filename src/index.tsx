import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { setupStore } from './services/store';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();
const baseUrl = process.env.NODE_ENV !== 'production' ? '/' : '/react-burger';

root.render(
<Provider store={store}>
      <Router basename={baseUrl}>
        <App />
      </Router>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
