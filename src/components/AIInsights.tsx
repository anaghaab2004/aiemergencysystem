import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Target } from 'lucide-react';

export const AIInsights: React.FC = () => {
  const insights = [
    {
      type: 'trend',
      title: 'Pattern Detection',
      description: 'Fire incidents increase by 23% during evening hours',
      confidence: 87,
      icon: TrendingUp,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      type: 'prediction',
      title: 'Risk Assessment',
      description: 'High probability of equipment failure in Building C',
      confidence: 92,
      icon: AlertTriangle,
      color: 'text-orange-600 bg-orange-100'
    },
    {
      type: 'optimization',
      title: 'Response Optimization',
      description: 'Recommended: Deploy Unit 3 to Zone B for faster coverage',
      confidence: 78,
      icon: Target,
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-purple-600" />
        AI Insights & Predictions
      </h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${insight.color}`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <p className="text-gray-600 mt-1">{insight.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <span className="text-gray-500">Confidence:</span>
                <span className="font-semibold text-purple-600">{insight.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span className="font-medium text-purple-900">AI System Status</span>
        </div>
        <p className="text-sm text-purple-700 mt-1">
          Processing 1,247 data points from 23 sensors. Last updated: 2 seconds ago
        </p>
      </div>
    </div>
  );
};