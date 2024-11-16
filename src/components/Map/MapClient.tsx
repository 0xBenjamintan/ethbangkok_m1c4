"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import { Plus } from "lucide-react";
import CombinedModal from "../modal/combinedmodal";

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
  const [mousePosition, setMousePosition] = useState<string>("---, ---");
  const [currentLocation, setCurrentLocation] = useState<
    [number, number] | null
  >(null);
  const [locationError, setLocationError] = useState<string>("");
  const [areModalsOpen, setAreModalsOpen] = useState(false);

  const landmarks: Landmark[] = [
    { name: "Bounty 1", coords: [13.6756, 100.6059] },
    { name: "Bounty 2", coords: [13.6685, 100.5985] },
    { name: "Statue of Liberty", coords: [40.6892, -74.0445] },
    { name: "Times Square", coords: [40.758, -73.9855] },
  ];

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);

        // If map exists, pan to current location
        if (map) {
          const zoomLevel = 15;
          map.setView([latitude, longitude], zoomLevel);

          // Add a special marker for current location
          const currentLocationMarker = L.marker([latitude, longitude], {
            icon: L.divIcon({
              className: "current-location-marker",
              html: `
                <div class="relative">
                  <div class="absolute w-4 h-4 bg-[#1929F4] rounded-full"></div>
                  <div class="absolute w-8 h-8 bg-[#1929F4] rounded-full opacity-30 animate-ping"></div>
                </div>
              `,
              iconSize: [32, 32],
              iconAnchor: [16, 16],
            }),
          }).addTo(map);

          currentLocationMarker.bindPopup("You are here!").openPopup();
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        console.error("Geolocation error:", error);
      }
    );
  };

  // Function to toggle the combined modal
  const toggleModals = () => {
    setAreModalsOpen(true);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // First get current location
    getCurrentLocation();

    // Initialize map with a default center (will be updated when location is found)
    const mapInstance = L.map("map").setView([0, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance);

    // Fix icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });

    // Add landmarks
    landmarks.forEach((landmark) => {
      const landmarkMarker = L.marker(landmark.coords).addTo(mapInstance)
        .bindPopup(`
            <b>${landmark.name}</b><br>
            ${landmark.coords}<br>
            <button onclick=window.location.href='/bounty-list'><a>Apply</a></button>
          `);

      landmarkMarker.setOpacity(0.8);
    });

    // Add mousemove handler
    mapInstance.on("mousemove", (e: LeafletMouseEvent) => {
      setMousePosition(
        `${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`
      );
    });

    setMap(mapInstance);

    // Cleanup
    return () => {
      mapInstance.remove();
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="p-4 mb-4 flex flex-col sm:flex-row justify-between items-center bg-[#FDEFB4]">
        <span className="text-center sm:text-left">
          Click the marker to check the bounty details. Click Apply to apply for
          the selected bounty.
        </span>
        <button
          onClick={getCurrentLocation}
          className="mt-2 sm:mt-0 px-4 py-2 bg-[#1929F4] text-white rounded-md hover:bg-[0343DF] transition-colors"
        >
          Center on My Location
        </button>
      </div>

      {locationError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
          {locationError}
        </div>
      )}

      <div id="map" className="w-full h-[80vh] rounded-lg shadow-md" />

      <div className="absolute bottom-5 left-5 bg-white p-3 rounded-md shadow-md z-[1000]">
        Mouse position: {mousePosition}
      </div>
      <button
        onClick={toggleModals}
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-[#1929F4] z-[1000] text-white flex items-center justify-center shadow-lg"
      >
        <Plus size={44} />
      </button>

      {areModalsOpen && (
        <CombinedModal onClose={() => setAreModalsOpen(false)} />
      )}

      <style jsx global>{`
        .current-location-marker {
          position: relative;
        }
      `}</style>
    </div>
  );
};

export default MapClient;
