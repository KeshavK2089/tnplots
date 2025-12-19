import Link from 'next/link';
import { Search, MapPin, Shield, MessageCircle, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlotCard } from '@/components/plot/PlotCard';
import { prisma } from '@/lib/prisma';

async function getFeaturedPlots() {
    try {
        const plots = await prisma.plot.findMany({
            where: {
                status: 'active',
                isFeatured: true,
            },
            include: {
                images: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                },
                seller: {
                    select: {
                        phoneNumber: true,
                        whatsappNumber: true,
                    },
                },
            },
            take: 6,
            orderBy: {
                publishedAt: 'desc',
            },
        });
        return plots;
    } catch (error) {
        console.error('Error fetching featured plots:', error);
        return [];
    }
}

export default async function HomePage() {
    const featuredPlots = await getFeaturedPlots();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Hero Section */}
            <section className="relative gradient-orange-green-light py-16 md:py-24 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/80 via-white/90 to-green-100/80" />

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent drop-shadow-sm">
                            Find Your Perfect Plot in Tamil Nadu
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 font-medium">
                            Verified land plots for sale across Tamil Nadu. Trusted marketplace with instant WhatsApp contact.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mt-8">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <Input
                                    type="text"
                                    placeholder="Search by location, survey number..."
                                    className="pl-10 h-12 text-base"
                                />
                            </div>
                            <Link href="/plots">
                                <Button size="lg" className="w-full sm:w-auto h-12 px-8">
                                    Search Plots
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Why Choose TNPlots?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Shield className="text-blue-600" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold">100% Verified Listings</h3>
                            <p className="text-gray-600">
                                Every plot is thoroughly verified before listing. We check documents, location, and seller credentials.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <MessageCircle className="text-green-600" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold">Instant WhatsApp Contact</h3>
                            <p className="text-gray-600">
                                Connect directly with sellers via WhatsApp. No middlemen, no delays - just instant communication.
                            </p>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="flex justify-center">
                                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                                    <MapPin className="text-orange-600" size={32} />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold">Regional Expertise</h3>
                            <p className="text-gray-600">
                                Deep knowledge of Tamil Nadu's land market. We understand local regulations, pricing, and opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Plots */}
            {featuredPlots.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold">Featured Plots</h2>
                            <Link href="/plots">
                                <Button variant="outline">View All</Button>
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredPlots.map((plot) => (
                                <PlotCard key={plot.id} plot={plot} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Link href="/plots?category=residential" className="group">
                            <div className="border rounded-lg p-8 text-center hover:shadow-lg transition-all hover:border-orange-500">
                                <div className="text-4xl mb-4">🏘️</div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600">Residential Plots</h3>
                                <p className="text-gray-600">Build your dream home on verified residential land</p>
                            </div>
                        </Link>

                        <Link href="/plots?category=agricultural" className="group">
                            <div className="border rounded-lg p-8 text-center hover:shadow-lg transition-all hover:border-green-500">
                                <div className="text-4xl mb-4">🌾</div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-green-600">Agricultural Land</h3>
                                <p className="text-gray-600">Fertile agricultural plots for farming and investment</p>
                            </div>
                        </Link>

                        <Link href="/plots?category=commercial" className="group">
                            <div className="border rounded-lg p-8 text-center hover:shadow-lg transition-all hover:border-blue-500">
                                <div className="text-4xl mb-4">🏢</div>
                                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600">Commercial Plots</h3>
                                <p className="text-gray-600">Prime commercial land for business ventures</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 gradient-orange-green text-white">
                <div className="container mx-auto px-4 text-center space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Perfect Plot?</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                        Browse our verified listings and connect with sellers instantly via WhatsApp
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/plots">
                            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                                Browse All Plots
                            </Button>
                        </Link>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-green-600 hover:bg-gray-100 border-white">
                                <MessageCircle size={20} />
                                <span>Contact on WhatsApp</span>
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
