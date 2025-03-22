'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserPlus, Users, Building, Search, Filter } from 'lucide-react';
import { useIC } from '@/hooks/useIC';

interface Connection {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  mutualConnections: number;
  isConnected: boolean;
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState('connections');
  const [searchQuery, setSearchQuery] = useState('');
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Trader',
      company: 'Goldman Sachs',
      avatar: '/avatars/avatar1.jpg',
      mutualConnections: 12,
      isConnected: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Investment Analyst',
      company: 'JP Morgan',
      avatar: '/avatars/avatar2.jpg',
      mutualConnections: 8,
      isConnected: true
    }
  ]);

  const [suggestions, setSuggestions] = useState<Connection[]>([
    {
      id: 3,
      name: 'Emma Watson',
      role: 'Crypto Trading Specialist',
      company: 'Binance',
      avatar: '/avatars/avatar3.jpg',
      mutualConnections: 15,
      isConnected: false
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Financial Advisor',
      company: 'Morgan Stanley',
      avatar: '/avatars/avatar4.jpg',
      mutualConnections: 6,
      isConnected: false
    }
  ]);

  const { loading, error } = useIC();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async (connection: Connection) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeTab === 'suggestions') {
        // Move from suggestions to connections
        setSuggestions(prev => prev.filter(c => c.id !== connection.id));
        setConnections(prev => [...prev, { ...connection, isConnected: true }]);
      }
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveConnection = async (connectionId: number) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const removedConnection = connections.find(c => c.id === connectionId);
      if (removedConnection) {
        setConnections(prev => prev.filter(c => c.id !== connectionId));
        setSuggestions(prev => [...prev, { ...removedConnection, isConnected: false }]);
      }
    } catch (error) {
      console.error('Failed to remove connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header section remains the same */}
      
      {/* Navigation Tabs section remains the same */}
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'connections'
          ? filteredConnections.map((connection) => (
              <div
                key={connection.id}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={connection.avatar}
                      alt={connection.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{connection.name}</h3>
                    <p className="text-gray-600 text-sm">{connection.role}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <Building className="h-4 w-4" />
                      {connection.company}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      {connection.mutualConnections} mutual connections
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button 
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    onClick={() => handleRemoveConnection(connection.id)}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Message
                  </button>
                </div>
              </div>
            ))
          : filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={suggestion.avatar}
                      alt={suggestion.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{suggestion.name}</h3>
                    <p className="text-gray-600 text-sm">{suggestion.role}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                      <Building className="h-4 w-4" />
                      {suggestion.company}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      {suggestion.mutualConnections} mutual connections
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => handleConnect(suggestion)}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Empty State */}
      {((activeTab === 'connections' && filteredConnections.length === 0) ||
        (activeTab === 'suggestions' && filteredSuggestions.length === 0)) && (
        <div className="text-center py-8 text-gray-500">
          No {activeTab} found{searchQuery ? ' for your search' : ''}
        </div>
      )}
    </div>
  );
}