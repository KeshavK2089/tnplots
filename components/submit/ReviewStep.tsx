'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, Maximize2, Tag, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';
import type { SubmissionData } from '@/app/submit/page';

interface StepProps {
    formData: Partial<SubmissionData>;
    onBack: () => void;
}

export function ReviewStep({ formData, onBack }: StepProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            // Upload images first
            const imageUrls = await uploadImages(formData.photos || []);

            // Submit the listing
            const response = await fetch('/api/submit-listing', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    imageUrls,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit listing');
            }

            // Redirect to success page
            router.push('/submit/success');
        } catch (err) {
            setError('Failed to submit your listing. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const uploadImages = async (files: File[]): Promise<string[]> => {
        const uploadPromises = files.map(async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to upload ${file.name}`);
            }

            const data = await response.json();
            return data.url;
        });

        return Promise.all(uploadPromises);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Review Your Listing</h2>
                <p className="text-gray-600">Please review all information before submitting</p>
            </div>

            {/* Basic Info */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Tag size={18} className="text-orange-600" />
                    Basic Information
                </h3>
                <div className="space-y-2 text-sm">
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Category:</strong> <span className="capitalize">{formData.category}</span></p>
                    <p><strong>Location:</strong> {formData.village}, {formData.taluk && `${formData.taluk}, `}{formData.district}</p>
                    {formData.surveyNumber && <p><strong>Survey No:</strong> {formData.surveyNumber}</p>}
                </div>
            </div>

            {/* Plot Details */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Maximize2 size={18} className="text-green-600" />
                    Plot Details
                </h3>
                <div className="space-y-2 text-sm">
                    <p><strong>Size:</strong> {formData.sizeSqft} sq ft {formData.sizeCents && `(${formData.sizeCents} cents)`}</p>
                    <p><strong>Price:</strong> ₹{formData.totalPrice?.toLocaleString()} (₹{formData.pricePerSqft}/sq ft)</p>
                    {formData.latitude && formData.longitude && (
                        <p><strong>GPS:</strong> {formData.latitude}, {formData.longitude}</p>
                    )}
                </div>
            </div>

            {/* Features */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle size={18} className="text-blue-600" />
                    Features
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(formData.features || {})
                        .filter(([_, value]) => value)
                        .map(([key, _]) => (
                            <p key={key} className="flex items-center gap-1">
                                <CheckCircle size={14} className="text-green-600" />
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </p>
                        ))}
                </div>
            </div>

            {/* Photos */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3">Photos ({formData.photos?.length || 0})</h3>
                <div className="grid grid-cols-4 gap-2">
                    {formData.photos?.slice(0, 4).map((_, index) => (
                        <div key={index} className="aspect-square bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <User size={18} className="text-purple-600" />
                    Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                    <p className="flex items-center gap-2">
                        <User size={14} />
                        {formData.sellerName}
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone size={14} />
                        {formData.phoneNumber}
                    </p>
                    {formData.email && (
                        <p className="flex items-center gap-2">
                            <Mail size={14} />
                            {formData.email}
                        </p>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {error}
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>What happens next?</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                    <li>Your listing will be reviewed by our team (usually within 24 hours)</li>
                    <li>You'll receive an email confirmation once approved</li>
                    <li>Your plot will then be visible to thousands of potential buyers</li>
                </ul>
            </div>

            <div className="flex justify-between">
                <Button onClick={onBack} variant="outline" size="lg" disabled={isSubmitting}>
                    ← Back
                </Button>
                <Button onClick={handleSubmit} size="lg" className="px-8" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Submitting...
                        </>
                    ) : (
                        'Submit Listing'
                    )}
                </Button>
            </div>
        </div>
    );
}
