import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import '../styles/pages/PlaceholderPage.scss';

interface PlaceholderProps {
  title?: string;
}

export const PlaceholderPage: React.FC<PlaceholderProps> = ({ title }) => {
  const navigate = useNavigate();
  const { moduleName } = useParams();

  const displayTitle =
    title || (moduleName ? moduleName.replace(/-/g, ' ').toUpperCase() : 'Module');

  return (
    <div className="placeholder-page">
      <button className="btn-back" onClick={() => navigate('/')}>
        <ArrowLeft size={16} />
        <span>Back to Dashboard</span>
      </button>

      <div className="content-card">
        <h1>{displayTitle}</h1>
        <p>This module is actively registered and routing through the Topper workspace architecture.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;