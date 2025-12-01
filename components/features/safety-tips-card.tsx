import { LifeBuoy, ShieldCheck, Car, WifiOff, HeartPulse, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const safetyTips = [
  {
    title: "Road Safety",
    icon: Car,
    content: "Always wear a helmet on two-wheelers. Use seatbelts in cars. Be cautious of traffic, as road conditions and driving habits may differ. Use official ride-hailing apps or pre-paid taxis.",
  },
  {
    title: "Cyber Safety",
    icon: WifiOff,
    content: "Avoid using public Wi-Fi for sensitive transactions. Be wary of phishing scams. Keep your devices secure and your software updated.",
  },
  {
    title: "First Aid",
    icon: HeartPulse,
    content: "Carry a basic first aid kit with essentials like bandages, antiseptic wipes, and pain relievers. Know the location of the nearest hospital or clinic.",
  },
  {
    title: "Lost & Found",
    icon: ShieldCheck,
    content: "Keep digital copies of your important documents (passport, visa, ID). If you lose something, report it to the nearest police station immediately.",
  },
  {
    title: "Emergency Numbers",
    icon: Phone,
    content: "Police: 100. Ambulance: 108. Fire: 101. National Emergency Helpline: 112. Save these numbers in your phone.",
  },
];

export function SafetyTipsCard() {
  return (
    <Card className="shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <LifeBuoy className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Safety Tips & Guidance</CardTitle>
            <CardDescription>Stay safe while you explore.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {safetyTips.map((tip, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <div className="flex items-center gap-3">
                  <tip.icon className="h-5 w-5 text-primary/80" />
                  <span className="font-semibold">{tip.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{tip.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
