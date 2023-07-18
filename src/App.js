import './App.css';
import Konten from './component/Konten';
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <>
      <CartProvider>
        <Konten />
      </CartProvider>
    </>
  )
}

export default App;
