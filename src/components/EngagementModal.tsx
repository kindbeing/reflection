import { useEffect, useRef } from 'react';
import { Engagement } from '../data/engagements';

interface EngagementModalProps {
  engagement: Engagement | null;
  onClose: () => void;
}

export default function EngagementModal({ engagement, onClose }: EngagementModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside to close the modal
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle escape key to close the modal
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!engagement) return null;

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className="modal-content"
        style={{ 
          borderTop: `4px solid ${engagement.color}`,
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3), 0 0 10px ${engagement.color}40`
        }}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{engagement.clientName}</h2>
        <div className="engagement-details">
          <div className="engagement-length">
            <span className="label">Length of Engagement:</span>
            <span className="value">{engagement.lengthOfEngagement}</span>
          </div>
          <div className="engagement-description">
            <p>{engagement.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 