'use client';

import { MapPin, Loader2, RefreshCw, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Location } from '@/hooks/use-location';
import { Skeleton } from '@/components/ui/skeleton';

type LocationCardProps = {
    location: Location | null;
    error: string | null;
    loading: boolean;
    refreshLocation: () => void;
};


export function LocationCard({ location, error, loading, refreshLocation }: LocationCardProps) {
  const handleViewOnMap = () => {
    if (location) {
      window.open(`https://www.google.com/maps?q=${location.latitude},${location.longitude}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Your Location</CardTitle>
            <CardDescription>Your current geographical coordinates.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-3/4" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive-foreground">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        ) : (
          location && (
            <div className="font-mono text-sm">
              <p>
                <span className="font-semibold text-muted-foreground">Lat:</span> {location.latitude.toFixed(6)}
              </p>
              <p>
                <span className="font-semibold text-muted-foreground">Lon:</span> {location.longitude.toFixed(6)}
              </p>
            </div>
          )
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={refreshLocation} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span className="ml-2">Refresh</span>
        </Button>
        <Button onClick={handleViewOnMap} disabled={!location || loading} size="sm">
          View on Map
        </Button>
      </CardFooter>
    </Card>
  );
}
