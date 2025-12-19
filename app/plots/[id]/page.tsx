import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Maximize2, MessageCircle, Phone, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ImageGallery } from '@/components/plot/ImageGallery';
import { PlotMapWrapper } from '@/components/plot/PlotMapWrapper';
import { prisma } from '@/lib/prisma';
import { formatPrice, formatArea, getRelativeTime } from '@/lib/utils';
import { generateWhatsAppURL, formatPhoneNumber } from '@/lib/whatsapp';

async function getPlot(id: string) {
    try {
        const plot = await prisma.plot.findUnique({
            where: { id },
            include: {
                images: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                },
                seller: {
                    select: {
                        name: true,
                        phoneNumber: true,
                        whatsappNumber: true,
                    },
                },
            },
        });

        if (!plot || plot.status !== 'active') {
            return null;
        }

        // Increment view count
        await prisma.plot.update({
            where: { id },
            data: {
                viewCount: {
                    increment: 1,
                },
            },
        });

        return plot;
    } catch (error) {
        console.error('Error fetching plot:', error);
        return null;
    }
}

export default async function PlotDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const plot = await getPlot(id);

    if (!plot) {
        notFound();
    }

    const whatsappUrl = generateWhatsAppURL({
        phone: plot.seller.whatsappNumber || plot.seller.phoneNumber,
        plotId: plot.id,
        plotTitle: plot.titleEn,
        price: plot.totalPrice,
        location: plot.village,
    });

    const amenities = (plot.amenities as string[]) || [];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Back Button */}
                    <Link href="/plots" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
                        <ArrowLeft size={16} />
                        <span>Back to all plots</span>
                    </Link>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Image Gallery */}
                            <ImageGallery images={plot.images} title={plot.titleEn} />

                            {/* Plot Details */}
                            <Card>
                                <CardContent className="p-6 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            {plot.isFeatured && (
                                                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">
                                                    ⭐ Featured
                                                </span>
                                            )}
                                            {plot.verificationStatus === 'approved' && (
                                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                                                    <CheckCircle size={12} />
                                                    Verified
                                                </span>
                                            )}
                                            <span className="inline-flex bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium capitalize">
                                                {plot.category}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-bold mb-2">{plot.titleEn}</h1>
                                        {plot.titleTa && (
                                            <h2 className="text-xl text-gray-600 tamil-text">{plot.titleTa}</h2>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-2 text-gray-600">
                                        <MapPin size={20} className="mt-1 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium">{plot.village}</p>
                                            <p className="text-sm">{plot.taluk}, {plot.district}, {plot.state}</p>
                                            {plot.surveyNumber && (
                                                <p className="text-sm">Survey No: {plot.surveyNumber}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="border-t pt-6">
                                        <h3 className="font-semibold text-lg mb-3">Description</h3>
                                        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                                            {plot.descriptionEn || 'No description available'}
                                        </p>
                                        {plot.descriptionTa && (
                                            <p className="text-gray-600 whitespace-pre-line leading-relaxed mt-4 tamil-text">
                                                {plot.descriptionTa}
                                            </p>
                                        )}
                                    </div>

                                    {/* Amenities */}
                                    {amenities.length > 0 && (
                                        <div className="border-t pt-6">
                                            <h3 className="font-semibold text-lg mb-3">Amenities</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {amenities.map((amenity, index) => (
                                                    <div key={index} className="flex items-center gap-2">
                                                        <CheckCircle size={16} className="text-green-600" />
                                                        <span className="text-sm capitalize">{amenity.replace('_', ' ')}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Meta Info */}
                                    <div className="border-t pt-6 text-sm text-muted-foreground">
                                        <p>Posted {getRelativeTime(plot.createdAt)}</p>
                                        <p>{plot.viewCount} views</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Section */}
                            {plot.latitude && plot.longitude && (
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold text-lg mb-4">Location on Map</h3>
                                        <PlotMapWrapper
                                            latitude={plot.latitude}
                                            longitude={plot.longitude}
                                            title={plot.titleEn}
                                            village={plot.village}
                                            className="h-[400px]"
                                        />
                                        <p className="text-sm text-gray-500 mt-3">
                                            {plot.distanceFromMainRoad && (
                                                <>Distance from main road: {plot.distanceFromMainRoad} km</>
                                            )}
                                            {plot.roadWidth && plot.distanceFromMainRoad && ' • '}
                                            {plot.roadWidth && (
                                                <>Road width: {plot.roadWidth} ft</>
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-20 space-y-6">
                                {/* Price Card */}
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="text-3xl font-bold text-primary mb-2">
                                            {formatPrice(plot.totalPrice)}
                                        </div>
                                        <div className="text-sm text-muted-foreground mb-4">
                                            ₹{Math.round(plot.totalPrice / plot.sizeSqft)}/sq ft
                                            {plot.isNegotiable && (
                                                <span className="ml-2 text-green-600 font-medium">• Negotiable</span>
                                            )}
                                        </div>

                                        {/* Plot Details */}
                                        <div className="space-y-3 mb-6 pb-6 border-b">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Plot Size</span>
                                                <span className="font-medium">{formatArea(plot.sizeSqft, plot.sizeCents)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Category</span>
                                                <span className="font-medium capitalize">{plot.category}</span>
                                            </div>
                                        </div>

                                        {/* Contact Buttons */}
                                        <div className="space-y-3">
                                            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                                                <Button variant="whatsapp" className="w-full" size="lg">
                                                    <MessageCircle size={20} />
                                                    <span>Contact on WhatsApp</span>
                                                </Button>
                                            </a>
                                            <a href={`tel:${plot.seller.phoneNumber}`} className="block">
                                                <Button variant="outline" className="w-full" size="lg">
                                                    <Phone size={20} />
                                                    <span>Call Seller</span>
                                                </Button>
                                            </a>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Seller Info */}
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Seller Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm text-gray-600">Name</p>
                                                <p className="font-medium">{plot.seller.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Contact</p>
                                                <p className="font-medium">{formatPhoneNumber(plot.seller.phoneNumber)}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Share Button */}
                                <Button variant="outline" className="w-full">
                                    <Share2 size={20} />
                                    <span>Share this plot</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
