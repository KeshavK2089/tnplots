'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Maximize2, MessageCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatPrice, formatArea } from '@/lib/utils';
import { generateWhatsAppURL } from '@/lib/whatsapp';

interface PlotCardProps {
    plot: {
        id: string;
        titleEn: string;
        titleTa?: string | null;
        village: string;
        category: string;
        sizeSqft: number;
        sizeCents?: number | null;
        totalPrice: number;
        isFeatured: boolean;
        images: {
            cloudinaryUrl: string;
            isFeatured: boolean;
        }[];
        seller: {
            whatsappNumber: string | null;
            phoneNumber: string;
        };
    };
    language?: 'en' | 'ta';
}

export function PlotCard({ plot, language = 'en' }: PlotCardProps) {
    const featuredImage = plot.images.find(img => img.isFeatured) || plot.images[0];
    const imageUrl = featuredImage?.cloudinaryUrl || '/placeholder-plot.jpg';

    const whatsappUrl = generateWhatsAppURL({
        phone: plot.seller.whatsappNumber || plot.seller.phoneNumber,
        plotId: plot.id,
        plotTitle: plot.titleEn,
        price: plot.totalPrice,
        location: plot.village,
        language,
    });

    return (
        <Card className="group overflow-hidden border-0 shadow-premium hover-lift rounded-xl">
            {/* Image */}
            <Link href={`/plots/${plot.id}`} className="block relative aspect-plot-card overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={plot.titleEn}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {plot.isFeatured && (
                    <div className="absolute top-3 left-3 z-10">
                        <div className="flex items-center gap-1 gradient-orange-green text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                            <Star size={12} fill="currentColor" />
                            <span>Featured</span>
                        </div>
                    </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 right-3 z-10">
                    <div className="glass text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium capitalize shadow-sm">
                        {plot.category}
                    </div>
                </div>
            </Link>

            <CardContent className="p-5 space-y-3">
                {/* Title */}
                <Link href={`/plots/${plot.id}`}>
                    <h3 className="font-bold text-lg line-clamp-1 hover:text-orange-600 transition-colors">
                        {plot.titleEn}
                    </h3>
                </Link>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin size={14} className="text-orange-500" />
                    <span>{plot.village}</span>
                </div>

                {/* Details */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                        <Maximize2 size={14} className="text-green-600" />
                        <span className="font-semibold">{formatArea(plot.sizeSqft, plot.sizeCents)}</span>
                    </div>
                </div>

                {/* Price */}
                <div className="pt-3 border-t border-gray-100">
                    <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                        {formatPrice(plot.totalPrice)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                        {plot.totalPrice && plot.sizeSqft && (
                            <span>₹{Math.round(plot.totalPrice / plot.sizeSqft).toLocaleString()}/sq ft</span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                    <Link href={`/plots/${plot.id}`} className="flex-1">
                        <Button variant="outline" className="w-full border-orange-200 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 transition-all" size="sm">
                            View Details
                        </Button>
                    </Link>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all" size="sm">
                            <MessageCircle size={16} />
                            <span>WhatsApp</span>
                        </Button>
                    </a>
                </div>
            </CardContent>
        </Card>
    );
}
