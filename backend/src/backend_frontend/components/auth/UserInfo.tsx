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
        const response = await actor.get_user(identity.toString()); // Convert Principal to string
        const user = Array.isArray(response) ? response[0] : null;
        setUserInfo(user);
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-background/90 p-4">
      <Card className="w-full max-w-2xl backdrop-blur-sm bg-background/95 shadow-2xl hover:shadow-3xl transition-all duration-300 border border-primary/10">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-8">
          <CardTitle className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <div className="p-6 bg-destructive/10 border-l-4 border-destructive text-destructive rounded-lg shadow-sm backdrop-blur-sm">
              <p className="font-medium text-lg">Error</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          )}
          {!loading && !error && (
            userInfo ? (
              <div className="space-y-6">
                <div className="grid grid-cols-[140px,1fr] items-center gap-6 rounded-xl border border-primary/10 p-6 hover:bg-primary/5 transition-colors duration-200 shadow-sm">
                  <span className="font-medium text-primary/90 text-lg">Username</span>
                  <span className="font-medium text-lg">{userInfo.username}</span>
                </div>
                <div className="grid grid-cols-[140px,1fr] items-center gap-6 rounded-xl border border-primary/10 p-6 hover:bg-primary/5 transition-colors duration-200 shadow-sm">
                  <span className="font-medium text-primary/90 text-lg">Email</span>
                  <span className="font-medium text-lg">{userInfo.email}</span>
                </div>
                <div className="grid grid-cols-[140px,1fr] items-center gap-6 rounded-xl border border-primary/10 p-6 hover:bg-primary/5 transition-colors duration-200 shadow-sm">
                  <span className="font-medium text-primary/90 text-lg">Principal ID</span>
                  <span className="text-sm break-all font-medium">{userInfo.id.toString()}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-primary/5 rounded-xl border border-primary/10">
                <User className="mx-auto h-20 w-20 mb-6 opacity-70 text-primary/70" />
                <p className="font-medium text-xl text-primary/90">No user information found</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}