'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SubmissionData } from '@/app/submit/page';

interface StepProps {
    formData: Partial<SubmissionData>;
    updateFormData: (data: Partial<SubmissionData>) => void;
    onNext: () => void;
}

export function BasicInfoStep({ formData, updateFormData, onNext }: StepProps) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title) newErrors.title = 'Plot title is required';
        if (!formData.village) newErrors.village = 'Village name is required';
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.category) newErrors.category = 'Category is required';

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
                <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                <p className="text-gray-600">Tell us about your plot</p>
            </div>

            <div className="space-y-4">
                <div>
                    <Label htmlFor="title">
                        Plot Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="title"
                        placeholder="e.g., Premium Residential Plot near Main Road"
                        value={formData.title || ''}
                        onChange={(e) => updateFormData({ title: e.target.value })}
                        className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                    </Label>
                    <Select
                        value={formData.category}
                        onValueChange={(value: 'residential' | 'agricultural' | 'commercial') =>
                            updateFormData({ category: value })
                        }
                    >
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="agricultural">Agricultural</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="village">
                            Village <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="village"
                            placeholder="Village name"
                            value={formData.village || ''}
                            onChange={(e) => updateFormData({ village: e.target.value })}
                            className={errors.village ? 'border-red-500' : ''}
                        />
                        {errors.village && <p className="text-red-500 text-sm mt-1">{errors.village}</p>}
                    </div>

                    <div>
                        <Label htmlFor="taluk">Taluk</Label>
                        <Input
                            id="taluk"
                            placeholder="Taluk name"
                            value={formData.taluk || ''}
                            onChange={(e) => updateFormData({ taluk: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="district">
                            District <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="district"
                            placeholder="District name"
                            value={formData.district || ''}
                            onChange={(e) => updateFormData({ district: e.target.value })}
                            className={errors.district ? 'border-red-500' : ''}
                        />
                        {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                    </div>

                    <div>
                        <Label htmlFor="surveyNumber">Survey Number</Label>
                        <Input
                            id="surveyNumber"
                            placeholder="e.g., 123/4A"
                            value={formData.surveyNumber || ''}
                            onChange={(e) => updateFormData({ surveyNumber: e.target.value })}
                        />
                        <p className="text-sm text-gray-500 mt-1">Optional but recommended</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleNext} size="lg" className="px-8">
                    Next Step →
                </Button>
            </div>
        </div>
    );
}
