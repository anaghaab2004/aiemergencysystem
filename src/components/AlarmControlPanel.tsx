import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Settings, 
  MapPin,
  AlertTriangle,
  Bell
} from 'lucide-react';
import { useAlarmSystem } from '../hooks/useAlarmSystem';

interface AlarmControlPanelProps {
  onEmergencyDetected?: (type: string) => void;
}

export const AlarmControlPanel: React.FC<AlarmControlPanelProps> = ({ onEmergencyDetected }) => {
  const {
    isAlarmActive,
    currentAlarm,
    volume,
    isMuted,
    startAlarm,
    stopAlarm,
    toggleMute,
    setAlarmVolume,
    alarmSounds
  } = useAlarmSystem();

  const getAlarmTypeColor = (type: string) => {
    switch (type) {
      case 'FIRE': return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDICAL': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'SECURITY': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'EVACUATION': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Bell className="w-6 h-6 mr-2 text-red-600" />
          Alarm Control System
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isAlarmActive ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-sm text-gray-600">
            {isAlarmActive ? 'ALARM ACTIVE' : 'SYSTEM READY'}
          </span>
        </div>
      </div>

      {/* Current Alarm Status */}
      {isAlarmActive && currentAlarm && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-semibold text-red-900">{currentAlarm.name} Active</h4>
                <p className="text-sm text-red-700">Pattern: {currentAlarm.pattern}</p>
              </div>
            </div>
            <button
              onClick={stopAlarm}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Square className="w-4 h-4" />
              <span>STOP ALARM</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-700">Frequency:</span>
              <span className="font-medium text-red-900">{currentAlarm.frequency}Hz</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-red-700">Volume:</span>
              <span className="font-medium text-red-900">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Alarm Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Quick Alarm Triggers</h4>
          <div className="space-y-2">
            {alarmSounds.map((alarm) => (
              <button
                key={alarm.id}
                onClick={() => startAlarm(alarm.type)}
                disabled={isAlarmActive}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  isAlarmActive 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-md'
                } ${getAlarmTypeColor(alarm.type)}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{alarm.name}</div>
                    <div className="text-xs opacity-75">{alarm.pattern} - {alarm.frequency}Hz</div>
                  </div>
                  <Play className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Audio Controls</h4>
          
          {/* Volume Control */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Volume</span>
              <span className="text-sm font-medium">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setAlarmVolume(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-colors ${
              isMuted 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>{isMuted ? 'UNMUTE SYSTEM' : 'MUTE SYSTEM'}</span>
          </button>

          {/* Emergency Stop */}
          {isAlarmActive && (
            <button
              onClick={stopAlarm}
              className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Square className="w-5 h-5" />
              <span>EMERGENCY STOP</span>
            </button>
          )}
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Settings className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-900">System Status</span>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Audio Context:</span>
            <span className="ml-2 font-medium">Ready</span>
          </div>
          <div>
            <span className="text-gray-600">Browser Support:</span>
            <span className="ml-2 font-medium text-green-600">Full</span>
          </div>
          <div>
            <span className="text-gray-600">Active Alarms:</span>
            <span className="ml-2 font-medium">{isAlarmActive ? '1' : '0'}</span>
          </div>
          <div>
            <span className="text-gray-600">System Status:</span>
            <span className="ml-2 font-medium text-green-600">Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
};