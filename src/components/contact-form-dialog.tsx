
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactFormDialog({ open, onOpenChange }: ContactFormDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    message: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.email || !formData.reason || !formData.message) {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            reason: formData.reason,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. We'll get back to you soon.",
      });

      // Reset form and close
      setFormData({ name: '', email: '', reason: '', message: '' });
      onOpenChange(false);

    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-none border-none">
        <CardHeader className="text-center">
          <DialogTitle className="text-2xl mb-0.5">Send us a message</DialogTitle>
          <DialogDescription className="mt-0.5">We would love to hear from you!</DialogDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Contact <span className="text-red-500">*</span></Label>
            <Select
              required
              value={formData.reason}
              onValueChange={(val) => handleChange('reason', val)}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Query</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="partnership">Partnership</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              required
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              className="min-h-[80px] h-[80px] max-h-[80px] resize-none overflow-y-auto"
              maxLength={250}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {formData.message.length}/250 characters
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );

  return (
    <>
      {/* Desktop: Dialog */}
      <div className="hidden sm:block">
        <Dialog open={open && !isMobile} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[450px] p-5 border-none">
            {formContent}
          </DialogContent>
        </Dialog>
      </div>
      {/* Mobile: Bottom Sheet */}
      <div className="sm:hidden">
        <Dialog open={open && !!isMobile} onOpenChange={onOpenChange}>
          <DialogContent className="w-[95%] max-w-[450px] p-5 border-none rounded-lg">
            {formContent}
          </DialogContent>
        </Dialog>
      </div>
      <div className="sm:hidden hidden">
        {/* Disabled Sheet as requested */}
        <Sheet open={false && open && !!isMobile} onOpenChange={onOpenChange}>
          <SheetContent side="bottom" enableDrag className="p-0 border-t-0 rounded-t-[10px] overflow-y-auto scrollbar-hide">
            {formContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
