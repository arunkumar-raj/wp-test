const { render, useState } = wp.element;
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//Model Values reducers
import reducer from './reducer';

//Language Files
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

//Files to show up 
import Users from './react-front/Users.jsx';
import * as Constants from './constants';

//Store 
const get_store = createStore(reducer,applyMiddleware(thunk));

const render_comp = <Provider store={get_store}><I18nextProvider i18n={i18n}><Users {...Constants} /></I18nextProvider></Provider>;

render(render_comp, document.getElementById('wp-userlist-page'));
