import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss'
import './styles/normalize.scss'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './redux/store.js'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
)

serviceWorkerRegistration.register()
