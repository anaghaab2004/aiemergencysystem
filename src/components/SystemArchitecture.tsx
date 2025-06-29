import React from 'react';
import { 
  Cpu, 
  Wifi, 
  Brain, 
  Bell, 
  Cloud, 
  Monitor, 
  ArrowRight, 
  Activity,
  Database,
  Smartphone
} from 'lucide-react';

export const SystemArchitecture: React.FC = () => {
  const architectureSteps = [
    {
      title: 'Sensors',
      icon: Activity,
      description: 'IoT sensors collect environmental data',
      examples: ['Smoke Detectors', 'Temperature', 'Motion', 'Gas', 'Water Leak'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Microcontroller',
      icon: Cpu,
      description: 'Edge processing and data aggregation',
      examples: ['ESP32/Arduino', 'Data Filtering', 'Local Processing', 'Network Communication'],
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'AI Inference',
      icon: Brain,
      description: 'Machine learning models analyze patterns',
      examples: ['Threat Detection', 'Pattern Recognition', 'Anomaly Detection', 'Risk Assessment'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Alarm System',
      icon: Bell,
      description: 'Automated alerts and emergency response',
      examples: ['Sound Alarms', 'SMS/Email Alerts', 'Emergency Services', 'Evacuation Protocols'],
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Cloud Dashboard',
      icon: Monitor,
      description: 'Real-time monitoring and control interface',
      examples: ['Live Monitoring', 'Historical Data', 'Remote Control', 'Analytics'],
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Cpu className="w-6 h-6 mr-2 text-blue-600" />
        System Architecture Flow
      </h3>
      
      <div className="space-y-6">
        {/* Architecture Flow Diagram */}
        <div className="flex flex-wrap items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
          {architectureSteps.map((step, index) => (
            <React.Fragment key={step.title}>
              <div className="flex flex-col items-center space-y-2 min-w-[120px]">
                <div className={`p-3 rounded-lg ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="font-semibold text-sm text-center">{step.title}</h4>
              </div>
              {index < architectureSteps.length - 1 && (
                <ArrowRight className="w-6 h-6 text-gray-400 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Detailed Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {architectureSteps.map((step) => (
            <div key={step.title} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded ${step.color}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-gray-900">{step.title}</h4>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{step.description}</p>
              
              <div className="space-y-1">
                {step.examples.map((example, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                    <span className="text-gray-600">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Communication Flow */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Wifi className="w-5 h-5 mr-2 text-blue-600" />
            Communication Protocols
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded border">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-green-600" />
                <span className="font-medium text-sm">Sensor → MCU</span>
              </div>
              <p className="text-xs text-gray-600">I2C, SPI, UART, Analog</p>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <div className="flex items-center space-x-2 mb-2">
                <Wifi className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">MCU → Cloud</span>
              </div>
              <p className="text-xs text-gray-600">WiFi, LoRaWAN, Cellular</p>
            </div>
            
            <div className="bg-white p-3 rounded border">
              <div className="flex items-center space-x-2 mb-2">
                <Smartphone className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-sm">Cloud → Users</span>
              </div>
              <p className="text-xs text-gray-600">WebSocket, SMS, Email, Push</p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Data Processing</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Sensor Data Points/min:</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">AI Processing Time:</span>
                <span className="font-medium">847ms avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">System Uptime:</span>
                <span className="font-medium">99.7%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <Cloud className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Network Status</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Connected Devices:</span>
                <span className="font-medium">23/25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Network Latency:</span>
                <span className="font-medium">45ms avg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Data Transmission:</span>
                <span className="font-medium">99.2% success</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};