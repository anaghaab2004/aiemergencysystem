import { useState, useEffect } from 'react';
import { Sensor, AlarmTrigger, AIInferenceResult } from '../types/sensor';
import { mockSensors, mockAlarmTriggers } from '../data/sensorData';

export const useSensors = () => {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [alarms, setAlarms] = useState<AlarmTrigger[]>(mockAlarmTriggers);
  const [aiInferences, setAiInferences] = useState<AIInferenceResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulate real-time sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => prev.map(sensor => {
        // Simulate sensor reading updates
        const variation = (Math.random() - 0.5) * 0.1;
        const newValue = Math.max(0, sensor.lastReading.value + variation);
        
        return {
          ...sensor,
          lastReading: {
            ...sensor.lastReading,
            value: parseFloat(newValue.toFixed(2)),
            timestamp: new Date(),
            quality: Math.random() > 0.1 ? 'GOOD' : 'FAIR'
          },
          batteryLevel: sensor.batteryLevel ? Math.max(0, sensor.batteryLevel - Math.random() * 0.1) : undefined,
          signalStrength: sensor.signalStrength ? Math.max(50, sensor.signalStrength + (Math.random() - 0.5) * 5) : undefined
        };
      }));

      // Simulate AI inference results
      if (Math.random() > 0.7) {
        const inferenceTypes = ['Fire Risk', 'Security Breach', 'Equipment Failure', 'Environmental Hazard'];
        const newInference: AIInferenceResult = {
          threatLevel: Math.floor(Math.random() * 100),
          confidence: Math.floor(Math.random() * 40) + 60,
          emergencyType: inferenceTypes[Math.floor(Math.random() * inferenceTypes.length)],
          recommendedAction: 'Monitor situation and prepare response protocols',
          riskFactors: ['Elevated readings', 'Pattern anomaly detected'],
          predictedEscalation: Math.random() > 0.8
        };
        
        setAiInferences(prev => [newInference, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate alarm generation based on sensor thresholds
  useEffect(() => {
    sensors.forEach(sensor => {
      const { value } = sensor.lastReading;
      const { warning, critical, emergency } = sensor.thresholds;
      
      if (value >= emergency && !alarms.some(a => a.sensorId === sensor.id && !a.acknowledged)) {
        const newAlarm: AlarmTrigger = {
          id: `alarm-${Date.now()}-${sensor.id}`,
          sensorId: sensor.id,
          triggerType: 'THRESHOLD',
          severity: 'CRITICAL',
          message: `Emergency threshold exceeded: ${value} ${sensor.lastReading.unit}`,
          timestamp: new Date(),
          acknowledged: false,
          autoResponse: [
            'Emergency services notified',
            'Automated safety protocols activated',
            'Area evacuation initiated'
          ]
        };
        setAlarms(prev => [newAlarm, ...prev]);
      }
    });
  }, [sensors, alarms]);

  const acknowledgeAlarm = (alarmId: string) => {
    setAlarms(prev => prev.map(alarm => 
      alarm.id === alarmId ? { ...alarm, acknowledged: true } : alarm
    ));
  };

  const getSensorStats = () => ({
    totalSensors: sensors.length,
    onlineSensors: sensors.filter(s => s.status === 'ONLINE').length,
    offlineSensors: sensors.filter(s => s.status === 'OFFLINE').length,
    activeAlarms: alarms.filter(a => !a.acknowledged).length,
    averageBattery: Math.round(
      sensors.reduce((sum, s) => sum + (s.batteryLevel || 0), 0) / sensors.length
    ),
    averageSignal: Math.round(
      sensors.reduce((sum, s) => sum + (s.signalStrength || 0), 0) / sensors.length
    )
  });

  return {
    sensors,
    alarms,
    aiInferences,
    loading,
    acknowledgeAlarm,
    getSensorStats
  };
};