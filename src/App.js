// App.js
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Favorite from './components/Favorite';

function App() {
  return (
    <div className="App">
      <Router>
       
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
