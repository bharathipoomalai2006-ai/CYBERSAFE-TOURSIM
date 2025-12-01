'use client';

import { useState, useEffect } from 'react';
import type { EmergencyContact } from '@/lib/types';

const CONTACTS_STORAGE_KEY = 'tn-tourist-shield-contacts';

export function useContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
      }
    } catch (error) {
      console.error('Failed to load contacts from localStorage', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveContacts = (updatedContacts: EmergencyContact[]) => {
    try {
      setContacts(updatedContacts);
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(updatedContacts));
    } catch (error) {
      console.error('Failed to save contacts to localStorage', error);
    }
  };

  const addContact = (contact: Omit<EmergencyContact, 'id'>) => {
    if (contacts.length >= 3) {
      throw new Error("You can only add up to 3 emergency contacts.");
    }
    const newContact = { ...contact, id: crypto.randomUUID() };
    const updatedContacts = [...contacts, newContact];
    saveContacts(updatedContacts);
  };

  const removeContact = (id: string) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    saveContacts(updatedContacts);
  };

  return { contacts, addContact, removeContact, loading };
}
