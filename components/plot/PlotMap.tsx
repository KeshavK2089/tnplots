'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
}

interface PlotMapProps {
    latitude: number;
    longitude: number;
    title?: string;
    village?: string;
    className?: string;
}

export function PlotMap({ latitude, longitude, title, village, className = '' }: PlotMapProps) {
    const position: [number, number] = [latitude, longitude];

    return (
        <div className={`relative rounded-lg overflow-hidden shadow-premium ${className}`}>
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ minHeight: '300px' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        <div className="text-center">
                            {title && <div className="font-semibold">{title}</div>}
                            {village && <div className="text-sm text-gray-600">{village}</div>}
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
