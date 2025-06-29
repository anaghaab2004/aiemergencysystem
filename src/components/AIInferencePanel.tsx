import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Zap, Target, Activity } from 'lucide-react';
import { AIInferenceResult } from '../types/sensor';

interface AIInferencePanelProps {
  inferenceResults: AIInferenceResult[];
}

export const AIInferencePanel: React.FC<AIInferencePanelProps> = ({ inferenceResults }) => {
  const getThreatLevelColor = (level: number) => {
    if (level >= 80) return 'text-red-600 bg-red-100 border-red-200';
    if (level >= 60) return 'text-orange-600 bg-orange-100 border-orange-200';
    if (level >= 40) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-green-600 bg-green-100 border-green-200';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          <Brain className="w-6 h-6 mr-2 text-purple-600" />
          AI Inference Engine
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Processing Live Data</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            System Performance
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Processing Speed</span>
              <span className="text-sm font-medium">847ms avg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Data Points/sec</span>
              <span className="text-sm font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Model Accuracy</span>
              <span className="text-sm font-medium text-green-600">94.7%</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-blue-600" />
            Real-time Analysis
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Active Sensors</span>
              <span className="text-sm font-medium">23/25</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Pattern Detection</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Anomaly Detection</span>
              <span className="text-sm font-medium text-green-600">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-orange-600" />
          Current Inference Results
        </h4>
        
        {inferenceResults.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No active threats detected</p>
            <p className="text-sm">AI monitoring all sensors normally</p>
          </div>
        ) : (
          <div className="space-y-3">
            {inferenceResults.map((result, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">{result.emergencyType}</h5>
                    <p className="text-sm text-gray-600 mt-1">{result.recommendedAction}</p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getThreatLevelColor(result.threatLevel)}`}>
                      Threat: {result.threatLevel}%
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Confidence: </span>
                      <span className={`font-medium ${getConfidenceColor(result.confidence)}`}>
                        {result.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {result.riskFactors.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-sm font-medium text-gray-700 mb-2">Risk Factors:</h6>
                    <div className="flex flex-wrap gap-1">
                      {result.riskFactors.map((factor, idx) => (
                        <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {factor}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {result.predictedEscalation && (
                  <div className="flex items-center space-x-2 text-sm text-orange-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Escalation predicted - immediate action recommended</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};