import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
