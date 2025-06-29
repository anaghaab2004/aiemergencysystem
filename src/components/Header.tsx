import React from 'react';
import { Shield, AlertTriangle, Activity } from 'lucide-react';

interface HeaderProps {
  systemStatus: 'NORMAL' | 'ALERT' | 'CRITICAL';
  activeEmergencies: number;
}

export const Header: React.FC<HeaderProps> = ({ systemStatus, activeEmergencies }) => {
  const getStatusColor = () => {
    switch (systemStatus) {
      case 'CRITICAL': return 'text-red-600 bg-red-50';
      case 'ALERT': return 'text-orange-600 bg-orange-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'CRITICAL': return <AlertTriangle className="w-5 h-5" />;
      case 'ALERT': return <Activity className="w-5 h-5" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  return (
    <header className="bg-slate-900 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-400" />
            <h1 className="text-2xl font-bold">AI Emergency System</h1>
          </div>
          <div className="hidden md:block text-sm text-slate-300">
            Advanced Threat Detection & Response
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-slate-300">Active Emergencies:</span>
            <span className="font-bold text-red-400 text-lg">{activeEmergencies}</span>
          </div>
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
            {getStatusIcon()}
            <span>System {systemStatus}</span>
          </div>
          
          <div className="text-sm text-slate-300">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </header>
  );
};