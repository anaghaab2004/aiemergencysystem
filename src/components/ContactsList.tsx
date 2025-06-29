import React from 'react';
import { EmergencyContact } from '../types/emergency';
import { Phone, Mail, User, CheckCircle, XCircle } from 'lucide-react';

interface ContactsListProps {
  contacts: EmergencyContact[];
}

export const ContactsList: React.FC<ContactsListProps> = ({ contacts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <User className="w-6 h-6 mr-2 text-blue-600" />
        Emergency Contacts
      </h3>
      
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${contact.isAvailable ? 'bg-green-100' : 'bg-red-100'}`}>
                {contact.isAvailable ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                <p className="text-sm text-gray-600">{contact.role}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {contact.specialties.map((specialty, index) => (
                    <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};