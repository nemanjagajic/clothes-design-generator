import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ItemsProvider } from './store/ItemsContext'
import HistoryProvider from './components/history/HistoryContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ItemsProvider>
      <HistoryProvider>
        <App />
      </HistoryProvider>
    </ItemsProvider>
  </React.StrictMode>,
)