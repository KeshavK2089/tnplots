'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterSection {
    title: string;
    key: string;
    options: { label: string; value: string; href: string }[];
}

export function Filters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        category: true,
        price: true,
        size: true,
    });

    const filterSections: FilterSection[] = [
        {
            title: 'Category',
            key: 'category',
            options: [
                { label: 'All Categories', value: '', href: '/plots' },
                { label: 'Residential', value: 'residential', href: '/plots?category=residential' },
                { label: 'Agricultural', value: 'agricultural', href: '/plots?category=agricultural' },
                { label: 'Commercial', value: 'commercial', href: '/plots?category=commercial' },
            ],
        },
        {
            title: 'Price Range',
            key: 'price',
            options: [
                { label: 'All Prices', value: '', href: '/plots' },
                { label: 'Under ₹5 Lakhs', value: 'under-5', href: '/plots?maxPrice=500000' },
                { label: '₹5L - ₹10L', value: '5-10', href: '/plots?minPrice=500000&maxPrice=1000000' },
                { label: '₹10L - ₹20L', value: '10-20', href: '/plots?minPrice=1000000&maxPrice=2000000' },
                { label: '₹20L - ₹50L', value: '20-50', href: '/plots?minPrice=2000000&maxPrice=5000000' },
                { label: 'Above ₹50 Lakhs', value: 'above-50', href: '/plots?minPrice=5000000' },
            ],
        },
        {
            title: 'Plot Size',
            key: 'size',
            options: [
                { label: 'All Sizes', value: '', href: '/plots' },
                { label: 'Under 1000 sqft', value: 'under-1000', href: '/plots?maxSize=1000' },
                { label: '1000 - 2400 sqft', value: '1000-2400', href: '/plots?minSize=1000&maxSize=2400' },
                { label: '2400 - 5000 sqft', value: '2400-5000', href: '/plots?minSize=2400&maxSize=5000' },
                { label: 'Above 5000 sqft', value: 'above-5000', href: '/plots?minSize=5000' },
            ],
        },
    ];

    const toggleSection = (key: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const getActiveFilters = () => {
        const params = new URLSearchParams(searchParams.toString());
        const filters: string[] = [];

        if (params.get('category')) filters.push(`Category: ${params.get('category')}`);
        if (params.get('minPrice') || params.get('maxPrice')) {
            filters.push('Price filter active');
        }
        if (params.get('minSize') || params.get('maxSize')) {
            filters.push('Size filter active');
        }

        return filters;
    };

    const clearAllFilters = () => {
        router.push('/plots');
    };

    const activeFilters = getActiveFilters();
    const currentCategory = searchParams.get('category') || '';
    const hasActiveFilters = activeFilters.length > 0;

    return (
        <div className="bg-white rounded-lg border shadow-sm sticky top-20">
            {/* Header */}
            <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Filter className="text-orange-600" size={20} />
                        <h3 className="font-semibold text-lg">Filters</h3>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllFilters}
                            className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {activeFilters.map((filter, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full border border-orange-200"
                            >
                                {filter}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Filter Sections */}
            <div className="divide-y">
                {filterSections.map((section) => (
                    <div key={section.key} className="animate-fade-in">
                        {/* Section Header */}
                        <button
                            onClick={() => toggleSection(section.key)}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                            <h4 className="text-sm font-medium text-gray-900">{section.title}</h4>
                            {expandedSections[section.key] ? (
                                <ChevronUp size={16} className="text-gray-400" />
                            ) : (
                                <ChevronDown size={16} className="text-gray-400" />
                            )}
                        </button>

                        {/* Section Options */}
                        {expandedSections[section.key] && (
                            <div className="px-6 pb-4 space-y-1 animate-slide-in">
                                {section.options.map((option) => {
                                    const isActive =
                                        section.key === 'category'
                                            ? currentCategory === option.value
                                            : false;

                                    return (
                                        <a
                                            key={option.value}
                                            href={option.href}
                                            className={`block px-3 py-2 text-sm rounded-md transition-all ${isActive
                                                    ? 'bg-gradient-to-r from-orange-50 to-green-50 text-orange-700 font-medium border border-orange-200'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                                                }`}
                                        >
                                            {option.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="p-6 bg-gradient-premium-light border-t">
                <p className="text-xs text-gray-600 text-center">
                    Showing verified plots across Tamil Nadu
                </p>
            </div>
        </div>
    );
}
