import { useState, useEffect } from 'react';
import { Emergency } from '../types/emergency';
import { useGeolocation } from './useGeolocation';

interface LocationEmergency extends Emergency {
  distance: number; // in meters
  isInRange: boolean;
}

export const useLocationEmergencies = (alertRadius: number = 5000) => {
  const [nearbyEmergencies, setNearbyEmergencies] = useState<LocationEmergency[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(true);
  const location = useGeolocation();

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Simulate real-time emergency detection in user's area
  useEffect(() => {
    if (!location.latitude || !location.longitude || !isMonitoring) return;

    const checkForNearbyEmergencies = () => {
      // Simulate emergency detection based on user location
      const simulatedEmergencies: Emergency[] = [
        {
          id: `local-${Date.now()}`,
          type: {
            id: 'fire',
            name: 'Structure Fire',
            icon: 'Flame',
            color: 'text-red-600',
            protocols: ['Evacuate immediately', 'Call fire department'],
            requiredUnits: ['FIRE', 'MEDICAL'],
            averageResponseTime: 6
          },
          severity: 'HIGH',
          status: 'ACTIVE',
          location: 'Nearby Commercial Building',
          coordinates: {
            latitude: location.latitude + (Math.random() - 0.5) * 0.01,
            longitude: location.longitude + (Math.random() - 0.5) * 0.01
          },
          address: {
            street: '123 Main Street',
            city: 'Current City',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          description: 'Smoke detected in commercial building near your location',
          timestamp: new Date(),
          aiConfidence: 92,
          respondingUnits: [],
          reportedBy: {
            type: 'SENSOR',
            source: 'Local Fire Detection System'
          },
          priority: 8,
          affectedArea: {
            radius: 200,
            evacuationZone: true,
            estimatedPeople: 50
          }
        }
      ];

      // Only add emergency if random condition is met (simulate real detection)
      if (Math.random() > 0.95) {
        const emergency = simulatedEmergencies[0];
        const distance = calculateDistance(
          location.latitude,
          location.longitude,
          emergency.coordinates.latitude,
          emergency.coordinates.longitude
        );

        const locationEmergency: LocationEmergency = {
          ...emergency,
          distance,
          isInRange: distance <= alertRadius
        };

        setNearbyEmergencies(prev => {
          const exists = prev.some(e => e.id === emergency.id);
          if (!exists && locationEmergency.isInRange) {
            return [locationEmergency, ...prev.slice(0, 4)];
          }
          return prev;
        });
      }
    };

    const interval = setInterval(checkForNearbyEmergencies, 10000);
    return () => clearInterval(interval);
  }, [location.latitude, location.longitude, alertRadius, isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const clearNearbyEmergencies = () => {
    setNearbyEmergencies([]);
  };

  return {
    nearbyEmergencies,
    isMonitoring,
    userLocation: location,
    toggleMonitoring,
    clearNearbyEmergencies
  };
};