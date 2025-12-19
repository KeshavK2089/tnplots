'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { SubmissionData } from '@/app/submit/page';

interface StepProps {
    formData: Partial<SubmissionData>;
    updateFormData: (data: Partial<SubmissionData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function ContactStep({ formData, updateFormData, onNext, onBack }: StepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.sellerName) newErrors.sellerName = 'Your name is required';
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number format';
        }

        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                <p className="text-gray-600">How can interested buyers reach you?</p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="sellerName">
                        Your Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="sellerName"
                        placeholder="Full name"
                        value={formData.sellerName || ''}
                        onChange={(e) => updateFormData({ sellerName: e.target.value })}
                        className={errors.sellerName ? 'border-red-500' : ''}
                    />
                    {errors.sellerName && <p className="text-red-500 text-sm mt-1">{errors.sellerName}</p>}
                </div>

                <div>
                    <Label htmlFor="phoneNumber">
                        Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="phoneNumber"
                        placeholder="+91 98765 43210"
                        value={formData.phoneNumber || ''}
                        onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                        className={errors.phoneNumber ? 'border-red-500' : ''}
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                <div>
                    <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                    <Input
                        id="whatsappNumber"
                        placeholder="+91 98765 43210 (if different from phone)"
                        value={formData.whatsappNumber || ''}
                        onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Leave blank if same as phone number
                    </p>
                </div>

                <div>
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email || ''}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                    <strong>Privacy Note:</strong> Your contact information will only be shown to interested buyers. We never share or sell your data.
                </p>
            </div>

            <div className="flex justify-between">
                <Button onClick={onBack} variant="outline" size="lg">
                    ← Back
                </Button>
                <Button onClick={handleNext} size="lg" className="px-8">
                    Next Step →
                </Button>
            </div>
        </div>
    );
}
