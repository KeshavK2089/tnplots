import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SubmitSuccessPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center py-12">
                <div className="container mx-auto px-4 max-w-2xl">
                    <Card className="shadow-premium">
                        <CardContent className="p-12 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>

                            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                                Submission Successful!
                            </h1>

                            <p className="text-gray-600 mb-6">
                                Thank you for listing your plot on TNPlots. Your listing has been received and is now under review.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                                <h3 className="font-semibold mb-3">What happens next?</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Our team will review your listing within <strong>24 hours</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>You'll receive a <strong>confirmation email</strong> once approved</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>Your plot will be visible to <strong>thousands of buyers</strong></span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                                        <span>You'll start receiving <strong>buyer inquiries via WhatsApp</strong></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <Link href="/plots">
                                    <Button size="lg" className="w-full">
                                        Browse All Plots
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" size="lg" className="w-full">
                                        Return to Homepage
                                    </Button>
                                </Link>
                            </div>

                            <p className="mt-8 text-sm text-gray-500">
                                Questions? Contact us on{' '}
                                <a
                                    href="https://wa.me/919876543210"
                                    className="text-green-600 hover:underline font-medium"
                                >
                                    WhatsApp
                                </a>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
