import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const plots = await prisma.plot.findMany({
            where: {
                status: 'pending',
                verificationStatus: 'pending',
            },
            include: {
                seller: {
                    select: {
                        name: true,
                        phoneNumber: true,
                    },
                },
            },
            orderBy: {
                submittedAt: 'desc',
            },
        });

        return NextResponse.json({ plots });
    } catch (error) {
        console.error('Error fetching pending plots:', error);
        return NextResponse.json(
            { error: 'Failed to fetch pending plots' },
            { status: 500 }
        );
    }
}
