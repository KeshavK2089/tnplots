'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Star, Image as ImageIcon } from 'lucide-react';
import type { SubmissionData } from '@/app/submit/page';

interface StepProps {
    formData: Partial<SubmissionData>;
    updateFormData: (data: Partial<SubmissionData>) => void;
    onNext: () => void;
    onBack: () => void;
}

export function PhotosStep({ formData, updateFormData, onNext, onBack }: StepProps) {
    const [previews, setPreviews] = useState<string[]>([]);
    const [errors, setErrors] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files);
        const currentFiles = formData.photos || [];

        // Validate total number
        if (currentFiles.length + newFiles.length > 8) {
            setErrors('Maximum 8 photos allowed');
            return;
        }

        // Validate file types and sizes
        const validFiles: File[] = [];
        for (const file of newFiles) {
            if (!file.type.startsWith('image/')) {
                setErrors(`${file.name} is not an image file`);
                continue;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors(`${file.name} is larger than 5MB`);
                continue;
            }
            validFiles.push(file);
        }

        if (validFiles.length > 0) {
            const allFiles = [...currentFiles, ...validFiles];
            updateFormData({ photos: allFiles });

            // Generate previews
            validFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviews((prev) => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });

            setErrors('');
        }
    };

    const removePhoto = (index: number) => {
        const currentFiles = formData.photos || [];
        const newFiles = currentFiles.filter((_, i) => i !== index);
        updateFormData({ photos: newFiles });
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        const photos = formData.photos || [];
        if (photos.length < 1) {
            setErrors('Please upload at least 1 photo');
            return;
        }
        onNext();
    };

    const photos = formData.photos || [];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Upload Photos</h2>
                <p className="text-gray-600">Add photos of your plot (minimum 1, maximum 8)</p>
            </div>

            {/* Drop Zone */}
            <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleFileSelect(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-500 transition-colors cursor-pointer"
            >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">JPG, PNG or WEBP (max 5MB each)</p>
                <p className="text-xs text-gray-400 mt-2">
                    {photos.length}/8 photos uploaded
                </p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
            />

            {errors && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                    {errors}
                </div>
            )}

            {/* Preview Grid */}
            {previews.length > 0 && (
                <div>
                    <Label className="mb-3 block">Your Photos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {previews.map((preview, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                {index === 0 && (
                                    <div className="absolute top-2 left-2 bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                        <Star size={12} fill="currentColor" />
                                        Featured
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removePhoto(index);
                                    }}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                        <ImageIcon size={14} className="inline" /> The first photo will be the featured image
                    </p>
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Photo Tips:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                    <li>Take photos in good natural light</li>
                    <li>Show different angles of the plot</li>
                    <li>Include photos of road access and boundaries</li>
                    <li>The first photo should be the best overview</li>
                </ul>
            </div>

            <div className="flex justify-between">
                <Button onClick={onBack} variant="outline" size="lg">
                    ← Back
                </Button>
                <Button onClick={handleNext} size="lg" className="px-8" disabled={photos.length === 0}>
                    Next Step →
                </Button>
            </div>
        </div>
    );
}
