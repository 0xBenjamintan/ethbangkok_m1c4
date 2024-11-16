// components/InteractiveMap.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, LeafletMouseEvent } from 'leaflet';

interface Landmark {
  name: string;
  coords: [number, number];
}

interface Marker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
}

// Dynamically import Leaflet with no SSR
const InitMap = () => {
  // This will only be imported on the client side
  const L = require('leaflet');
  return L;
};

const InteractiveMap = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [mousePosition, setMousePosition] = useState<string>('---, ---');

  const landmarks: Landmark[] = [
    { name: "Central Park", coords: [40.7829, -73.9654] },
    { name: "Empire State Building", coords: [40.7484, -73.9857] },
    { name: "Statue of Liberty", coords: [40.6892, -74.0445] },
    { name: "Times Square", coords: [40.7580, -73.9855] },
  ];

  useEffect(() => {
    // Initialize map only on client side
    let L: any;
    try {
      L = InitMap();
    } catch (e) {
      return; // Return early if we're on the server
    }

    const mapInstance = L.map('map').setView([40.7128, -74.0060], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    // Fix the default icon path issue
    L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/';

    // Add landmarks
    landmarks.forEach(landmark => {
      L.marker(landmark.coords)
        .addTo(mapInstance)
        .bindPopup(`<b>${landmark.name}</b><br>Click to explore this area`)
        .setOpacity(0.8);
    });

    // Add click handler
    mapInstance.on('click', (e: LeafletMouseEvent) => {
      const newMarker = L.marker(e.latlng).addTo(mapInstance);
      
      const markerId = `marker-${Date.now()}`;
      newMarker.bindPopup(`
        <b>Custom Marker</b><br>
        Latitude: ${e.latlng.lat.toFixed(4)}<br>
        Longitude: ${e.latlng.lng.toFixed(4)}<br>
        <small>Click marker to remove</small>
      `);

      // Add click handler to remove marker
      newMarker.on('click', () => {
        mapInstance.removeLayer(newMarker);
        setMarkers(prev => prev.filter(m => m.id !== markerId));
      });

      setMarkers(prev => [...prev, { 
        id: markerId, 
        position: { 
          lat: e.latlng.lat, 
          lng: e.latlng.lng 
        } 
      }]);
    });

    // Add mousemove handler
    mapInstance.on('mousemove', (e: LeafletMouseEvent) => {
      setMousePosition(`${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    });

    setMap(mapInstance);

    // Cleanup
    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="p-4 bg-gray-50 rounded-md shadow-sm mb-4">
        Exploring New York City. Click anywhere to add a marker. Click a marker to remove it.
      </div>
      
      <div 
        id="map" 
        className="w-full h-[600px] rounded-lg shadow-md"
      />
      
      <div className="absolute bottom-5 left-5 bg-white p-3 rounded-md shadow-md z-[1000]">
        Mouse position: {mousePosition}
      </div>
    </div>
  );
};

// Dynamically export the component with no SSR
export default dynamic(() => Promise.resolve(InteractiveMap), {
  ssr: false
});