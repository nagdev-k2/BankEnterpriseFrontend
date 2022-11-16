import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, { persistor } from './state';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <h2>Entry here</h2>
      </PersistGate>
    </Provider>
  );
}

export default App;
