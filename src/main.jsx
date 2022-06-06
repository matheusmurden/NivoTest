import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '@tidbits/react-tidbits/global';
import dark from '@tidbits/react-tidbits/theme';

import App from './App'
import './index.css'

const appContainer = document.getElementById('root')

render(
  <React.StrictMode>
    <ThemeProvider theme={dark}>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>
, appContainer)
