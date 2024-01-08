import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import store from '@/Redux/store'
import AppWrapper from '@/Routes/AppWrapper'
import AppRoutes from '@/Routes/AppRoutes'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
      <Provider store={store}>
        <AppWrapper>
          <AppRoutes />
        </AppWrapper>
      </Provider>
    </BrowserRouter >
  </React.StrictMode>

);
