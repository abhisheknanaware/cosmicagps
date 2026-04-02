import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LiveTracking from './pages/LiveTracking';
import Ais140 from './pages/Ais140';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
        <Route path="/ais-140" element={<Ais140 />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
