import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import './global.css';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
