import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './components/Welcome'
import App from './components/App'

let toRender

if (location.pathname === '/welcome') {
    toRender = <Welcome />
} else {
    toRender = <App />
}

ReactDOM.render(
    toRender,
    document.querySelector('main')
)
