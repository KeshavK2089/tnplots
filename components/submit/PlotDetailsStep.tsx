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

export function PlotDetailsStep({ formData, updateFormData, onNext, onBack }: StepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.sizeSqft || formData.sizeSqft <= 0) {
            newErrors.sizeSqft = 'Plot size is required';
        }
        if (!formData.totalPrice || formData.totalPrice <= 0) {
            newErrors.totalPrice = 'Total price is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            // Calculate price per sqft if not set
            if (formData.sizeSqft && formData.totalPrice) {
                const pricePerSqft = Math.round(formData.totalPrice / formData.sizeSqft);
                updateFormData({ pricePerSqft });
            }
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Plot Details</h2>
                <p className="text-gray-600">Tell us about the size and pricing</p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="sizeSqft">
                            Plot Size (sq ft) <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="sizeSqft"
                            type="number"
                            placeholder="e.g., 2400"
                            value={formData.sizeSqft || ''}
                            onChange={(e) => updateFormData({ sizeSqft: parseFloat(e.target.value) })}
                            className={errors.sizeSqft ? 'border-red-500' : ''}
                        />
                        {errors.sizeSqft && <p className="text-red-500 text-sm mt-1">{errors.sizeSqft}</p>}
                    </div>

                    <div>
                        <Label htmlFor="sizeCents">Plot Size (cents)</Label>
                        <Input
                            id="sizeCents"
                            type="number"
                            step="0.01"
                            placeholder="e.g., 0.055"
                            value={formData.sizeCents || ''}
                            onChange={(e) => updateFormData({ sizeCents: parseFloat(e.target.value) })}
                        />
                        <p className="text-sm text-gray-500 mt-1">Optional (1 cent ≈ 435.6 sq ft)</p>
                    </div>
                </div>

                <div>
                    <Label htmlFor="totalPrice">
                        Total Price (₹) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="totalPrice"
                        type="number"
                        placeholder="e.g., 1200000"
                        value={formData.totalPrice || ''}
                        onChange={(e) => updateFormData({ totalPrice: parseFloat(e.target.value) })}
                        className={errors.totalPrice ? 'border-red-500' : ''}
                    />
                    {errors.totalPrice && <p className="text-red-500 text-sm mt-1">{errors.totalPrice}</p>}
                    {formData.totalPrice && formData.sizeSqft && (
                        <p className="text-sm text-green-600 mt-1">
                            ≈ ₹{Math.round(formData.totalPrice / formData.sizeSqft)}/sq ft
                        </p>
                    )}
                </div>

                <div className="border-t pt-4 mt-6">
                    <h3 className="font-semibold mb-4">Location Details (Optional)</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Adding GPS coordinates will show your plot on the map. You can get these from Google Maps by right-clicking on your plot location.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input
                                id="latitude"
                                type="number"
                                step="0.000001"
                                placeholder="e.g., 12.9716"
                                value={formData.latitude || ''}
                                onChange={(e) => updateFormData({ latitude: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="longitude">Longitude</Label>
                            <Input
                                id="longitude"
                                type="number"
                                step="0.000001"
                                placeholder="e.g., 79.8946"
                                value={formData.longitude || ''}
                                onChange={(e) => updateFormData({ longitude: parseFloat(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <Label htmlFor="distanceFromMainRoad">Distance from Main Road (km)</Label>
                            <Input
                                id="distanceFromMainRoad"
                                type="number"
                                step="0.1"
                                placeholder="e.g., 0.5"
                                value={formData.distanceFromMainRoad || ''}
                                onChange={(e) => updateFormData({ distanceFromMainRoad: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="roadWidth">Road Width (feet)</Label>
                            <Input
                                id="roadWidth"
                                type="number"
                                placeholder="e.g., 20"
                                value={formData.roadWidth || ''}
                                onChange={(e) => updateFormData({ roadWidth: parseFloat(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>
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
