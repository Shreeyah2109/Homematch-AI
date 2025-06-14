
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our services? Need help finding your perfect property? We're here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <PhoneCall className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-muted-foreground">Mon-Fri from 9am to 6pm</p>
              <p className="text-primary font-medium mt-2">+91 7428731249</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-muted-foreground">We'll respond within 24 hours</p>
              <p className="text-primary font-medium mt-2">support@propertymatchai.com</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mx-auto rounded-full bg-primary/10 p-4 w-16 h-16 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-muted-foreground">Our Office</p>
              <p className="text-primary font-medium mt-2">99, Workspace Avenue, Railway Lines Business District, Solapur</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>

          <div className="h-96 lg:h-auto overflow-hidden rounded-lg shadow-lg">
            <iframe
              title="PropertyMatch AI Office Location - Solapur"
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60517.745735466066!2d75.86866219692863!3d17.659918354518214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db6fc5cf445d%3A0xcfe25447e24c5584!2sSolapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716286090572!5m2!1sen!2sin"
              frameBorder="0"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-16 border-t border-border pt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">How does your AI matching work?</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your preferences, including location, budget, property type, and nearby facilities, to generate compatibility scores for available properties.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Are the properties on your platform verified?</h3>
              <p className="text-muted-foreground">
                Yes, we work directly with trusted developers, agents, and property owners to ensure all listings meet our quality standards.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Is there a fee for using your services?</h3>
              <p className="text-muted-foreground">
                Basic property searching and matching is free. Premium features like advanced filtering and priority access to new properties may require a subscription.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Do you assist with property visits?</h3>
              <p className="text-muted-foreground">
                Yes, once you've found properties that interest you, our team can arrange viewings at your convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
