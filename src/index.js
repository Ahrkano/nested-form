import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';

import './index.css';
import App from './App';
import * as localStorageKeys from './shared/localStorageKeys';
import registerServiceWorker from './registerServiceWorker';

const persistedState = localStorage.getItem(localStorageKeys.MAIN_KEY)
    ? JSON.parse(localStorage.getItem(localStorageKeys.MAIN_KEY))
    : { allQuestionsOrder: null, rootQuestionsOrder: null, formObject: null };

const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
    localStorage.setItem('nestedFormData##', JSON.stringify(store.getState()));
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
