import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Users, FileText, IndianRupee, TrendingUp, Layers, Stamp,
  Percent, Zap, Landmark, HeartPulse, ShieldAlert,
  MessageSquare, HelpCircle, LogOut, Search, Bell, Sparkles, ArrowUpRight
} from 'lucide-react';
import '../styles/pages/Home.scss';

interface ServiceItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size: number }>;
  status?: 'active' | 'special' | 'highlight';
}

const services: ServiceItem[] = [
  { id: 'client-manager', label: 'Client Manager', icon: Users, status: 'active' },
  { id: 'balance-sheet-3cd', label: 'Balance Sheet / 3CD', icon: FileText, status: 'active' },
  { id: 'income-tax', label: 'Income Tax', icon: IndianRupee, status: 'special' },
  { id: 'cma-emi', label: 'CMA / EMI', icon: TrendingUp },
  { id: 'forms-manager', label: 'Forms Manager', icon: Layers },
  { id: 'tds', label: 'TDS Manager', icon: Stamp },
  { id: 'service-tax', label: 'Service Tax', icon: Percent },
  { id: 'gst-billing', label: 'GST Billing', icon: Zap },
  { id: 'billing-old', label: 'Legacy Billing', icon: Zap },
  { id: 'wealth-tax', label: 'Wealth Tax', icon: Landmark },
  { id: 'authority-letter', label: 'Authority Letter', icon: Landmark, status: 'highlight' },
  { id: 'air-sft', label: 'AIR / SFT Audit', icon: HeartPulse },
  { id: 'fbt', label: 'FBT Returns', icon: ShieldAlert },
  { id: 'bulk-sms', label: 'Bulk SMS Broadcast', icon: MessageSquare },
  { id: 'bulk-email', label: 'Bulk Email Service', icon: MessageSquare },
  { id: 'other-utilities', label: 'Tools & Utilities', icon: Sparkles },
  { id: 'help', label: 'Support & Docs', icon: HelpCircle },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F1') {
        e.preventDefault();
        navigate('/more-services');
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const filteredServices = useMemo(() => {
    return services.filter((s) =>
      s.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <main className="main-wrapper">
      <div className="hero-strip">
        <div className="strip-badge">
          <h2>Workspace Overview</h2>
          <span className="badge-pill">Realtime Colors v3</span>
        </div>

        <div className="quick-search">
          <Search size={16} color="#64748b" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Filter modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd>/</kbd>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="modules-section">
          <motion.div
            className="cards-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    className={`module-card ${service.status ? `status-${service.status}` : ''}`}
                    variants={cardVariants}
                    layout
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                      transition: { type: 'spring', stiffness: 400, damping: 17 },
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/service/${service.id}`)}
                  >
                    <div className="card-icon">
                      <Icon size={20} />
                    </div>
                    <span className="card-title">{service.label}</span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        <motion.aside
          className="sidebar-panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="feed-box">
            <div className="feed-header">
              <Bell size={16} color="var(--accent)" />
              <h3>Latest Updates</h3>
            </div>
            <div className="news-stack">
              <div className="news-card">
                <h4>Expanded Support Channels</h4>
                <p>Dedicated customer success lines deployed across key regions with multilingual handling.</p>
              </div>
              <div className="news-card">
                <h4>Import AIS / TIS & 26AS</h4>
                <p>Direct sync activated for Windows 10/11 64-bit systems with automated JSON extraction.</p>
              </div>
            </div>
          </div>

          <div className="action-deck">
            <motion.button
              className="assist-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/gen-assist')}
            >
              <MessageSquare size={18} />
              <span>Launch Gen Assist</span>
              <ArrowUpRight size={16} />
            </motion.button>

            <div className="deck-footer">
              <span className="hint">Press [F1] for options</span>
              <button className="btn-quit" onClick={() => navigate('/quit')}>
                <LogOut size={16} />
                <span>Quit</span>
              </button>
            </div>
          </div>
        </motion.aside>
      </div>
    </main>
  );
};

export default Home;