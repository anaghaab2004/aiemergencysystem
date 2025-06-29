import { EmergencyType } from '../types/emergency';

export const emergencyTypes: EmergencyType[] = [
  {
    id: 'fire',
    name: 'Fire Emergency',
    icon: 'Flame',
    color: 'text-red-600',
    protocols: [
      'Evacuate affected areas immediately',
      'Contact fire department',
      'Secure utilities (gas, electricity)',
      'Account for all personnel',
      'Establish safe perimeter'
    ]
  },
  {
    id: 'medical',
    name: 'Medical Emergency',
    icon: 'Heart',
    color: 'text-pink-600',
    protocols: [
      'Assess patient condition',
      'Call emergency medical services',
      'Provide first aid if trained',
      'Clear access routes for responders',
      'Document incident details'
    ]
  },
  {
    id: 'security',
    name: 'Security Breach',
    icon: 'Shield',
    color: 'text-orange-600',
    protocols: [
      'Secure all entry points',
      'Contact security personnel',
      'Preserve evidence',
      'Account for all personnel',
      'Review security footage'
    ]
  },
  {
    id: 'natural',
    name: 'Natural Disaster',
    icon: 'CloudRain',
    color: 'text-blue-600',
    protocols: [
      'Monitor weather conditions',
      'Activate emergency shelters',
      'Secure outdoor equipment',
      'Check communication systems',
      'Coordinate with local authorities'
    ]
  },
  {
    id: 'chemical',
    name: 'Chemical Hazard',
    icon: 'Beaker',
    color: 'text-yellow-600',
    protocols: [
      'Evacuate contaminated area',
      'Contact hazmat team',
      'Use protective equipment',
      'Decontaminate personnel',
      'Monitor air quality'
    ]
  },
  {
    id: 'power',
    name: 'Power Outage',
    icon: 'Zap',
    color: 'text-purple-600',
    protocols: [
      'Switch to backup power',
      'Check critical systems',
      'Contact utility company',
      'Secure sensitive equipment',
      'Update status boards'
    ]
  }
];