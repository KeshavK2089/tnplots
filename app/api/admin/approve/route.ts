import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { plotId } = await request.json();

        if (!plotId) {
            return NextResponse.json(
                { error: 'Plot ID is required' },
                { status: 400 }
            );
        }

        const plot = await prisma.plot.update({
            where: { id: plotId },
            data: {
                status: 'active',
                verificationStatus: 'approved',
            },
        });

        // TODO: Send approval email to seller

        return NextResponse.json({ success: true, plot });
    } catch (error) {
        console.error('Error approving plot:', error);
        return NextResponse.json(
            { error: 'Failed to approve plot' },
            { status: 500 }
        );
    }
}
