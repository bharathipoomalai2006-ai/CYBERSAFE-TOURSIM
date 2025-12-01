'use client';

import { UserPlus, Trash2, Users, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { EmergencyContact } from '@/lib/types';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

type EmergencyContactsCardProps = {
  contacts: EmergencyContact[];
  addContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  removeContact: (id: string) => void;
  loading: boolean;
};

export function EmergencyContactsCard({ contacts, addContact, removeContact, loading }: EmergencyContactsCardProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', phone: '' },
  });

  function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      addContact(values);
      toast({ title: 'Contact Added', description: `${values.name} has been added to your emergency contacts.` });
      form.reset();
      setOpen(false);
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
    }
  }

  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Emergency Contacts</CardTitle>
            <CardDescription>People to alert in case of an emergency.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="min-h-[100px]">
        {loading ? (
          <div className='space-y-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
          </div>
        ) : contacts.length > 0 ? (
          <ul className="space-y-2">
            {contacts.map((contact) => (
              <li key={contact.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-2 text-sm">
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <p className="text-muted-foreground">{contact.phone}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeContact(contact.id)} aria-label={`Remove ${contact.name}`}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">No contacts added yet.</p>
        )}
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={contacts.length >= 3}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>Enter the name and phone number of the person to contact. You can add up to 3.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="e.g., +919876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Contact
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
