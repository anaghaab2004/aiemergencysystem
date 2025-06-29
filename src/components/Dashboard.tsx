import React from 'react';
import { TrendingUp, Users, Clock, Shield } from 'lucide-react';

interface DashboardProps {
  stats: {
    totalEmergencies: number;
    activeEmergencies: number;
    averageResponseTime: number;
    systemUptime: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Emergencies</p>
            <p className="text-3xl font-bold text-red-600">{stats.activeEmergencies}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-lg">
            <TrendingUp className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Incidents</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalEmergencies}</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
            <p className="text-3xl font-bold text-orange-600">{stats.averageResponseTime}m</p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">System Uptime</p>
            <p className="text-3xl font-bold text-green-600">{stats.systemUptime}%</p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};