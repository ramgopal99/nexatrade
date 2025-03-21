'use client';

import { useState, useEffect } from 'react';
import { createActor } from '@/utils/ic-agent';
import { HttpAgent } from '@dfinity/agent';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, User } from "lucide-react";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const actor = await createActor();
        const agent = new HttpAgent();
        const identity = await agent.getPrincipal();
        const user = await actor.get_user(identity);
        setUserInfo(user[0] || null);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch user info');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <div className="p-4 bg-destructive/10 border-l-4 border-destructive text-destructive rounded">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && (
          userInfo ? (
            <div className="space-y-4">
              <div className="grid grid-cols-[120px,1fr] items-center gap-4 rounded-lg border p-4">
                <span className="font-medium">Username</span>
                <span>{userInfo.username}</span>
              </div>
              <div className="grid grid-cols-[120px,1fr] items-center gap-4 rounded-lg border p-4">
                <span className="font-medium">Email</span>
                <span>{userInfo.email}</span>
              </div>
              <div className="grid grid-cols-[120px,1fr] items-center gap-4 rounded-lg border p-4">
                <span className="font-medium">Principal ID</span>
                <span className="text-sm break-all">{userInfo.id.toString()}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <User className="mx-auto h-12 w-12 mb-4" />
              <p>No user information found</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
}