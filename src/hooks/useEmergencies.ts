import { useState, useEffect } from 'react';
import { Emergency } from '../types/emergency';
import { mockEmergencies } from '../data/mockData';

export const useEmergencies = () => {
  const [emergencies, setEmergencies] = useState<Emergency[]>(mockEmergencies);
  const [loading, setLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencies(prev => {
        return prev.map(emergency => {
          // Simulate AI confidence updates
          if (emergency.status === 'ACTIVE' && Math.random() > 0.7) {
            return {
              ...emergency,
              aiConfidence: Math.min(100, emergency.aiConfidence + Math.floor(Math.random() * 5))
            };
          }
          
          // Simulate status updates
          if (emergency.status === 'RESPONDING' && Math.random() > 0.8) {
            return {
              ...emergency,
              status: 'RESOLVED' as const,
              estimatedResponseTime: undefined
            };
          }
          
          return emergency;
        });
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addEmergency = (emergency: Omit<Emergency, 'id' | 'timestamp'>) => {
    const newEmergency: Emergency = {
      ...emergency,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setEmergencies(prev => [newEmergency, ...prev]);
  };

  const updateEmergencyStatus = (id: string, status: Emergency['status']) => {
    setEmergencies(prev =>
      prev.map(emergency =>
        emergency.id === id ? { ...emergency, status } : emergency
      )
    );
  };

  const getActiveEmergencies = () => emergencies.filter(e => e.status === 'ACTIVE');
  const getStats = () => ({
    totalEmergencies: emergencies.length,
    activeEmergencies: getActiveEmergencies().length,
    averageResponseTime: 12,
    systemUptime: 99.7
  });

  return {
    emergencies,
    loading,
    addEmergency,
    updateEmergencyStatus,
    getActiveEmergencies,
    getStats
  };
};