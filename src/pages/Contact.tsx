
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12 md:py-16 animate-fade-in">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions about our vegetables or delivery? Get in touch with us!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-veggie-600 mr-4 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-gray-600">+91 9879876030</p>
                        <p className="text-sm text-gray-500 mt-1">Monday to Saturday, 8am to 8pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-veggie-600 mr-4 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-gray-600">info@veggieexpress.com</p>
                        <p className="text-sm text-gray-500 mt-1">We'll respond as soon as possible</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-veggie-600 mr-4 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-gray-600">123 Market Street, City, State 123456</p>
                        <p className="text-sm text-gray-500 mt-1">Visit our store for direct pickup</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Business Hours</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-veggie-600 mr-4 mt-0.5" />
                      <div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <h3 className="font-semibold">Monday - Friday</h3>
                            <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold">Saturday</h3>
                            <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold">Sunday</h3>
                            <p className="text-gray-600">8:00 AM - 5:00 PM</p>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold">Holidays</h3>
                            <p className="text-gray-600">10:00 AM - 4:00 PM</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-500 mt-4">
                          * Delivery times may vary based on location and order volume.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
