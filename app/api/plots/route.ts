import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;

        const category = searchParams.get('category');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '12');

        const where: any = {
            status: 'active',
        };

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.totalPrice = {};
            if (minPrice) where.totalPrice.gte = parseInt(minPrice);
            if (maxPrice) where.totalPrice.lte = parseInt(maxPrice);
        }

        const [plots, total] = await Promise.all([
            prisma.plot.findMany({
                where,
                include: {
                    images: {
                        orderBy: { displayOrder: 'asc' },
                    },
                    seller: {
                        select: {
                            name: true,
                            phoneNumber: true,
                            whatsappNumber: true,
                        },
                    },
                },
                skip: (page - 1) * perPage,
                take: perPage,
                orderBy: [
                    { isFeatured: 'desc' },
                    { publishedAt: 'desc' },
                ],
            }),
            prisma.plot.count({ where }),
        ]);

        return NextResponse.json({
            plots,
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage),
        });
    } catch (error) {
        console.error('Error fetching plots:', error);
        return NextResponse.json(
            { error: 'Failed to fetch plots' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // In production, validate admin authentication here

        const plot = await prisma.plot.create({
            data: {
                ...data,
                publishedAt: data.status === 'active' ? new Date() : null,
            },
            include: {
                images: true,
                seller: {
                    select: {
                        name: true,
                        phoneNumber: true,
                        whatsappNumber: true,
                    },
                },
            },
        });

        return NextResponse.json(plot, { status: 201 });
    } catch (error) {
        console.error('Error creating plot:', error);
        return NextResponse.json(
            { error: 'Failed to create plot' },
            { status: 500 }
        );
    }
}
