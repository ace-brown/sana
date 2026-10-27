"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full"> */}
        {/* Contact Form */}
        {/* <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-left text-2xl font-bold">
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-left">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-left">
                Your Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="block text-left">
                Your Message
              </Label>
              <Textarea
                id="message"
                placeholder="How can we help you?"
                rows={5}
              />
            </div>
            <Button className="w-full" variant="default">
              Send Message
            </Button>
          </CardContent>
        </Card> */}

        {/* Contact Person Info */}
        <Card className="shadow-lg flex flex-col justify-center p-12">
          <CardContent>
            <h2 className="text-left text-xl font-semibold mb-4">
              Contact Information
            </h2>
            <p className="text-left text-gray-700 mb-4">
              Get in touch with us for any questions or support.
            </p>
            <div className="space-y-2">
              <div className="text-left">
                <span className="font-bold">Email:</span> kazem_abdi@yahoo.com
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
