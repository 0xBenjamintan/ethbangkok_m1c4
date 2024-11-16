// components/Map/MapClient.tsx
'use client';

import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap, LeafletMouseEvent } from 'leaflet';
import { Button } from '../ui/button';

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

const MapClient = () => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [mousePosition, setMousePosition] = useState<string>('---, ---');
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string>('');

  const landmarks: Landmark[] = [
    { name: "Bounty 1", coords: [13.6756, 100.6059] },
    { name: "Bounty 2", coords: [13.6685, 100.5985] },
    { name: "Statue of Liberty", coords: [40.6892, -74.0445] },
    { name: "Times Square", coords: [40.7580, -73.9855] },
  ];

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        
        // If map exists, pan to current location
        if (map) {
          map.setView([latitude, longitude], 15);
          
          // Add a special marker for current location
          const currentLocationMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: 'current-location-marker',
              html: `
                <div class="relative">
                  <div class="absolute w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div class="absolute w-8 h-8 bg-blue-500 rounded-full opacity-30 animate-ping"></div>
                </div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            })
          }).addTo(map);
          
          currentLocationMarker.bindPopup('You are here!').openPopup();
        }
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        console.error('Geolocation error:', error);
      }
    );
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // First get current location
    getCurrentLocation();

    // Initialize map with a default center (will be updated when location is found)
    const mapInstance = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    // Fix icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });

    // Add landmarks
    landmarks.forEach(landmark => {
      const landmarkMarker = L.marker(landmark.coords)
        .addTo(mapInstance)
        .bindPopup(`
            <b>${landmark.name}</b><br>
            ${landmark.coords}<br>
            <button onclick=window.location.href='/bounty'>Apply</button>
          `);
          
      landmarkMarker.setOpacity(0.8);
    });

    // // Add click handler for new markers
    // mapInstance.on('click', (e: LeafletMouseEvent) => {
    //   const newMarker = L.marker(e.latlng).addTo(mapInstance);
      
    //   const markerId = `marker-${Date.now()}`;
    //   newMarker.bindPopup(`
    //     <b>Custom Marker</b><br>
    //     Latitude: ${e.latlng.lat.toFixed(4)}<br>
    //     Longitude: ${e.latlng.lng.toFixed(4)}<br>
    //     <small>Click marker to remove</small>
    //   `);

    //   newMarker.on('click', () => {
    //     mapInstance.removeLayer(newMarker);
    //     setMarkers(prev => prev.filter(m => m.id !== markerId));
    //   });

    //   setMarkers(prev => [...prev, { 
    //     id: markerId, 
    //     position: { 
    //       lat: e.latlng.lat, 
    //       lng: e.latlng.lng 
    //     } 
    //   }]);
    // });

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
      <div className="p-4 bg-gray-50 rounded-md shadow-sm mb-4 flex justify-between items-center">
        <span>Click anywhere to add a marker. Click a marker to remove it.</span>
        <button 
          onClick={getCurrentLocation}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Center on My Location
        </button>
      </div>
      
      {locationError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          {locationError}
        </div>
      )}
      
      <div 
        id="map" 
        className="w-full h-[600px] rounded-lg shadow-md"
      />
      
      <div className="absolute bottom-5 left-5 bg-white p-3 rounded-md shadow-md z-[1000]">
        Mouse position: {mousePosition}
      </div>

      <style jsx global>{`
        .current-location-marker {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default MapClient;