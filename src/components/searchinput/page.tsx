import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, LeafletMouseEvent } from "leaflet";
import { Plus } from "lucide-react";
import CombinedModal from "../modal/combinedmodal";

interface LocationSearchInputProps {
  onLocationSelect: (lat: number, lng: number, name: string) => void;
  fieldRef?: React.Ref<HTMLInputElement>;
}

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onLocationSelect, fieldRef }) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [geocoder, setGeocoder] = useState<any>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("hidden-map").setView([0, 0], 1);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data © OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    if (!geocoder) {
      const geo = new (require("leaflet-control-geocoder").Control).Nominatim();
      setGeocoder(geo);
      if (inputRef.current) {
        geo.markGeocode = function (result: any) {
          const bbox = result.bbox;
          const center = bbox.getCenter();
          onLocationSelect(center.lat, center.lng, result.name);
          if (inputRef.current) {
            inputRef.current.value = result.name; // Set input to show the formatted address
          }
          return this;
        };
      }
    }
  }, [onLocationSelect]);

  const handleSearch = () => {
    const searchText = inputRef.current?.value;
    if (searchText && geocoder) {
      (geocoder as any).geocode(searchText);
    }
  };

  return (
    <div style={{ display: "none" }} ref={divRef}>
      <div ref={mapRef} id="hidden-map" style={{ height: "1px" }} />
      <input
        ref={inputRef}
        type="text"
        onBlur={handleSearch}
        {...fieldRef}
        placeholder="Type location..."
      />
    </div>
  );
};

export default LocationSearchInput;
