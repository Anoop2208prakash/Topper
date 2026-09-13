import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ArrowLeft, Search, Calculator, Printer, BarChart3,
  FileSpreadsheet, CalendarClock, Scale, CreditCard,
  FileCheck2, Eye, MailCheck, FolderSearch, CheckSquare2,
  Link2, Activity, ArrowUpRight
} from 'lucide-react';
import '../styles/pages/IncomeTax.scss';

interface SubTool {
  id: string;
  label: string;
  desc: string;
  category: string;
  icon: React.ComponentType<{ size: number }>;
  status?: 'highlight' | 'portal' | 'sync';
}

const incomeTaxTools: SubTool[] = [
  // 1. Tax & Computation
  { id: 'computation', label: 'Computation', desc: 'Compute taxable total and deductions', category: 'Tax & Computation', icon: Calculator },
  { id: 'challan-printing', label: 'Challan Printing', desc: 'Challan 280, 281 & bank slips batch printing', category: 'Tax & Computation', icon: Printer },
  { id: 'reports', label: 'Reports', desc: 'Comprehensive financial & statutory summaries', category: 'Tax & Computation', icon: BarChart3, status: 'highlight' },
  { id: 'summarized-details', label: 'Summarized Details', desc: 'Consolidated client balance and filing ledger', category: 'Tax & Computation', icon: FileSpreadsheet },
  { id: 'due-date-master', label: 'Due Date Master', desc: 'Track compliance deadlines and penalty markers', category: 'Tax & Computation', icon: CalendarClock },
  { id: 'reverse-tax-calculator', label: 'Reverse Tax Calculator', desc: 'Gross-up calculations and effective rate audit', category: 'Tax & Computation', icon: Scale },

  // 2. PAN & ITR Registers
  { id: 'form-49a-49aa', label: 'Form 49A / 49AA', desc: 'New PAN allocation for Indian & Foreign entities', category: 'PAN & ITR Registers', icon: CreditCard },
  { id: 'pan-correction-form', label: 'PAN Correction Form', desc: 'Change or correction in PAN database cards', category: 'PAN & ITR Registers', icon: CreditCard },
  { id: 'quick-view-itr-v', label: 'Quick View ITR-V', desc: 'Immediate acknowledgment receipts preview', category: 'PAN & ITR Registers', icon: Eye },
  { id: 'quick-view-intimation', label: 'Quick View Intimation', desc: 'Review Section 143(1) intimation notices', category: 'PAN & ITR Registers', icon: MailCheck },
  { id: 'cpc-intimation-register', label: 'CPC Intimation Register', desc: 'Logbook of inbound intimation and demands', category: 'PAN & ITR Registers', icon: FolderSearch },
  { id: 'search-itr-ack-no', label: 'Search ITR Ack. No.', desc: 'Locate acknowledgments via e-filing tokens', category: 'PAN & ITR Registers', icon: FileCheck2 },

  // 3. ITD Portal Bulk Utilities
  { id: 'bulk-contact-verification', label: 'Bulk Contact Details Verification @ ITD Portal', desc: 'Validate client emails & numbers against ITD DB', category: 'ITD Portal Bulk Utilities', icon: CheckSquare2, status: 'portal' },
  { id: 'bulk-pan-aadhaar-link', label: 'Bulk PAN - Aadhaar Link @ ITD Portal', desc: 'Verify linkage status and execute batch requests', category: 'ITD Portal Bulk Utilities', icon: Link2, status: 'portal' },
  { id: 'bulk-itr-status', label: 'Bulk ITR Status / Activity / e-Proceedings', desc: 'Batch sync e-proceedings, refunds, and scrutiny flags', category: 'ITD Portal Bulk Utilities', icon: Activity, status: 'sync' }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 280, damping: 22 }
  }
};

export const IncomeTax: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = useMemo(() => {
    return incomeTaxTools.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const categories = useMemo(() => {
    const cats: string[] = [];
    filteredTools.forEach((item) => {
      if (!cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, [filteredTools]);

  return (
    <main className="income-tax">
      {/* Top Header */}
      <div className="it-header">
        <div className="breadcrumb-area">
          <button className="btn-back" onClick={() => navigate('/')} title="Back to Workspace">
            <ArrowLeft size={18} />
          </button>
          <div className="title-group">
            <h1>Income Tax</h1>
            <p>Direct compliance pipelines, ITD portal sync & statutory computations</p>
          </div>
        </div>

        <div className="it-search">
          <Search size={16} color="#64748b" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search sub-tools (Press '/')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <kbd>/</kbd>
        </div>
      </div>

      {/* Categorized Tool Cards */}
      <div className="category-stack">
        {categories.length === 0 ? (
          <div className="no-results">
            <p>No tools found matching "{searchTerm}"</p>
          </div>
        ) : (
          categories.map((cat) => (
            <section key={cat} className="it-section">
              <div className="section-title">
                <span className="dot" />
                <span>{cat}</span>
              </div>

              <motion.div
                className="action-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredTools
                    .filter((tool) => tool.category === cat)
                    .map((tool) => {
                      const Icon = tool.icon;
                      return (
                        <motion.div
                          key={tool.id}
                          className={`action-card ${tool.status ? `status-${tool.status}` : ''}`}
                          variants={cardVariants}
                          layout
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/service/income-tax/${tool.id}`)}
                        >
                          <div className="card-left">
                            <div className="icon-box">
                              <Icon size={20} />
                            </div>
                            <div className="info-box">
                              <span className="card-label">{tool.label}</span>
                              <span className="card-desc">{tool.desc}</span>
                            </div>
                          </div>
                          <ArrowUpRight size={16} className="btn-arrow" />
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
              </motion.div>
            </section>
          ))
        )}
      </div>
    </main>
  );
};

export default IncomeTax;