import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b894', // Green energy primary
      light: '#55efc4',
      dark: '#00916d',
    },
    secondary: {
      main: '#00cec9',
    },
    background: {
      default: '#020b09',
      paper: '#051310',
    },
    success: {
      main: '#00c853',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background:
            'linear-gradient(90deg, rgba(0,184,148,1) 0%, rgba(0,206,201,1) 50%, rgba(0,184,148,1) 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
        },
        containedPrimary: {
          boxShadow: '0 6px 18px rgba(0,184,148,0.45)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background:
            'radial-gradient(circle at top left, rgba(0,184,148,0.24), transparent 55%), #051310',
          borderRadius: 14,
        },
      },
    },
  },
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <h1>Something went wrong</h1>
          <pre style={{ background: '#f5f5f5', padding: 16, overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
