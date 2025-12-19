import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Find or create seller
        let seller = await prisma.seller.findFirst({
            where: { phoneNumber: data.phoneNumber },
        });

        if (!seller) {
            seller = await prisma.seller.create({
                data: {
                    name: data.sellerName,
                    phoneNumber: data.phoneNumber,
                    whatsappNumber: data.whatsappNumber || data.phoneNumber,
                    email: data.email,
                },
            });
        }

        // Create plot with pending status
        const plot = await prisma.plot.create({
            data: {
                titleEn: data.title,
                village: data.village,
                district: data.district,
                taluk: data.taluk || '',
                state: 'Tamil Nadu',
                surveyNumber: data.surveyNumber,
                category: data.category,
                sizeSqft: data.sizeSqft,
                sizeCents: data.sizeCents,
                totalPrice: data.totalPrice,
                pricePerSqft: data.pricePerSqft,
                latitude: data.latitude,
                longitude: data.longitude,
                distanceFromMainRoad: data.distanceFromMainRoad,
                roadWidth: data.roadWidth,
                features: data.features,
                status: 'pending', // Will require admin approval
                verificationStatus: 'pending',
                sellerId: seller.id,
                submittedAt: new Date(),
            },
        });

        // Create plot images
        if (data.imageUrls && data.imageUrls.length > 0) {
            await Promise.all(
                data.imageUrls.map((url: string, index: number) =>
                    prisma.plotImage.create({
                        data: {
                            plotId: plot.id,
                            url: url,
                            publicId: `tnplots/${plot.id}_${index}`,
                            displayOrder: index,
                            isFeatured: index === 0,
                        },
                    })
                )
            );
        }

        // TODO: Send confirmation email to seller
        // TODO: Send notification email to admin

        return NextResponse.json({
            success: true,
            plotId: plot.id,
        });
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit listing' },
            { status: 500 }
        );
    }
}
