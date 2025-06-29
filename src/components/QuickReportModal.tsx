import React, { useState } from 'react';
import { X, MapPin, Phone, AlertTriangle, Camera, Mic, Clock } from 'lucide-react';

interface QuickReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (report: any) => void;
}

export const QuickReportModal: React.FC<QuickReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    severity: 'MEDIUM',
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    coordinates: { latitude: 0, longitude: 0 },
    hasInjuries: false,
    estimatedPeople: 1,
    immediateHelp: false
  });

  const [isRecording, setIsRecording] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'getting' | 'success' | 'error'>('idle');

  const emergencyTypes = [
    { id: 'fire', name: 'Fire Emergency', icon: '🔥', color: 'bg-red-100 text-red-800' },
    { id: 'medical', name: 'Medical Emergency', icon: '🚑', color: 'bg-pink-100 text-pink-800' },
    { id: 'security', name: 'Security Incident', icon: '🛡️', color: 'bg-orange-100 text-orange-800' },
    { id: 'natural', name: 'Natural Disaster', icon: '🌪️', color: 'bg-blue-100 text-blue-800' },
    { id: 'chemical', name: 'Chemical Hazard', icon: '☢️', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'power', name: 'Power Emergency', icon: '⚡', color: 'bg-purple-100 text-purple-800' }
  ];

  const getCurrentLocation = () => {
    setLocationStatus('getting');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }));
          setLocationStatus('success');
          
          // Reverse geocoding simulation
          setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)} - Current Location`
            }));
          }, 1000);
        },
        (error) => {
          console.error('Location error:', error);
          setLocationStatus('error');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocationStatus('error');
    }
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording
    setTimeout(() => {
      setIsRecording(false);
      setFormData(prev => ({
        ...prev,
        description: prev.description + ' [Voice recording: "There is smoke coming from the electrical room on the third floor. I can smell burning plastic."]'
      }));
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      timestamp: new Date(),
      id: Date.now().toString(),
      reportedBy: {
        type: 'MANUAL',
        source: formData.contactName || 'Anonymous',
        contactInfo: formData.contactPhone
      }
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b bg-red-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Report Emergency</h2>
              <p className="text-sm text-gray-600">Provide details for immediate response</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Emergency Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Emergency Type *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emergencyTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === type.id
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-xs font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Severity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Severity Level *</label>
            <div className="flex space-x-3">
              {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    formData.severity === level
                      ? level === 'CRITICAL' ? 'bg-red-600 text-white'
                        : level === 'HIGH' ? 'bg-orange-600 text-white'
                        : level === 'MEDIUM' ? 'bg-yellow-600 text-white'
                        : 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter specific location or address"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                disabled={locationStatus === 'getting'}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  locationStatus === 'success' ? 'bg-green-100 text-green-700'
                  : locationStatus === 'error' ? 'bg-red-100 text-red-700'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {locationStatus === 'getting' ? 'Getting...' 
                   : locationStatus === 'success' ? 'Got Location'
                   : locationStatus === 'error' ? 'Failed'
                   : 'Use GPS'}
                </span>
              </button>
            </div>
          </div>

          {/* Description with Voice Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <div className="relative">
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the emergency situation in detail..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                required
              />
              <button
                type="button"
                onClick={startVoiceRecording}
                disabled={isRecording}
                className={`absolute bottom-3 right-3 p-2 rounded-lg transition-colors ${
                  isRecording 
                    ? 'bg-red-100 text-red-600 animate-pulse' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            {isRecording && (
              <p className="text-sm text-red-600 mt-1 flex items-center">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2"></div>
                Recording voice description...
              </p>
            )}
          </div>

          {/* Quick Assessment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.hasInjuries}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasInjuries: e.target.checked }))}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">Injuries reported</span>
              </label>
            </div>
            
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.immediateHelp}
                  onChange={(e) => setFormData(prev => ({ ...prev, immediateHelp: e.target.checked }))}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm font-medium text-gray-700">Immediate help needed</span>
              </label>
            </div>
          </div>

          {/* People Affected */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated People Affected</label>
            <input
              type="number"
              value={formData.estimatedPeople}
              onChange={(e) => setFormData(prev => ({ ...prev, estimatedPeople: parseInt(e.target.value) || 1 }))}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="+1-555-000-0000"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Report Emergency</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};