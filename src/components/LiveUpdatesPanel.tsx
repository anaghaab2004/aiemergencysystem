import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Users, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { LiveUpdate } from '../types/emergency';

interface LiveUpdatesPanelProps {
  emergencyId?: string;
}

export const LiveUpdatesPanel: React.FC<LiveUpdatesPanelProps> = ({ emergencyId }) => {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isLive && Math.random() > 0.6) {
        const updateTypes = [
          { type: 'UNIT_DISPATCH', message: 'Fire Engine 12 dispatched to scene', icon: Users },
          { type: 'STATUS_CHANGE', message: 'Emergency status updated to RESPONDING', icon: AlertTriangle },
          { type: 'ARRIVAL', message: 'First responders arrived on scene', icon: MapPin },
          { type: 'ESCALATION', message: 'Additional units requested due to severity', icon: Zap },
          { type: 'RESOLUTION', message: 'Situation contained, cleanup in progress', icon: CheckCircle }
        ];
        
        const randomUpdate = updateTypes[Math.floor(Math.random() * updateTypes.length)];
        const newUpdate: LiveUpdate = {
          id: Date.now().toString(),
          emergencyId: emergencyId || 'general',
          timestamp: new Date(),
          type: randomUpdate.type as any,
          message: randomUpdate.message,
          source: 'Emergency Dispatch'
        };
        
        setUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive, emergencyId]);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'UNIT_DISPATCH': return Users;
      case 'STATUS_CHANGE': return AlertTriangle;
      case 'ARRIVAL': return MapPin;
      case 'ESCALATION': return Zap;
      case 'RESOLUTION': return CheckCircle;
      default: return Clock;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'UNIT_DISPATCH': return 'text-blue-600 bg-blue-100';
      case 'STATUS_CHANGE': return 'text-orange-600 bg-orange-100';
      case 'ARRIVAL': return 'text-green-600 bg-green-100';
      case 'ESCALATION': return 'text-red-600 bg-red-100';
      case 'RESOLUTION': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Live Updates
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`text-sm px-3 py-1 rounded-full transition-colors ${
              isLive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {isLive ? 'LIVE' : 'PAUSED'}
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {updates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No recent updates</p>
            <p className="text-xs">Live monitoring active</p>
          </div>
        ) : (
          updates.map((update) => {
            const IconComponent = getUpdateIcon(update.type);
            
            return (
              <div key={update.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg flex-shrink-0 ${getUpdateColor(update.type)}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{update.message}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">{update.source}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{getTimeAgo(update.timestamp)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};