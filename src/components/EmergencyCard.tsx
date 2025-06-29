import React from 'react';
import { Emergency } from '../types/emergency';
import { Clock, MapPin, Users, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';

interface EmergencyCardProps {
  emergency: Emergency;
  onClick: (emergency: Emergency) => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({ emergency, onClick }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-l-red-600 bg-red-50';
      case 'HIGH': return 'border-l-orange-600 bg-orange-50';
      case 'MEDIUM': return 'border-l-yellow-600 bg-yellow-50';
      default: return 'border-l-blue-600 bg-blue-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-100 text-red-800';
      case 'RESPONDING': return 'bg-orange-100 text-orange-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Get the icon component dynamically
  const IconComponent = Icons[emergency.type.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div 
      className={`bg-white border-l-4 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-200 ${getSeverityColor(emergency.severity)}`}
      onClick={() => onClick(emergency)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${emergency.type.color} bg-white`}>
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{emergency.type.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{emergency.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(emergency.status)}`}>
            {emergency.status}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {getTimeAgo(emergency.timestamp)}
          </span>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4">{emergency.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-gray-600">AI: {emergency.aiConfidence}%</span>
          </div>
          
          {emergency.respondingUnits.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-gray-600">{emergency.respondingUnits.length} units</span>
            </div>
          )}
        </div>
        
        {emergency.estimatedResponseTime && emergency.status === 'ACTIVE' && (
          <div className="text-orange-600 font-medium">
            ETA: {emergency.estimatedResponseTime}min
          </div>
        )}
      </div>
    </div>
  );
};