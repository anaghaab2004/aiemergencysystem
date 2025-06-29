import React, { useEffect } from 'react';
import { 
  MapPin, 
  AlertTriangle, 
  Navigation, 
  Eye, 
  EyeOff,
  Clock,
  Users,
  Zap
} from 'lucide-react';
import { useLocationEmergencies } from '../hooks/useLocationEmergencies';
import { useAlarmSystem } from '../hooks/useAlarmSystem';

export const LocationEmergencyMonitor: React.FC = () => {
  const { 
    nearbyEmergencies, 
    isMonitoring, 
    userLocation, 
    toggleMonitoring, 
    clearNearbyEmergencies 
  } = useLocationEmergencies();
  
  const { startAlarm } = useAlarmSystem();

  // Trigger alarm when critical emergency is detected nearby
  useEffect(() => {
    const criticalEmergency = nearbyEmergencies.find(
      e => e.severity === 'CRITICAL' && e.isInRange && e.distance < 1000
    );
    
    if (criticalEmergency) {
      const alarmType = criticalEmergency.type.id === 'fire' ? 'FIRE' : 'GENERAL';
      startAlarm(alarmType as any);
    }
  }, [nearbyEmergencies, startAlarm]);

  const formatDistance = (distance: number) => {
    if (distance < 1000) {
      return `${Math.round(distance)}m`;
    }
    return `${(distance / 1000).toFixed(1)}km`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-l-red-600 bg-red-50';
      case 'HIGH': return 'border-l-orange-600 bg-orange-50';
      case 'MEDIUM': return 'border-l-yellow-600 bg-yellow-50';
      default: return 'border-l-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <MapPin className="w-6 h-6 mr-2 text-blue-600" />
          Location Emergency Monitor
        </h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-gray-600">
              {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
            </span>
          </div>
          <button
            onClick={toggleMonitoring}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
              isMonitoring 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isMonitoring ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm">{isMonitoring ? 'Pause' : 'Resume'}</span>
          </button>
        </div>
      </div>

      {/* User Location Status */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <Navigation className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">Your Current Location</span>
        </div>
        {userLocation.loading ? (
          <p className="text-sm text-blue-700">Getting your location...</p>
        ) : userLocation.error ? (
          <p className="text-sm text-red-600">Location access denied: {userLocation.error}</p>
        ) : (
          <div className="text-sm text-blue-700 space-y-1">
            <p>Latitude: {userLocation.latitude?.toFixed(6)}</p>
            <p>Longitude: {userLocation.longitude?.toFixed(6)}</p>
            <p>Accuracy: ±{userLocation.accuracy?.toFixed(0)}m</p>
            <p className="text-xs text-blue-600">Monitoring 5km radius for emergencies</p>
          </div>
        )}
      </div>

      {/* Nearby Emergencies */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Nearby Emergencies ({nearbyEmergencies.length})
          </h4>
          {nearbyEmergencies.length > 0 && (
            <button
              onClick={clearNearbyEmergencies}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {nearbyEmergencies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p className="font-medium">No Emergencies Detected</p>
            <p className="text-sm">Your area is currently safe</p>
            {!isMonitoring && (
              <p className="text-sm text-orange-600 mt-2">
                Monitoring is paused - click Resume to continue
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {nearbyEmergencies.map((emergency) => (
              <div
                key={emergency.id}
                className={`border-l-4 rounded-r-lg p-4 ${getSeverityColor(emergency.severity)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-semibold text-gray-900">{emergency.type.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emergency.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        emergency.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {emergency.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{emergency.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{emergency.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Navigation className="w-3 h-3" />
                        <span>{formatDistance(emergency.distance)} away</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(emergency.timestamp).toLocaleTimeString()}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    {emergency.distance < 500 && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium animate-pulse">
                        VERY CLOSE
                      </span>
                    )}
                    <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      <Navigation className="w-3 h-3" />
                      <span className="text-xs">Navigate</span>
                    </button>
                  </div>
                </div>

                {emergency.affectedArea && (
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Zap className="w-3 h-3" />
                        <span>Radius: {emergency.affectedArea.radius}m</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>~{emergency.affectedArea.estimatedPeople} people</span>
                      </span>
                    </div>
                    {emergency.affectedArea.evacuationZone && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        EVACUATION ZONE
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safety Instructions */}
      {nearbyEmergencies.some(e => e.distance < 1000) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-900">Safety Alert</span>
          </div>
          <p className="text-sm text-yellow-800">
            Emergency detected within 1km of your location. Stay alert and follow local emergency protocols.
          </p>
          <div className="mt-2 space-y-1 text-xs text-yellow-700">
            <p>• Stay informed through official channels</p>
            <p>• Be prepared to evacuate if instructed</p>
            <p>• Keep emergency contacts readily available</p>
          </div>
        </div>
      )}
    </div>
  );
};