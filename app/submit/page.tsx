'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { BasicInfoStep } from '@/components/submit/BasicInfoStep';
import { PlotDetailsStep } from '@/components/submit/PlotDetailsStep';
import { FeaturesStep } from '@/components/submit/FeaturesStep';
import { PhotosStep } from '@/components/submit/PhotosStep';
import { ContactStep } from '@/components/submit/ContactStep';
import { ReviewStep } from '@/components/submit/ReviewStep';

export type SubmissionData = {
    // Basic Info
    title: string;
    village: string;
    district: string;
    taluk: string;
    surveyNumber: string;
    category: 'residential' | 'agricultural' | 'commercial';

    // Plot Details
    sizeSqft: number;
    sizeCents?: number;
    totalPrice: number;
    pricePerSqft: number;
    latitude?: number;
    longitude?: number;
    distanceFromMainRoad?: number;
    roadWidth?: number;

    // Features
    features: {
        roadAccess: boolean;
        electricity: boolean;
        waterSupply: boolean;
        boundaryWall: boolean;
        clearTitle: boolean;
        nearbySchool: boolean;
        nearbyHospital: boolean;
        publicTransport: boolean;
    };

    // Photos
    photos: File[];

    // Contact
    sellerName: string;
    phoneNumber: string;
    whatsappNumber?: string;
    email?: string;
};

const STEPS = [
    { id: 1, name: 'Basic Info', component: BasicInfoStep },
    { id: 2, name: 'Plot Details', component: PlotDetailsStep },
    { id: 3, name: 'Features', component: FeaturesStep },
    { id: 4, name: 'Photos', component: PhotosStep },
    { id: 5, name: 'Contact', component: ContactStep },
    { id: 6, name: 'Review', component: ReviewStep },
];

export default function SubmitPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Partial<SubmissionData>>({
        features: {
            roadAccess: false,
            electricity: false,
            waterSupply: false,
            boundaryWall: false,
            clearTitle: false,
            nearbySchool: false,
            nearbyHospital: false,
            publicTransport: false,
        },
        photos: [],
    });

    const updateFormData = (data: Partial<SubmissionData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const goToNextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const CurrentStepComponent = STEPS[currentStep - 1].component;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <div className="flex-1 bg-gradient-to-br from-orange-50 via-white to-green-50 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                            List Your Plot
                        </h1>
                        <p className="text-gray-600">
                            Fill out this simple form to list your property on TNPlots
                        </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between max-w-3xl mx-auto">
                            {STEPS.map((step, index) => (
                                <div key={step.id} className="flex-1 relative">
                                    <div className="flex items-center">
                                        {/* Circle */}
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${step.id < currentStep
                                                    ? 'bg-green-600 text-white'
                                                    : step.id === currentStep
                                                        ? 'bg-orange-600 text-white shadow-lg scale-110'
                                                        : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {step.id < currentStep ? (
                                                <Check size={20} />
                                            ) : (
                                                step.id
                                            )}
                                        </div>

                                        {/* Line */}
                                        {index < STEPS.length - 1 && (
                                            <div
                                                className={`flex-1 h-1 mx-2 transition-all ${step.id < currentStep
                                                        ? 'bg-green-600'
                                                        : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                    {/* Label */}
                                    <div className="text-xs mt-2 text-center hidden sm:block">
                                        {step.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Card */}
                    <Card className="shadow-premium">
                        <CardContent className="p-8">
                            <CurrentStepComponent
                                formData={formData}
                                updateFormData={updateFormData}
                                onNext={goToNextStep}
                                onBack={goToPreviousStep}
                                {...(currentStep === 1 ? {} : { isFirstStep: false })}
                            />
                        </CardContent>
                    </Card>

                    {/* Help Text */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>
                            Need help? Contact us on{' '}
                            <a
                                href="https://wa.me/919876543210"
                                className="text-green-600 hover:underline font-medium"
                            >
                                WhatsApp
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
