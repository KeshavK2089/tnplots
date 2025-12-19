import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50 p-4">
            <div className="text-center space-y-6">
                <div className="text-9xl font-bold text-orange-600">404</div>
                <h1 className="text-4xl font-bold text-gray-900">Plot Not Found</h1>
                <p className="text-xl text-gray-600 max-w-md mx-auto">
                    Sorry, we couldn't find the plot you're looking for. It may have been sold or removed.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/">
                        <Button size="lg">
                            <Home size={20} />
                            <span>Go Home</span>
                        </Button>
                    </Link>
                    <Link href="/plots">
                        <Button variant="outline" size="lg">
                            Browse Plots
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
