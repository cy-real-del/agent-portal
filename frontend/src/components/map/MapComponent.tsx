import React, { useEffect, useRef } from 'react';

// Определяем типы для Leaflet
declare global {
  interface Window {
    L: any;
  }
}

interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'studio' | 'house';
  status: 'available' | 'reserved' | 'sold';
  price: number;
  area: { total: number };
  rooms: number;
  address: { region: string; area: string };
  coordinates: { lat: number; lng: number };
  images: string[];
  distanceToSea: number;
  features: string[];
}

interface Complex {
  id: string;
  name: string;
  developer: string;
  region: string;
  area: string;
  coordinates: { lat: number; lng: number };
  priceRange: { min: number; max: number };
  totalUnits: number;
  availableUnits: number;
}

type ViewMode = 'properties' | 'complexes';

interface MapComponentProps {
  properties?: Property[];
  complexes?: Complex[];
  viewMode: ViewMode;
  selectedProperty?: Property | null;
  selectedComplex?: Complex | null;
  onPropertySelect?: (property: Property) => void;
  onComplexSelect?: (complex: Complex) => void;
  className?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  properties = [],
  complexes = [],
  viewMode,
  selectedProperty,
  selectedComplex,
  onPropertySelect,
  onComplexSelect,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Проверяем что Leaflet загружен
    if (typeof window !== 'undefined' && window.L) {
      const L = window.L;
      
      // Создаем карту
      const map = L.map(mapRef.current).setView([34.9, 33.0], 9);
      
      // Добавляем тайлы OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    // Cleanup при размонтировании
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Обновление маркеров при изменении данных
  useEffect(() => {
    if (!mapInstanceRef.current || typeof window === 'undefined' || !window.L) return;

    const L = window.L;
    const map = mapInstanceRef.current;

    // Очищаем старые маркеры
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = [];

    if (viewMode === 'complexes') {
      // Показываем маркеры комплексов
      complexes.forEach(complex => {
        const icon = L.divIcon({
          html: `<div class="complex-marker">${complex.totalUnits}</div>`,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([complex.coordinates.lat, complex.coordinates.lng], { icon })
          .addTo(map);

        const popupContent = `
          <div class="property-popup">
            <h3 style="font-weight: bold; margin-bottom: 8px; color: #C5A880;">${complex.name}</h3>
            <p><strong>Застройщик:</strong> ${complex.developer}</p>
            <p><strong>Регион:</strong> ${complex.region}, ${complex.area}</p>
            <p><strong>Цена от:</strong> €${complex.priceRange.min.toLocaleString()}</p>
            <p><strong>Объектов:</strong> ${complex.availableUnits} из ${complex.totalUnits} доступно</p>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          if (onComplexSelect) {
            onComplexSelect(complex);
          }
        });

        markersRef.current.push(marker);
      });
    } else {
      // Показываем маркеры объектов
      properties.forEach(property => {
        const markerClass = property.status === 'available' ? 'property-marker' :
                           property.status === 'reserved' ? 'property-marker reserved' :
                           'property-marker sold';

        const icon = L.divIcon({
          html: `<div class="${markerClass}"></div>`,
          className: 'custom-div-icon',
          iconSize: [25, 25],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([property.coordinates.lat, property.coordinates.lng], { icon })
          .addTo(map);

        const popupContent = `
          <div class="property-popup">
            <img src="${property.images[0]}" alt="${property.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
            <h3 style="font-weight: bold; margin-bottom: 8px; color: #C5A880;">${property.title}</h3>
            <p><strong>Цена:</strong> €${property.price.toLocaleString()}</p>
            <p><strong>Площадь:</strong> ${property.area.total} м²</p>
            <p><strong>Комнаты:</strong> ${property.rooms}</p>
            <p><strong>Регион:</strong> ${property.address.region}</p>
            <p><strong>До моря:</strong> ${property.distanceToSea} м</p>
            <div style="margin-top: 8px;">
              ${property.features.map(f => `<span style="background: #F3F4F6; padding: 2px 6px; border-radius: 12px; font-size: 11px; margin-right: 4px;">${f}</span>`).join('')}
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
        
        marker.on('click', () => {
          if (onPropertySelect) {
            onPropertySelect(property);
          }
        });

        markersRef.current.push(marker);
      });
    }

    // Подгоняем границы карты под маркеры
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds(), { padding: [20, 20] });
    }
  }, [properties, complexes, viewMode, onPropertySelect, onComplexSelect]);

  // Центрирование на выбранном объекте
  useEffect(() => {
    if (selectedProperty && mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [selectedProperty.coordinates.lat, selectedProperty.coordinates.lng], 
        15,
        { animate: true }
      );
    }
  }, [selectedProperty]);

  // Центрирование на выбранном комплексе
  useEffect(() => {
    if (selectedComplex && mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [selectedComplex.coordinates.lat, selectedComplex.coordinates.lng], 
        13,
        { animate: true }
      );
    }
  }, [selectedComplex]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full min-h-[400px] rounded-lg"
        style={{ zIndex: 1 }}
      />
      
      {/* Loading overlay */}
      {typeof window !== 'undefined' && !window.L && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyprus-400 mx-auto mb-2"></div>
            <p className="text-gray-600">Загрузка карты...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
