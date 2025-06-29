import { Emergency, EmergencyContact, RespondingUnit } from '../types/emergency';

export const mockEmergencies: Emergency[] = [
  {
    id: '1',
    type: {
      id: 'fire', 
      name: 'Structure Fire', 
      icon: 'Flame', 
      color: 'text-red-600',
      protocols: [
        'Evacuate all personnel within 500m radius',
        'Deploy fire suppression systems',
        'Contact fire department - Engine 12, Ladder 7',
        'Establish incident command center',
        'Monitor air quality and wind direction'
      ],
      requiredUnits: ['FIRE', 'MEDICAL'],
      averageResponseTime: 6
    },
    severity: 'CRITICAL',
    status: 'ACTIVE',
    location: 'TechCorp Building - Server Room 3A',
    coordinates: { latitude: 40.7589, longitude: -73.9851 },
    address: {
      street: '1247 Technology Drive, Suite 300',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    description: 'Smoke and heat detected in server room. Multiple sensors triggered. Electrical fire suspected from UPS system malfunction.',
    timestamp: new Date(Date.now() - 180000), // 3 minutes ago
    aiConfidence: 96,
    respondingUnits: [
      {
        id: 'fire-12',
        type: 'FIRE',
        name: 'Engine 12',
        status: 'EN_ROUTE',
        eta: 4,
        currentLocation: { latitude: 40.7505, longitude: -73.9934 },
        personnel: 4,
        equipment: ['1000 GPM Pump', 'Ladder', 'Hose Lines', 'SCBA Equipment']
      },
      {
        id: 'medical-7',
        type: 'MEDICAL',
        name: 'Ambulance 7',
        status: 'DISPATCHED',
        eta: 6,
        currentLocation: { latitude: 40.7614, longitude: -73.9776 },
        personnel: 2,
        equipment: ['AED', 'Oxygen', 'Trauma Kit', 'Stretcher']
      }
    ],
    estimatedResponseTime: 4,
    reportedBy: {
      type: 'SENSOR',
      source: 'AI Fire Detection System',
      contactInfo: 'Automated Detection'
    },
    priority: 9,
    affectedArea: {
      radius: 500,
      evacuationZone: true,
      estimatedPeople: 150
    },
    weatherConditions: {
      temperature: 72,
      humidity: 45,
      windSpeed: 8,
      conditions: 'Clear'
    }
  },
  {
    id: '2',
    type: {
      id: 'medical', 
      name: 'Medical Emergency', 
      icon: 'Heart', 
      color: 'text-pink-600',
      protocols: [
        'Assess patient vital signs',
        'Provide immediate first aid',
        'Clear access routes for paramedics',
        'Contact nearest hospital',
        'Prepare patient information'
      ],
      requiredUnits: ['MEDICAL'],
      averageResponseTime: 8
    },
    severity: 'HIGH',
    status: 'RESPONDING',
    location: 'Downtown Plaza - Main Lobby',
    coordinates: { latitude: 40.7505, longitude: -73.9934 },
    address: {
      street: '789 Commerce Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10013',
      country: 'USA'
    },
    description: 'Male, approximately 45 years old, collapsed. Witnesses report chest pain. CPR in progress by trained staff.',
    timestamp: new Date(Date.now() - 420000), // 7 minutes ago
    aiConfidence: 89,
    respondingUnits: [
      {
        id: 'medical-3',
        type: 'MEDICAL',
        name: 'Paramedic Unit 3',
        status: 'ON_SCENE',
        eta: 0,
        currentLocation: { latitude: 40.7505, longitude: -73.9934 },
        personnel: 3,
        equipment: ['Advanced Life Support', 'Cardiac Monitor', 'Medications', 'Intubation Kit']
      }
    ],
    estimatedResponseTime: 0,
    reportedBy: {
      type: 'PHONE_CALL',
      source: 'Security Guard',
      contactInfo: '+1-555-0199'
    },
    priority: 8,
    affectedArea: {
      radius: 50,
      evacuationZone: false,
      estimatedPeople: 25
    },
    weatherConditions: {
      temperature: 68,
      humidity: 52,
      windSpeed: 5,
      conditions: 'Partly Cloudy'
    }
  },
  {
    id: '3',
    type: {
      id: 'security', 
      name: 'Security Breach', 
      icon: 'Shield', 
      color: 'text-orange-600',
      protocols: [
        'Lock down affected areas',
        'Review security camera footage',
        'Contact law enforcement',
        'Account for all personnel',
        'Preserve evidence'
      ],
      requiredUnits: ['POLICE'],
      averageResponseTime: 12
    },
    severity: 'MEDIUM',
    status: 'RESOLVED',
    location: 'Corporate Center - East Wing Entrance',
    coordinates: { latitude: 40.7614, longitude: -73.9776 },
    address: {
      street: '456 Business Park Drive',
      city: 'New York',
      state: 'NY',
      zipCode: '10005',
      country: 'USA'
    },
    description: 'Unauthorized access attempt detected by facial recognition system. Individual attempted to tailgate through secure entrance.',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    aiConfidence: 82,
    respondingUnits: [
      {
        id: 'security-1',
        type: 'POLICE',
        name: 'Security Team Alpha',
        status: 'AVAILABLE',
        eta: 0,
        currentLocation: { latitude: 40.7614, longitude: -73.9776 },
        personnel: 2,
        equipment: ['Radio', 'Access Cards', 'Restraints', 'Camera']
      }
    ],
    reportedBy: {
      type: 'AI_DETECTION',
      source: 'Facial Recognition System',
      contactInfo: 'Automated Detection'
    },
    priority: 5,
    affectedArea: {
      radius: 100,
      evacuationZone: false,
      estimatedPeople: 30
    }
  }
];

export const mockContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Captain John Rodriguez',
    role: 'Fire Department Chief',
    phone: '+1-555-FIRE-01',
    email: 'j.rodriguez@nyfd.gov',
    specialties: ['Structure Fires', 'Hazmat', 'Rescue Operations', 'Incident Command'],
    isAvailable: true,
    currentLocation: { latitude: 40.7505, longitude: -73.9934 },
    responseTime: 5
  },
  {
    id: '2',
    name: 'Dr. Sarah Chen',
    role: 'Emergency Medical Director',
    phone: '+1-555-MED-911',
    email: 's.chen@nyhospital.org',
    specialties: ['Trauma Surgery', 'Emergency Medicine', 'Toxicology', 'Mass Casualty'],
    isAvailable: true,
    currentLocation: { latitude: 40.7614, longitude: -73.9776 },
    responseTime: 8
  },
  {
    id: '3',
    name: 'Lieutenant Michael Torres',
    role: 'Police Operations Commander',
    phone: '+1-555-POLICE',
    email: 'm.torres@nypd.gov',
    specialties: ['Crisis Negotiation', 'SWAT Operations', 'Counter-Terrorism', 'Investigation'],
    isAvailable: false,
    responseTime: 12
  },
  {
    id: '4',
    name: 'Lisa Park',
    role: 'Emergency Management Coordinator',
    phone: '+1-555-EMRG-CO',
    email: 'l.park@nyc.gov',
    specialties: ['Disaster Response', 'Public Safety', 'Communications', 'Resource Management'],
    isAvailable: true,
    currentLocation: { latitude: 40.7589, longitude: -73.9851 },
    responseTime: 15
  }
];