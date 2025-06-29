import { Sensor, SensorReading, AlarmTrigger } from '../types/sensor';

export const mockSensors: Sensor[] = [
  {
    id: 'smoke-001',
    name: 'Smoke Detector - Server Room',
    type: 'SMOKE_DETECTOR',
    location: 'Building A - Floor 3 - Server Room',
    status: 'ONLINE',
    lastReading: {
      value: 0.15,
      unit: 'ppm',
      timestamp: new Date(Date.now() - 30000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 0.1,
      critical: 0.2,
      emergency: 0.3
    },
    batteryLevel: 85,
    signalStrength: 92
  },
  {
    id: 'temp-002',
    name: 'Temperature Sensor - Main Hall',
    type: 'TEMPERATURE',
    location: 'Building A - Floor 1 - Main Hall',
    status: 'ONLINE',
    lastReading: {
      value: 72.5,
      unit: '°F',
      timestamp: new Date(Date.now() - 15000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 85,
      critical: 95,
      emergency: 105
    },
    batteryLevel: 78,
    signalStrength: 88
  },
  {
    id: 'gas-003',
    name: 'Gas Detector - Kitchen',
    type: 'GAS_DETECTOR',
    location: 'Building B - Floor 1 - Kitchen',
    status: 'ONLINE',
    lastReading: {
      value: 0.02,
      unit: 'LEL%',
      timestamp: new Date(Date.now() - 45000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 10,
      critical: 25,
      emergency: 50
    },
    batteryLevel: 92,
    signalStrength: 95
  },
  {
    id: 'motion-004',
    name: 'Motion Sensor - East Entrance',
    type: 'MOTION_SENSOR',
    location: 'Building A - East Entrance',
    status: 'ONLINE',
    lastReading: {
      value: 1,
      unit: 'detected',
      timestamp: new Date(Date.now() - 120000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 1,
      critical: 1,
      emergency: 1
    },
    batteryLevel: 67,
    signalStrength: 82
  },
  {
    id: 'water-005',
    name: 'Water Leak Sensor - Basement',
    type: 'WATER_LEAK',
    location: 'Building A - Basement - Utility Room',
    status: 'ONLINE',
    lastReading: {
      value: 0,
      unit: 'detected',
      timestamp: new Date(Date.now() - 60000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 1,
      critical: 1,
      emergency: 1
    },
    batteryLevel: 89,
    signalStrength: 76
  },
  {
    id: 'air-006',
    name: 'Air Quality Monitor - Office Area',
    type: 'AIR_QUALITY',
    location: 'Building A - Floor 2 - Open Office',
    status: 'ONLINE',
    lastReading: {
      value: 45,
      unit: 'AQI',
      timestamp: new Date(Date.now() - 90000),
      quality: 'GOOD'
    },
    thresholds: {
      warning: 100,
      critical: 150,
      emergency: 200
    },
    batteryLevel: 94,
    signalStrength: 91
  }
];

export const mockAlarmTriggers: AlarmTrigger[] = [
  {
    id: 'alarm-001',
    sensorId: 'smoke-001',
    triggerType: 'AI_INFERENCE',
    severity: 'CRITICAL',
    message: 'AI detected smoke pattern indicating potential fire in server room',
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false,
    autoResponse: [
      'Fire suppression system activated',
      'Emergency services notified',
      'Building evacuation initiated'
    ]
  },
  {
    id: 'alarm-002',
    sensorId: 'temp-002',
    triggerType: 'THRESHOLD',
    severity: 'HIGH',
    message: 'Temperature exceeded critical threshold in main hall',
    timestamp: new Date(Date.now() - 600000),
    acknowledged: true,
    autoResponse: [
      'HVAC system adjustment triggered',
      'Maintenance team notified'
    ]
  }
];