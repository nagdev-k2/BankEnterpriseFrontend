import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import store, { persistor } from './state';
import Home from './home';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>
  );
}

export default App;
