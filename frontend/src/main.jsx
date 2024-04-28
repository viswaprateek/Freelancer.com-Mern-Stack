// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './AuthContext.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>

  </React.StrictMode>,
)
