'use client';

import { useState } from 'react';
import { Siren, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { EmergencyContact } from '@/lib/types';
import type { Location } from '@/hooks/use-location';

type SosCardProps = {
  contacts: EmergencyContact[];
  location: Location | null;
  locationError: string | null;
};

export function SosCard({ contacts, location, locationError }: SosCardProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSosClick = () => {
    setIsLoading(true);
    if (contacts.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Emergency Contacts',
        description: 'Please add at least one emergency contact before sending an SOS alert.',
      });
      setIsLoading(false);
      return;
    }

    if (locationError || !location) {
      toast({
        variant: 'destructive',
        title: 'Location Error',
        description: locationError || 'Could not get your location. Please ensure location services are enabled.',
      });
      setIsLoading(false);
      return;
    }

    sendSmsAlert(location);
    setIsLoading(false);
  };

  const sendSmsAlert = (currentLocation: Location) => {
    const timestamp = new Date().toLocaleString();
    const mapUrl = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
    const message = `EMERGENCY! I need help. My current location is:\n\nTimestamp: ${timestamp}\nMap: ${mapUrl}`;

    const contactNumbers = contacts.map((c) => c.phone).join(',');

    const smsUrl = `sms:${contactNumbers}?body=${encodeURIComponent(message)}`;

    // This will attempt to open the user's default SMS app.
    window.location.href = smsUrl;

    toast({
      title: 'SOS Alert Activated',
      description: 'Your messaging app has been opened to alert your emergency contacts.',
    });
  };

  return (
    <Card className="flex h-full min-h-[300px] items-center justify-center bg-card shadow-lg transition-shadow hover:shadow-xl">
      <CardContent className="flex items-center justify-center p-6">
        <button
          onClick={handleSosClick}
          disabled={isLoading}
          className="group relative flex h-48 w-48 flex-col items-center justify-center rounded-full bg-accent text-accent-foreground shadow-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-amber-400/50 active:scale-100 disabled:cursor-not-allowed disabled:bg-muted"
          aria-label="Activate SOS Alert"
        >
          {isLoading ? (
            <Loader2 className="h-16 w-16 animate-spin" />
          ) : (
            <>
              <Siren className="h-20 w-20 transition-transform duration-300 group-hover:rotate-12" />
              <span className="mt-2 text-2xl font-bold tracking-wider font-headline">SOS</span>
            </>
          )}
        </button>
      </CardContent>
    </Card>
  );
}
