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
import Settings from './react-admin/Settings.jsx';
import * as Constants from './constants';

//Store 
const get_store = createStore(reducer,applyMiddleware(thunk));

//Get Page query
const search = window.location.search;
const params = new URLSearchParams(search);
const page = params.get('page');

//For switch case
let render_comp = '';
let div_to_render = '';
let Element_render = '';

//Multiple page can be rendered from this page
switch(page){
    case 'testsetting':
      div_to_render = 'wp-admin-settings';
      Element_render =document.getElementById(div_to_render);
      const site_url = Element_render.getAttribute('data-url');
      render_comp = <Provider store={get_store}><I18nextProvider i18n={i18n}><Settings {...Constants} siteurl={site_url} /></I18nextProvider></Provider>;
    break;
}

render(render_comp, Element_render);
