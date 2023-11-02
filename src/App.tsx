import './styles/global.css'
import { Header } from './components/header'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { RoutesComponent } from './routes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store';

export function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
          <Header />
          <RoutesComponent />
          <ToastContainer />
      </BrowserRouter>
    </ReduxProvider>
  )
}

