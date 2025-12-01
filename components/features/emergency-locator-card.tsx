'use client';

import { Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function EmergencyLocatorCard() {
  const findNearbyPolice = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=police+station+near+me', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Building2 className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Emergency Locator</CardTitle>
            <CardDescription>Find help nearby.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button onClick={findNearbyPolice} className="w-full">
          Find Nearby Police Stations
        </Button>
      </CardContent>
    </Card>
  );
}
