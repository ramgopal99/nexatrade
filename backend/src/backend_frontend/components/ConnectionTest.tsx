'use client';

import { useState, useEffect } from 'react';
import { createActor } from '@/utils/ic-agent';

export default function ConnectionTest() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const testConnection = async () => {
      try {
        const actor = await createActor();
        const response = await actor.greet('Test');
        setMessage(String(response));
        setStatus('connected');
      } catch (error) {
        console.error('Connection error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    if (typeof window !== 'undefined') {
      testConnection();
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border max-w-md mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-2">IC Backend Connection Status</h2>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            status === 'checking' ? 'bg-yellow-500' :
            status === 'connected' ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="capitalize">{status}</span>
      </div>
      {message && (
        <div className="mt-2 text-sm">
          {status === 'connected' ? (
            <span className="text-green-600">Response: {message}</span>
          ) : (
            <span className="text-red-600">{message}</span>
          )}
        </div>
      )}
    </div>
  );
}