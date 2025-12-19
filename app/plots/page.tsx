import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlotCard } from '@/components/plot/PlotCard';
import { Filters } from '@/components/plot/Filters';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';

interface SearchParams {
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    minSize?: string;
    maxSize?: string;
    village?: string;
    search?: string;
    page?: string;
}

async function getPlots(searchParams: SearchParams) {
    const page = parseInt(searchParams.page || '1');
    const perPage = 12;
    const skip = (page - 1) * perPage;

    const where: any = {
        status: 'active',
        verificationStatus: 'approved',
    };

    if (searchParams.category) {
        where.category = searchParams.category;
    }

    if (searchParams.minPrice || searchParams.maxPrice) {
        where.totalPrice = {};
        if (searchParams.minPrice) {
            where.totalPrice.gte = parseInt(searchParams.minPrice);
        }
        if (searchParams.maxPrice) {
            where.totalPrice.lte = parseInt(searchParams.maxPrice);
        }
    }

    if (searchParams.minSize || searchParams.maxSize) {
        where.sizeSqft = {};
        if (searchParams.minSize) {
            where.sizeSqft.gte = parseInt(searchParams.minSize);
        }
        if (searchParams.maxSize) {
            where.sizeSqft.lte = parseInt(searchParams.maxSize);
        }
    }

    if (searchParams.village) {
        where.village = {
            contains: searchParams.village,
            mode: 'insensitive',
        };
    }

    // Search functionality
    if (searchParams.search) {
        where.OR = [
            {
                titleEn: {
                    contains: searchParams.search,
                    mode: 'insensitive',
                },
            },
            {
                village: {
                    contains: searchParams.search,
                    mode: 'insensitive',
                },
            },
            {
                surveyNumber: {
                    contains: searchParams.search,
                    mode: 'insensitive',
                },
            },
        ];
    }

    try {
        const [plots, total] = await Promise.all([
            prisma.plot.findMany({
                where,
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
                skip,
                take: perPage,
                orderBy: [
                    { isFeatured: 'desc' },
                    { publishedAt: 'desc' },
                ],
            }),
            prisma.plot.count({ where }),
        ]);

        return { plots, total, page, perPage };
    } catch (error) {
        console.error('Error fetching plots:', error);
        return { plots: [], total: 0, page: 1, perPage };
    }
}

function PlotsSkeleton() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden animate-shimmer">
                    <div className="aspect-plot-card bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

async function PlotsGrid({ searchParams }: { searchParams: SearchParams }) {
    const { plots, total } = await getPlots(searchParams);

    if (plots.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4">🏘️</div>
                <h3 className="text-2xl font-semibold mb-2">No plots found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                    Showing {plots.length} of {total} plots
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {plots.map((plot) => (
                    <PlotCard key={plot.id} plot={plot} />
                ))}
            </div>
        </>
    );
}

export default async function PlotsPage({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const params = await searchParams;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gray-50">
                {/* Page Header */}
                <div className="bg-white border-b">
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-2">Browse Land Plots</h1>
                        <p className="text-gray-600">Verified plots for sale across Tamil Nadu</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="lg:col-span-1">
                            <Filters />
                        </aside>

                        {/* Plots Grid */}
                        <div className="lg:col-span-3">
                            <Suspense fallback={<PlotsSkeleton />}>
                                <PlotsGrid searchParams={params} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
