// components/Map/index.tsx
import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-lg shadow-md bg-gray-100 flex items-center justify-center">
      Loading map...
    </div>
  )
});

export default function Map() {
  return <MapClient />;
}