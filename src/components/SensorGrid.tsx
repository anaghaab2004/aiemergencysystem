import React from 'react';
import { Sensor } from '../types/sensor';
import { 
  Thermometer, 
  Flame, 
  Wind, 
  Eye, 
  DoorOpen, 
  Droplets, 
  Activity, 
  Volume2,
  Gauge,
  Camera,
  CloudRain
} from 'lucide-react';

interface SensorGridProps {
  sensors: Sensor[];
  onSensorClick: (sensor: Sensor) => void;
}

export const SensorGrid: React.FC<SensorGridProps> = ({ sensors, onSensorClick }) => {
  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'SMOKE_DETECTOR': return Flame;
      case 'TEMPERATURE': return Thermometer;
      case 'GAS_DETECTOR': return Wind;
      case 'MOTION_SENSOR': return Eye;
      case 'DOOR_SENSOR': return DoorOpen;
      case 'WATER_LEAK': return Droplets;
      case 'VIBRATION': return Activity;
      case 'SOUND_LEVEL': return Volume2;
      case 'AIR_QUALITY': return Wind;
      case 'PRESSURE': return Gauge;
      case 'HUMIDITY': return CloudRain;
      case 'CAMERA': return Camera;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-100 text-green-800 border-green-200';
      case 'OFFLINE': return 'bg-red-100 text-red-800 border-red-200';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReadingColor = (sensor: Sensor) => {
    const { value } = sensor.lastReading;
    const { warning, critical, emergency } = sensor.thresholds;
    
    if (value >= emergency) return 'text-red-600 bg-red-50';
    if (value >= critical) return 'text-orange-600 bg-orange-50';
    if (value >= warning) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-gray-400';
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sensors.map((sensor) => {
        const IconComponent = getSensorIcon(sensor.type);
        
        return (
          <div
            key={sensor.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500"
            onClick={() => onSensorClick(sensor)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{sensor.name}</h3>
                  <p className="text-sm text-gray-600">{sensor.location}</p>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sensor.status)}`}>
                {sensor.status}
              </span>
            </div>
            
            <div className={`p-3 rounded-lg mb-4 ${getReadingColor(sensor)}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Reading</span>
                <span className="text-xs">
                  {new Date(sensor.lastReading.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="text-2xl font-bold mt-1">
                {sensor.lastReading.value} {sensor.lastReading.unit}
              </div>
              <div className="text-xs mt-1">
                Quality: {sensor.lastReading.quality}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                {sensor.batteryLevel && (
                  <div className="flex items-center space-x-1">
                    <Activity className={`w-4 h-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                    <span className="text-gray-600">{sensor.batteryLevel}%</span>
                  </div>
                )}
                
                {sensor.signalStrength && (
                  <div className="flex items-center space-x-1">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">{sensor.signalStrength}%</span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                ID: {sensor.id}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};