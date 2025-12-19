'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Trash2, LogOut, RefreshCw } from 'lucide-react';

interface Plot {
    id: string;
    titleEn: string;
    village: string;
    district: string;
    category: string;
    sizeSqft: number;
    totalPrice: number;
    status: string;
    verificationStatus: string;
    submittedAt: Date;
    seller: {
        name: string;
        phoneNumber: string;
    };
}

export default function AdminDashboard() {
    const [pendingPlots, setPendingPlots] = useState<Plot[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchPendingPlots = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/pending');
            if (response.ok) {
                const data = await response.json();
                setPendingPlots(data.plots || []);
            }
        } catch (error) {
            console.error('Failed to fetch pending plots:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPlots();
    }, []);

    const handleApprove = async (plotId: string) => {
        try {
            const response = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plotId }),
            });

            if (response.ok) {
                await fetchPendingPlots();
            }
        } catch (error) {
            console.error('Failed to approve plot:', error);
        }
    };

    const handleReject = async (plotId: string) => {
        const reason = prompt('Enter rejection reason (optional):');
        try {
            const response = await fetch('/api/admin/reject', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ plotId, reason }),
            });

            if (response.ok) {
                await fetchPendingPlots();
            }
        } catch (error) {
            console.error('Failed to reject plot:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                        TNPlots Admin
                    </h1>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fetchPendingPlots()}
                        >
                            <RefreshCw size={16} className="mr-2" />
                            Refresh
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        >
                            <LogOut size={16} className="mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Pending Submissions</h2>
                    <p className="text-gray-600">Review and approve new plot listings</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
                        <p className="text-gray-600">Loading submissions...</p>
                    </div>
                ) : pendingPlots.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <CheckCircle size={48} className="mx-auto mb-4 text-green-500" />
                            <p className="text-xl font-semibold mb-2">All caught up!</p>
                            <p className="text-gray-600">No pending submissions at the moment.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {pendingPlots.map((plot) => (
                            <Card key={plot.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl">{plot.titleEn}</CardTitle>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {plot.village}, {plot.district} • {plot.category}
                                            </p>
                                        </div>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                            Pending
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Size</p>
                                            <p className="font-semibold">{plot.sizeSqft} sq ft</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Price</p>
                                            <p className="font-semibold">₹{plot.totalPrice.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Seller</p>
                                            <p className="font-semibold">{plot.seller.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Contact</p>
                                            <p className="font-semibold">{plot.seller.phoneNumber}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button
                                            onClick={() => handleApprove(plot.id)}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            <CheckCircle size={16} className="mr-2" />
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => handleReject(plot.id)}
                                            variant="destructive"
                                        >
                                            <XCircle size={16} className="mr-2" />
                                            Reject
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/plots/${plot.id}`)}
                                            variant="outline"
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
