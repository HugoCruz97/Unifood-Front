import './styles/global.css'
import { Header } from './components/header'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { RoutesComponent } from './routes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store';
import { CartProvider } from './contexts/cartContext'

export function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <CartProvider>
          <Header />
          <RoutesComponent />
          <ToastContainer />
        </CartProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}

