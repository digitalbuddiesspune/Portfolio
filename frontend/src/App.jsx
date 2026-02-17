import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes with Header and Footer */}
        <Route path="/" element={
          <div className="min-h-screen flex flex-col bg-white text-black">
            <Header />
            <HomePage />
            <Footer />
          </div>
        } />
        <Route path="/about" element={
          <div className="min-h-screen flex flex-col bg-white text-black">
            <Header />
            <AboutPage />
            <Footer />
          </div>
        } />
        
        {/* Admin Routes without Header and Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;