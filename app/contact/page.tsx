import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-green-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl max-w-2xl">
                            Get in touch with us for any queries or assistance
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="max-w-3xl mx-auto">
                        {/* Contact Information */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
                            <p className="text-gray-600 mb-8 text-center">
                                Have questions about a plot listing? Want to list your property? Or just need some guidance?
                                We're here to help! Reach out to us through any of the following channels.
                            </p>

                            <div className="space-y-6">
                                {/* Phone */}
                                <Card className="hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Phone className="text-blue-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Phone</h3>
                                                <p className="text-gray-600 mb-2">Call us directly for immediate assistance</p>
                                                <a href="tel:+919876543210" className="text-orange-600 font-medium hover:underline">
                                                    +91 98765 43210
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* WhatsApp */}
                                <Card className="hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="text-green-600" size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold mb-1">WhatsApp</h3>
                                                <p className="text-gray-600 mb-3">Chat with us on WhatsApp</p>
                                                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                                                    <Button className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                                                        <MessageCircle size={16} />
                                                        <span>Chat on WhatsApp</span>
                                                    </Button>
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Email */}
                                <Card className="hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Mail className="text-purple-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Email</h3>
                                                <p className="text-gray-600 mb-2">Send us an email anytime</p>
                                                <a href="mailto:info@tnplots.com" className="text-orange-600 font-medium hover:underline">
                                                    info@tnplots.com
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Office */}
                                <Card className="hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MapPin className="text-orange-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Office</h3>
                                                <p className="text-gray-600 mb-2">Visit us at our office</p>
                                                <p className="text-gray-800">
                                                    Tamil Nadu, India
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Business Hours */}
                                <Card className="hover-lift">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Clock className="text-green-600" size={24} />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-1">Business Hours</h3>
                                                <div className="text-gray-600 space-y-1">
                                                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                                                    <p>Sunday: 10:00 AM - 2:00 PM</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-4xl mx-auto mt-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">How do I list my property on TNPlots?</h3>
                                    <p className="text-gray-600">
                                        Contact us through phone, WhatsApp, or email with your property details. Our team will
                                        verify the information and list it on the platform within 24-48 hours.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Are all plots verified?</h3>
                                    <p className="text-gray-600">
                                        Yes! Every plot undergoes a thorough verification process where we check documents,
                                        location, and seller credentials before listing.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Is there any brokerage or commission?</h3>
                                    <p className="text-gray-600">
                                        TNPlots is a transparent platform. All costs are clearly mentioned in the listing.
                                        Contact us for detailed information about any applicable charges.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-2">Can I visit the plot before buying?</h3>
                                    <p className="text-gray-600">
                                        Absolutely! We encourage buyers to visit the plot. You can directly contact the seller
                                        via WhatsApp or phone to schedule a visit.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
