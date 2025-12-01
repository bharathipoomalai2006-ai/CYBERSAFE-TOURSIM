'use client';

import { SosCard } from '@/components/features/sos-card';
import { LocationCard } from '@/components/features/location-card';
import { EmergencyLocatorCard } from '@/components/features/emergency-locator-card';
import { EmergencyContactsCard } from '@/components/features/emergency-contacts-card';
import { SafetyTipsCard } from '@/components/features/safety-tips-card';
import { AiChatbotCard } from '@/components/features/ai-chatbot-card';
import { useContacts } from '@/hooks/use-contacts';
import { useLocation } from '@/hooks/use-location';

export default function Home() {
  const { contacts, addContact, removeContact, loading: contactsLoading } = useContacts();
  const { location, error: locationError, loading: locationLoading, refreshLocation } = useLocation();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-2 lg:row-span-2">
          <SosCard contacts={contacts} location={location} locationError={locationError} />
        </div>

        <div className="lg:col-span-2">
          <LocationCard location={location} error={locationError} loading={locationLoading} refreshLocation={refreshLocation} />
        </div>

        <div>
          <EmergencyContactsCard contacts={contacts} addContact={addContact} removeContact={removeContact} loading={contactsLoading} />
        </div>

        <div>
          <EmergencyLocatorCard />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <AiChatbotCard />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <SafetyTipsCard />
        </div>
      </div>
    </div>
  );
}
