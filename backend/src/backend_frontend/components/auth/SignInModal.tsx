'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Chrome, Infinity, Mail, LogIn, ArrowLeft, Loader2 } from 'lucide-react';
import { authenticateWithII } from '@/utils/auth';
import UserForm from './UserForm';

export default function SignInModal() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleIILogin = async () => {
    try {
      setIsLoading(true);
      const authClient = await authenticateWithII();
      if (await authClient.isAuthenticated()) {
        console.log("User authenticated successfully with Internet Identity");
        const identity = authClient.getIdentity();
        console.log("Principal ID:", identity.getPrincipal().toText());
        router.push('/dashboard');  // This line handles the redirect
      }
    } catch (error) {
      console.error("II Authentication failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {showEmailForm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-4"
              onClick={() => setShowEmailForm(false)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <DialogTitle className="text-2xl text-center">
            {showEmailForm ? 'Sign In with Email' : 'Choose Sign In Method'}
          </DialogTitle>
        </DialogHeader>
        {showEmailForm ? (
          <UserForm />
        ) : (
          <div className="flex flex-col gap-4 py-4">
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg"
              onClick={handleIILogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Infinity className="mr-2 h-5 w-5" />
              )}
              Continue with Internet Identity
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg"
              onClick={() => setShowEmailForm(true)}
            >
              <Mail className="mr-2 h-5 w-5" />
              Continue with Email
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}