'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { SubmissionData } from '@/app/submit/page';

interface StepProps {
    formData: Partial<SubmissionData>;
    updateFormData: (data: Partial<SubmissionData>) => void;
    onNext: () => void;
    onBack: () => void;
}

const FEATURES = [
    { id: 'roadAccess', label: 'Road Access', description: 'Direct road connectivity to the plot' },
    { id: 'electricity', label: 'Electricity', description: 'Power supply available or nearby' },
    { id: 'waterSupply', label: 'Water Supply', description: 'Water connection available' },
    { id: 'boundaryWall', label: 'Boundary Wall', description: 'Plot has boundary walls' },
    { id: 'clearTitle', label: 'Clear Title', description: 'No legal disputes, clean documents' },
    { id: 'nearbySchool', label: 'Nearby School', description: 'School within reasonable distance' },
    { id: 'nearbyHospital', label: 'Nearby Hospital', description: 'Hospital within reasonable distance' },
    { id: 'publicTransport', label: 'Public Transport', description: 'Bus stop or transport nearby' },
];

export function FeaturesStep({ formData, updateFormData, onNext, onBack }: StepProps) {
    const updateFeature = (featureId: string, value: boolean) => {
        const updatedFeatures = {
            ...formData.features,
            [featureId]: value,
        };
        updateFormData({ features: updatedFeatures });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Features & Amenities</h2>
                <p className="text-gray-600">Select all features that apply to your plot</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FEATURES.map((feature) => (
                    <div
                        key={feature.id}
                        className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Checkbox
                            id={feature.id}
                            checked={formData.features?.[feature.id as keyof typeof formData.features] || false}
                            onCheckedChange={(checked) => updateFeature(feature.id, checked as boolean)}
                        />
                        <div className="flex-1">
                            <Label htmlFor={feature.id} className="font-medium cursor-pointer">
                                {feature.label}
                            </Label>
                            <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Tip:</strong> Plots with more features attract more buyers. Be honest about what's available!
                </p>
            </div>

            <div className="flex  justify-between">
                <Button onClick={onBack} variant="outline" size="lg">
                    ← Back
                </Button>
                <Button onClick={onNext} size="lg" className="px-8">
                    Next Step →
                </Button>
            </div>
        </div>
    );
}
