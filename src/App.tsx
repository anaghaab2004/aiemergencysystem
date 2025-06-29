import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { EmergencyCard } from './components/EmergencyCard';
import { EmergencyModal } from './components/EmergencyModal';
import { ContactsList } from './components/ContactsList';
import { AIInsights } from './components/AIInsights';
import { SensorGrid } from './components/SensorGrid';
import { AIInferencePanel } from './components/AIInferencePanel';
import { AlarmSystem } from './components/AlarmSystem';
import { SystemArchitecture } from './components/SystemArchitecture';
import { QuickReportModal } from './components/QuickReportModal';
import { LiveUpdatesPanel } from './components/LiveUpdatesPanel';
import { AlarmControlPanel } from './components/AlarmControlPanel';
import { LocationEmergencyMonitor } from './components/LocationEmergencyMonitor';
import { useEmergencies } from './hooks/useEmergencies';
import { useSensors } from './hooks/useSensors';
import { mockContacts } from './data/mockData';
import { Emergency, Sensor } from './types/emergency';
import { AlertTriangle, Plus, Activity, Brain, Bell, Cpu, Zap, MapPin, Volume2 } from 'lucide-react';

function App() {
  const { emergencies, getActiveEmergencies, getStats, addEmergency } = useEmergencies();
  const { sensors, alarms, aiInferences, acknowledgeAlarm, getSensorStats } = useSensors();
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'sensors' | 'ai' | 'alarms' | 'location' | 'sound' | 'architecture'>('overview');
  
  const activeEmergencies = getActiveEmergencies();
  const stats = getStats();
  const sensorStats = getSensorStats();
  
  const systemStatus = activeEmergencies.length > 0 
    ? activeEmergencies.some(e => e.severity === 'CRITICAL') ? 'CRITICAL' : 'ALERT'
    : alarms.filter(a => !a.acknowledged).length > 0 ? 'ALERT' : 'NORMAL';

  const handleEmergencyClick = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setIsModalOpen(true);
  };

  const handleSensorClick = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmergency(null);
  };

  const handleReportSubmit = (reportData: any) => {
    const newEmergency = {
      type: {
        id: reportData.type,
        name: reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1) + ' Emergency',
        icon: 'AlertTriangle',
        color: 'text-red-600',
        protocols: [],
        requiredUnits: ['FIRE', 'MEDICAL'],
        averageResponseTime: 8
      },
      severity: reportData.severity,
      status: 'ACTIVE' as const,
      location: reportData.location,
      coordinates: reportData.coordinates,
      address: {
        street: reportData.location,
        city: 'Current Location',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      description: reportData.description,
      aiConfidence: 85,
      respondingUnits: [],
      reportedBy: reportData.reportedBy,
      priority: reportData.severity === 'CRITICAL' ? 10 : reportData.severity === 'HIGH' ? 8 : 6,
      affectedArea: {
        radius: 100,
        evacuationZone: reportData.severity === 'CRITICAL',
        estimatedPeople: reportData.estimatedPeople
      }
    };
    
    addEmergency(newEmergency);
    setIsReportModalOpen(false);
  };

  const tabs = [
    { id: 'overview', label: 'Emergency Overview', icon: Activity },
    { id: 'location', label: 'Location Monitor', icon: MapPin },
    { id: 'sound', label: 'Alarm Control', icon: Volume2 },
    { id: 'sensors', label: 'Sensor Network', icon: Activity },
    { id: 'ai', label: 'AI Intelligence', icon: Brain },
    { id: 'alarms', label: 'Active Alarms', icon: Bell },
    { id: 'architecture', label: 'System Status', icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        systemStatus={systemStatus} 
        activeEmergencies={activeEmergencies.length + alarms.filter(a => !a.acknowledged).length} 
      />
      
      {/* Quick Action Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${systemStatus === 'CRITICAL' ? 'bg-red-500 animate-pulse' : systemStatus === 'ALERT' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                <span className="font-medium">System Status: {systemStatus}</span>
              </div>
              <div className="text-sm text-gray-600">
                Last Update: {new Date().toLocaleTimeString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <MapPin className="w-4 h-4" />
                <span>View Map</span>
              </button>
              <button 
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Report Emergency</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <>
            <Dashboard stats={{...stats, ...sensorStats}} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <AlertTriangle className="w-7 h-7 mr-2 text-red-600" />
                    Active Emergencies
                    {activeEmergencies.length > 0 && (
                      <span className="ml-3 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        {activeEmergencies.length} Active
                      </span>
                    )}
                  </h2>
                  
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      <Zap className="w-4 h-4" />
                      <span>Emergency Broadcast</span>
                    </button>
                  </div>
                </div>
                
                {activeEmergencies.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">All Systems Normal</h3>
                    <p className="text-gray-600">No active emergencies detected. All monitoring systems operational.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeEmergencies.map((emergency) => (
                      <EmergencyCard
                        key={emergency.id}
                        emergency={emergency}
                        onClick={handleEmergencyClick}
                      />
                    ))}
                  </div>
                )}
                
                {emergencies.filter(e => e.status !== 'ACTIVE').length > 0 && (
                  <>
                    <h3 className="text-xl font-bold text-gray-900 mt-8">Recent Incidents</h3>
                    <div className="space-y-4">
                      {emergencies
                        .filter(e => e.status !== 'ACTIVE')
                        .slice(0, 3)
                        .map((emergency) => (
                          <EmergencyCard
                            key={emergency.id}
                            emergency={emergency}
                            onClick={handleEmergencyClick}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="space-y-6">
                <LiveUpdatesPanel />
                <AIInsights />
                <ContactsList contacts={mockContacts} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'location' && (
          <div className="space-y-6">
            <LocationEmergencyMonitor />
          </div>
        )}

        {activeTab === 'sound' && (
          <div className="space-y-6">
            <AlarmControlPanel />
          </div>
        )}

        {activeTab === 'sensors' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Activity className="w-7 h-7 mr-2 text-blue-600" />
                Sensor Network Status
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Online: {sensorStats.onlineSensors}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Offline: {sensorStats.offlineSensors}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Alerts: {sensorStats.activeAlarms}</span>
                </div>
              </div>
            </div>
            
            <SensorGrid sensors={sensors} onSensorClick={handleSensorClick} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Brain className="w-7 h-7 mr-2 text-purple-600" />
                AI Intelligence Engine
              </h2>
            </div>
            
            <AIInferencePanel inferenceResults={aiInferences} />
          </div>
        )}

        {activeTab === 'alarms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="w-7 h-7 mr-2 text-red-600" />
                Alarm Management System
              </h2>
            </div>
            
            <AlarmSystem alarms={alarms} onAcknowledge={acknowledgeAlarm} />
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Cpu className="w-7 h-7 mr-2 text-blue-600" />
                System Architecture & Status
              </h2>
            </div>
            
            <SystemArchitecture />
          </div>
        )}
      </main>
      
      <EmergencyModal
        emergency={selectedEmergency}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      
      <QuickReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </div>
  );
}

export default App;