export interface Sensor {
  id: string;
  name: string;
  type: SensorType;
  location: string;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'ERROR';
  lastReading: SensorReading;
  thresholds: SensorThresholds;
  batteryLevel?: number;
  signalStrength?: number;
}

export interface SensorReading {
  value: number;
  unit: string;
  timestamp: Date;
  quality: 'GOOD' | 'FAIR' | 'POOR';
}

export interface SensorThresholds {
  warning: number;
  critical: number;
  emergency: number;
}

export type SensorType = 
  | 'SMOKE_DETECTOR'
  | 'TEMPERATURE'
  | 'GAS_DETECTOR'
  | 'MOTION_SENSOR'
  | 'DOOR_SENSOR'
  | 'WATER_LEAK'
  | 'VIBRATION'
  | 'SOUND_LEVEL'
  | 'AIR_QUALITY'
  | 'PRESSURE'
  | 'HUMIDITY'
  | 'CAMERA';

export interface AIInferenceResult {
  threatLevel: number; // 0-100
  confidence: number; // 0-100
  emergencyType: string;
  recommendedAction: string;
  riskFactors: string[];
  predictedEscalation: boolean;
}

export interface AlarmTrigger {
  id: string;
  sensorId: string;
  triggerType: 'THRESHOLD' | 'AI_INFERENCE' | 'PATTERN_DETECTION';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  autoResponse: string[];
}

export interface MicrocontrollerData {
  deviceId: string;
  sensors: SensorReading[];
  systemHealth: {
    cpuUsage: number;
    memoryUsage: number;
    temperature: number;
    uptime: number;
  };
  networkStatus: 'CONNECTED' | 'DISCONNECTED' | 'WEAK_SIGNAL';
  timestamp: Date;
}