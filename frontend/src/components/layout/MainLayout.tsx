import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layers, ShoppingCart, Clock } from 'lucide-react';
import '../../styles/layout/MainLayout.scss';

export const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="topper-app">
      <div className="haikei-mesh-bg" />

      {/* Top Navbar */}
      <motion.header
        className="top-nav"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="brand" onClick={() => navigate('/')}>
          <motion.div
            className="brand-icon"
            whileHover={{ rotate: 15, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Layers size={22} />
          </motion.div>
          <div className="brand-text">
            <h1>TOPPER</h1>
          </div>
        </div>

        <div className="nav-right">
          <div className="live-clock">
            <Clock size={14} />
            <span className="time-highlight">{formattedTime}</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <motion.button
            className="btn-buy"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/buy-online')}
          >
            <ShoppingCart size={15} />
            <span>Buy Online</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Page Content Rendered Here */}
      <div className="main-outlet">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 Topper Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;