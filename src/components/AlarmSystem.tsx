import React from 'react';
import { AlarmTrigger } from '../types/sensor';
import { AlertTriangle, CheckCircle, Clock, Zap, Brain, Activity } from 'lucide-react';

interface AlarmSystemProps {
  alarms: AlarmTrigger[];
  onAcknowledge: (alarmId: string) => void;
}

export const AlarmSystem: React.FC<AlarmSystemProps> = ({ alarms, onAcknowledge }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getTriggerIcon = (type: string) => {
    switch (type) {
      case 'AI_INFERENCE': return Brain;
      case 'THRESHOLD': return Activity;
      case 'PATTERN_DETECTION': return Zap;
      default: return AlertTriangle;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const activeAlarms = alarms.filter(alarm => !alarm.acknowledged);
  const acknowledgedAlarms = alarms.filter(alarm => alarm.acknowledged);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          Alarm System
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${activeAlarms.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
            <span className="text-sm text-gray-600">
              {activeAlarms.length > 0 ? `${activeAlarms.length} Active Alarms` : 'All Clear'}
            </span>
          </div>
        </div>
      </div>

      {activeAlarms.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-red-600 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Active Alarms ({activeAlarms.length})
          </h4>
          <div className="space-y-3">
            {activeAlarms.map((alarm) => {
              const TriggerIcon = getTriggerIcon(alarm.triggerType);
              
              return (
                <div key={alarm.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <TriggerIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alarm.severity)}`}>
                            {alarm.severity}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {getTimeAgo(alarm.timestamp)}
                          </span>
                        </div>
                        <p className="font-medium text-gray-900">{alarm.message}</p>
                        <p className="text-sm text-gray-600">Sensor: {alarm.sensorId}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onAcknowledge(alarm.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  </div>
                  
                  {alarm.autoResponse.length > 0 && (
                    <div className="mt-3 p-3 bg-white rounded border">
                      <h6 className="text-sm font-medium text-gray-700 mb-2">Automated Response:</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {alarm.autoResponse.map((response, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{response}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {acknowledgedAlarms.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-600 mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Recent Acknowledged Alarms
          </h4>
          <div className="space-y-2">
            {acknowledgedAlarms.slice(0, 3).map((alarm) => {
              const TriggerIcon = getTriggerIcon(alarm.triggerType);
              
              return (
                <div key={alarm.id} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-gray-200 rounded">
                        <TriggerIcon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{alarm.message}</p>
                        <p className="text-xs text-gray-500">{getTimeAgo(alarm.timestamp)}</p>
                      </div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {alarms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-400" />
          <p className="font-medium">No Alarms</p>
          <p className="text-sm">All systems operating normally</p>
        </div>
      )}
    </div>
  );
};