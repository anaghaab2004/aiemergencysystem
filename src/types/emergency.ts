export interface Emergency {
  id: string;
  type: EmergencyType;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'ACTIVE' | 'RESPONDING' | 'RESOLVED' | 'DISPATCHED';
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  description: string;
  timestamp: Date;
  aiConfidence: number;
  respondingUnits: RespondingUnit[];
  estimatedResponseTime?: number;
  reportedBy: {
    type: 'SENSOR' | 'MANUAL' | 'AI_DETECTION' | 'PHONE_CALL' | 'MOBILE_APP';
    source: string;
    contactInfo?: string;
  };
  priority: number; // 1-10 scale
  affectedArea: {
    radius: number; // in meters
    evacuationZone?: boolean;
    estimatedPeople: number;
  };
  weatherConditions?: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    conditions: string;
  };
}

export interface RespondingUnit {
  id: string;
  type: 'FIRE' | 'MEDICAL' | 'POLICE' | 'HAZMAT' | 'RESCUE';
  name: string;
  status: 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'AVAILABLE';
  eta: number; // minutes
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  personnel: number;
  equipment: string[];
}

export interface EmergencyType {
  id: string;
  name: string;
  icon: string;
  color: string;
  protocols: string[];
  requiredUnits: string[];
  averageResponseTime: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  specialties: string[];
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  responseTime: number; // average in minutes
}

export interface AIThreatAssessment {
  threatLevel: number;
  confidence: number;
  predictedOutcome: string;
  recommendedActions: string[];
  riskFactors: string[];
  escalationProbability: number;
  timeToEscalation?: number; // minutes
}

export interface LiveUpdate {
  id: string;
  emergencyId: string;
  timestamp: Date;
  type: 'STATUS_CHANGE' | 'UNIT_DISPATCH' | 'ARRIVAL' | 'ESCALATION' | 'RESOLUTION';
  message: string;
  source: string;
}