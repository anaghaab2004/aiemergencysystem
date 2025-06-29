import React, { useState } from 'react';
import { Emergency } from '../types/emergency';
import { X, MapPin, Clock, Users, TrendingUp, AlertCircle, Phone, Navigation, Camera } from 'lucide-react';
import { LocationMap } from './LocationMap';
import { LiveUpdatesPanel } from './LiveUpdatesPanel';
import * as Icons from 'lucide-react';

interface EmergencyModalProps {
  emergency: Emergency | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ emergency, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'location' | 'updates' | 'protocols'>('overview');

  if (!isOpen || !emergency) return null;

  const IconComponent = Icons[emergency.type.icon as keyof typeof Icons] as React.ComponentType<any>;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-100 border-red-200';
      case 'HIGH': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-blue-600 bg-blue-100 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-100 text-red-800';
      case 'RESPONDING': return 'bg-orange-100 text-orange-800';
      case 'DISPATCHED': return 'bg-blue-100 text-blue-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: AlertCircle },
    { id: 'location', label: 'Location & Units', icon: MapPin },
    { id: 'updates', label: 'Live Updates', icon: Clock },
    { id: 'protocols', label: 'Protocols', icon: Users }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${emergency.type.color} bg-white shadow-md`}>
              {IconComponent && <IconComponent className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{emergency.type.name}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(emergency.severity)}`}>
                  {emergency.severity}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(emergency.status)}`}>
                  {emergency.status}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{emergency.location}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{emergency.timestamp.toLocaleString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>Priority: {emergency.priority}/10</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call Command</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Navigation className="w-4 h-4" />
              <span>Navigate</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-red-900">AI Confidence</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{emergency.aiConfidence}%</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Responding Units</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{emergency.respondingUnits.length}</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Response Time</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">
                    {emergency.estimatedResponseTime ? `${emergency.estimatedResponseTime}min` : 'On Scene'}
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">People Affected</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{emergency.affectedArea?.estimatedPeople || 'Unknown'}</p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Emergency Description</h3>
                <p className="text-gray-700 leading-relaxed">{emergency.description}</p>
              </div>

              {/* Reporter Information */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Reported By</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-blue-700">Source Type:</span>
                    <p className="text-blue-900">{emergency.reportedBy.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-blue-700">Source:</span>
                    <p className="text-blue-900">{emergency.reportedBy.source}</p>
                  </div>
                  {emergency.reportedBy.contactInfo && (
                    <div>
                      <span className="text-sm font-medium text-blue-700">Contact:</span>
                      <p className="text-blue-900">{emergency.reportedBy.contactInfo}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <LocationMap emergency={emergency} />
          )}

          {activeTab === 'updates' && (
            <LiveUpdatesPanel emergencyId={emergency.id} />
          )}

          {activeTab === 'protocols' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-2 text-yellow-600" />
                  Emergency Response Protocols
                </h3>
                <div className="space-y-3">
                  {emergency.type.protocols.map((protocol, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border">
                      <span className="bg-yellow-200 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-700">{protocol}</p>
                      </div>
                      <button className="text-green-600 hover:text-green-700 transition-colors">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Units */}
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Required Response Units
                </h3>
                <div className="flex flex-wrap gap-2">
                  {emergency.type.requiredUnits.map((unit, index) => (
                    <span key={index} className="bg-green-200 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                      {unit}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-green-700 mt-3">
                  Average Response Time: {emergency.type.averageResponseTime} minutes
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
            <span>•</span>
            <span>Emergency ID: {emergency.id}</span>
          </div>
          
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Update Status
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Escalate Priority
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Mark Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};