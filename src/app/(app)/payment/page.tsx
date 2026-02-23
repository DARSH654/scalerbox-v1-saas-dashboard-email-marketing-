'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import Image from 'next/image';

export default function PaymentPage() {
  // In a real app, the amount would come from props or state based on user selection
  const amount = 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would trigger the Razorpay checkout process
    alert("Submitting to payment gateway...");
  }

  return (
    <div className="flex-1 w-full min-h-screen">
      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Left Panel (Dark) - Hidden on mobile */}
        <div className="hidden md:flex flex-col justify-center items-start bg-gray-900 text-white p-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Secure Checkout</h1>
            <p className="text-gray-300 text-lg max-w-md">
              Complete your purchase quickly and securely. We partner with industry-leading payment processors to ensure your information is safe.
            </p>
          </div>
          <div className="mt-auto pt-8">
            <Image
              src="https://qsehqxombjgqhabdcxpt.supabase.co/storage/v1/object/public/firebase-images/llm_icons_image_for_magai_2.0/ChatGPT_Image_Jan_12__2026__04_01_42_PM-removebg-preview.png"
              alt="Scalerbox Logo"
              width={60}
              height={60}
            />
          </div>
        </div>

        {/* Right Panel (White) / Main Content on Mobile */}
        <div className="flex items-center justify-center bg-white dark:bg-black p-4 sm:p-8">
          <Card className="w-full max-w-md shadow-lg border-none md:border md:shadow-xl">
            <CardHeader className="text-center">
              <div className="md:hidden mb-4">
                <h1 className="text-2xl font-bold tracking-tight">Secure Checkout</h1>
                <p className="text-muted-foreground text-sm">
                  Complete your purchase quickly and securely.
                </p>
              </div>
              <CardTitle className="text-xl">Payment Details</CardTitle>
              <CardDescription>You are about to purchase the Pro Plan.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" required className="pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM / YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input id="cvc" placeholder="•••" required className="pl-10" />
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full text-lg py-6" size="lg">
                  Pay ${amount}
                </Button>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4" />
                <span>Payments are secure and encrypted.</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
