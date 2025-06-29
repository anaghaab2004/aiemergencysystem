import React from 'react';
import { MapPin, Navigation, Zap, Users, Clock } from 'lucide-react';
import { Emergency, RespondingUnit } from '../types/emergency';

interface LocationMapProps {
  emergency: Emergency;
}

export const LocationMap: React.FC<LocationMapProps> = ({ emergency }) => {
  const getUnitStatusColor = (status: string) => {
    switch (status) {
      case 'ON_SCENE': return 'bg-green-500';
      case 'EN_ROUTE': return 'bg-blue-500';
      case 'DISPATCHED': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getUnitIcon = (type: string) => {
    switch (type) {
      case 'FIRE': return '🚒';
      case 'MEDICAL': return '🚑';
      case 'POLICE': return '🚔';
      case 'HAZMAT': return '☢️';
      case 'RESCUE': return '🚁';
      default: return '🚐';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Emergency Location & Response
        </h3>
        <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
          <Navigation className="w-4 h-4" />
          <span className="text-sm">Open in Maps</span>
        </button>
      </div>

      {/* Location Details */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <MapPin className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 mb-1">{emergency.location}</h4>
            <div className="text-sm text-red-700 space-y-1">
              <p>{emergency.address.street}</p>
              <p>{emergency.address.city}, {emergency.address.state} {emergency.address.zipCode}</p>
              <p className="font-mono text-xs">
                {emergency.coordinates.latitude.toFixed(6)}, {emergency.coordinates.longitude.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
        
        {emergency.affectedArea && (
          <div className="mt-3 pt-3 border-t border-red-200">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-red-700">
                  <strong>Affected Radius:</strong> {emergency.affectedArea.radius}m
                </span>
                <span className="text-red-700">
                  <strong>Est. People:</strong> {emergency.affectedArea.estimatedPeople}
                </span>
              </div>
              {emergency.affectedArea.evacuationZone && (
                <span className="px-2 py-1 bg-red-200 text-red-800 rounded-full text-xs font-medium">
                  EVACUATION ZONE
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-64 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Interactive Map</p>
            <p className="text-sm text-gray-500">Emergency location and responding units</p>
          </div>
        </div>
        
        {/* Simulated map markers */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-600 rotate-45"></div>
        </div>
        
        {/* Unit positions */}
        {emergency.respondingUnits.map((unit, index) => (
          <div
            key={unit.id}
            className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg ${getUnitStatusColor(unit.status)}`}
            style={{
              top: `${30 + index * 15}%`,
              left: `${25 + index * 20}%`
            }}
          ></div>
        ))}
      </div>

      {/* Responding Units */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Responding Units ({emergency.respondingUnits.length})
        </h4>
        
        <div className="space-y-3">
          {emergency.respondingUnits.map((unit) => (
            <div key={unit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getUnitIcon(unit.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-gray-900">{unit.name}</h5>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getUnitStatusColor(unit.status)}`}>
                      {unit.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{unit.personnel} personnel</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {unit.equipment.slice(0, 2).map((item, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                    {unit.equipment.length > 2 && (
                      <span className="text-xs text-gray-500">+{unit.equipment.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                {unit.eta > 0 ? (
                  <div className="flex items-center space-x-1 text-orange-600">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{unit.eta}min</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-green-600">
                    <Zap className="w-4 h-4" />
                    <span className="font-medium">On Scene</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Conditions */}
      {emergency.weatherConditions && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Current Weather Conditions</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-700 font-medium">Temperature:</span>
              <p className="text-blue-900">{emergency.weatherConditions.temperature}°F</p>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Humidity:</span>
              <p className="text-blue-900">{emergency.weatherConditions.humidity}%</p>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Wind Speed:</span>
              <p className="text-blue-900">{emergency.weatherConditions.windSpeed} mph</p>
            </div>
            <div>
              <span className="text-blue-700 font-medium">Conditions:</span>
              <p className="text-blue-900">{emergency.weatherConditions.conditions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};