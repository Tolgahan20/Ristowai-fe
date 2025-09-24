"use client";

import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';
import { Heading, Body } from './typography';

export function SessionExpiredNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleSessionExpired = (event: CustomEvent) => {
      setMessage(event.detail.message);
      setIsVisible(true);
    };

    // Listen for session expired events
    window.addEventListener('session-expired', handleSessionExpired as EventListener);

    return () => {
      window.removeEventListener('session-expired', handleSessionExpired as EventListener);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          
          <Heading level={3} className="mb-2">Session Expired</Heading>
          <Body className="text-gray-600 mb-6">
            {message || 'Your session has expired. Please log in again.'}
          </Body>
          
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={handleDismiss}
            >
              Dismiss
            </Button>
            <Button
              onClick={handleRefresh}
              leftIcon={<RefreshCw size={16} />}
            >
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
