'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Loader2, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { runAiSafetyChatbot } from '@/app/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export function AiChatbotCard() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "Hello! I'm your AI safety assistant. How can I help you travel safely in Tamil Nadu?" },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await runAiSafetyChatbot({ query: input });

    if (result.error) {
      const errorMessage = typeof result.error === 'string' ? result.error : 'An unknown error occurred.';
      const botMessage: Message = { role: 'bot', content: `Sorry, something went wrong. ${errorMessage}` };
      setMessages((prev) => [...prev, botMessage]);
      toast({ variant: 'destructive', title: 'AI Error', description: errorMessage });
    } else if (result.answer) {
      const botMessage: Message = { role: 'bot', content: result.answer };
      setMessages((prev) => [...prev, botMessage]);
    }
    
    setIsLoading(false);
  };

  return (
    <Card className="flex h-full flex-col shadow-lg transition-shadow hover:shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>AI Safety Chatbot</CardTitle>
            <CardDescription>Get instant answers to your safety questions.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[300px] pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-3', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'bot' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                )}
                <div className={cn('max-w-[80%] rounded-xl px-4 py-2 text-sm', message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="bg-muted px-4 py-2 rounded-xl flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-start gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask 'Where is the nearest hospital?'"
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
