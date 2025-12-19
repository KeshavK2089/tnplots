'use client';

import dynamic from 'next/dynamic';

// Dynamic import for map component (client-side only)
const PlotMap = dynamic(
    () => import('./PlotMap').then((mod) => mod.PlotMap),
    {
        ssr: false,
        loading: () => <div className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />
    }
);

interface PlotMapWrapperProps {
    latitude: number;
    longitude: number;
    title: string;
    village: string;
    className?: string;
}

export function PlotMapWrapper({ latitude, longitude, title, village, className }: PlotMapWrapperProps) {
    return (
        <PlotMap
            latitude={latitude}
            longitude={longitude}
            title={title}
            village={village}
            className={className}
        />
    );
}
