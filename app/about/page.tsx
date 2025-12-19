import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Shield, MessageCircle, Users, TrendingUp, CheckCircle } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-green-50">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About TNPlots</h1>
                        <p className="text-xl max-w-2xl">
                            Your trusted marketplace for verified land plots in Cheyyar, Tamil Nadu
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-16">
                    {/* Mission Section */}
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                        <p className="text-lg text-gray-700 leading-relaxed text-center mb-4">
                            TNPlots was created to bridge the gap between land sellers and buyers in the Cheyyar region.
                            We understand that buying land is one of the most important decisions in life, and we're here
                            to make that process transparent, trustworthy, and hassle-free.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed text-center">
                            Our platform focuses exclusively on Cheyyar and surrounding areas, giving us deep local expertise
                            and enabling us to provide verified, quality listings that you can trust.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-10 text-center">Why Choose TNPlots?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Shield className="text-blue-600" size={32} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">100% Verified</h3>
                                <p className="text-gray-600">
                                    Every plot is thoroughly verified before listing. We check documents, location, and seller credentials.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                        <MapPin className="text-green-600" size={32} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                                <p className="text-gray-600">
                                    Specialized in Cheyyar region. We know every village, every survey number, every opportunity.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="flex justify-center mb-4">
                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                                        <MessageCircle className="text-purple-600" size={32} />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold mb-3">Instant Contact</h3>
                                <p className="text-gray-600">
                                    Connect directly with sellers via WhatsApp. No middlemen, no delays - just instant communication.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Our Values */}
                    <div className="max-w-6xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-orange-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Transparency</h3>
                                        <p className="text-gray-600">
                                            We believe in complete transparency. All plot details, pricing, and seller information
                                            are clearly displayed with no hidden charges.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Trust</h3>
                                        <p className="text-gray-600">
                                            Building trust is our foundation. Every listing undergoes rigorous verification to
                                            ensure you deal with genuine sellers and authentic properties.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Local Focus</h3>
                                        <p className="text-gray-600">
                                            By focusing exclusively on Cheyyar and nearby areas, we provide unmatched local knowledge
                                            and personalized service.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Technology</h3>
                                        <p className="text-gray-600">
                                            We leverage modern technology to make land buying simple and accessible, with features
                                            like instant WhatsApp contact and mobile-first design.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-4xl font-bold text-orange-600 mb-2">200+</div>
                                <div className="text-sm text-gray-600">Verified Plots</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-4xl font-bold text-green-600 mb-2">5,000+</div>
                                <div className="text-sm text-gray-600">Happy Buyers</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
                                <div className="text-sm text-gray-600">Verified</div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="text-4xl font-bold text-purple-600 mb-2">24hrs</div>
                                <div className="text-sm text-gray-600">Verification</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
