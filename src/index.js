import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './themes/app_theme'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { I18nextProvider } from 'react-i18next';
import * as serviceWorker from './serviceWorker';
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import store from "./store";
import Interceptor from "./interceptors/Interceptor";
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
                <CssBaseline>
                    <Interceptor/>
                    <App/>
                </CssBaseline>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();