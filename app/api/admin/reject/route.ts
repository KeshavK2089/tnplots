import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { plotId, reason } = await request.json();

        if (!plotId) {
            return NextResponse.json(
                { error: 'Plot ID is required' },
                { status: 400 }
            );
        }

        const plot = await prisma.plot.update({
            where: { id: plotId },
            data: {
                status: 'rejected',
                verificationStatus: 'rejected',
                reviewedAt: new Date(),
                submissionNotes: reason || 'Submission rejected',
            },
        });

        // TODO: Send rejection email to seller

        return NextResponse.json({ success: true, plot });
    } catch (error) {
        console.error('Error rejecting plot:', error);
        return NextResponse.json(
            { error: 'Failed to reject plot' },
            { status: 500 }
        );
    }
}
