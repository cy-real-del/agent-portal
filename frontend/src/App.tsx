import React, { useState } from 'react';
import Header from './components/layout/Header';
import PropertyCard from './components/properties/PropertyCard';
import MapComponent from './components/map/MapComponent';
import FilterPanel from './components/filters/FilterPanel';

// Тестовые данные
const testProperties = [
  {
    id: '451',
    title: 'Эксклюзивный Комплекс в 50 м. от Моря - Киссонерга',
    type: 'villa' as const,
    status: 'available' as const,
    price: 1350000,
    area: { total: 232 },
    rooms: 3,
    bathrooms: 2,
    address: { region: 'Paphos', area: 'Kissonerga' },
    coordinates: { lat: 34.826944550724, lng: 32.389712333679 },
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'],
    distanceToSea: 50,
    features: ['Вид на море', 'Бассейн', 'Охрана']
  },
  {
    id: '452',
    title: 'Апартаменты в Лимассоле',
    type: 'apartment' as const,
    status: 'available' as const,
    price: 580000,
    area: { total: 135 },
    rooms: 3,
    bathrooms: 2,
    address: { region: 'Limassol', area: 'Tourist Area' },
    coordinates: { lat: 34.6719, lng: 33.0467 },
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400'],
    distanceToSea: 400,
    features: ['Вид на море', 'Бассейн']
  }
];

const testComplexes = [
  {
    id: 'ALBUS_PALACE',
    name: 'Albus Palace',
    developer: 'Antaria Development',
    region: 'Paphos',
    area: 'Kissonerga',
    coordinates: { lat: 34.826944550724, lng: 32.389712333679 },
    priceRange: { min: 1350000, max: 1350000 },
    totalUnits: 11,
    availableUnits: 1
  }
];

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'properties' | 'complexes'>('properties');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  
  // Фильтры
  const [propertyFilters, setPropertyFilters] = useState({
    searchTerm: '',
    priceRange: { min: '', max: '' },
    regionFilter: '',
    typeFilter: '',
    statusFilter: '',
    roomsFilter: '',
    maxDistanceToSea: ''
  });
  
  const [complexFilters, setComplexFilters] = useState({
    searchTerm: '',
    priceRange: { min: '', max: '' },
    regionFilter: '',
    developerFilter: ''
  });

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
    console.log('Selected property:', property);
  };

  const handleToggleSelection = (propertyId: string) => {
    setSelectedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const resetFilters = () => {
    setPropertyFilters({
      searchTerm: '',
      priceRange: { min: '', max: '' },
      regionFilter: '',
      typeFilter: '',
      statusFilter: '',
      roomsFilter: '',
      maxDistanceToSea: ''
    });
    setComplexFilters({
      searchTerm: '',
      priceRange: { min: '', max: '' },
      regionFilter: '',
      developerFilter: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Фильтры */}
        <FilterPanel
          viewMode={viewMode}
          propertyFilters={propertyFilters}
          complexFilters={complexFilters}
          onPropertyFiltersChange={setPropertyFilters}
          onComplexFiltersChange={setComplexFilters}
          onResetFilters={resetFilters}
          onViewModeChange={setViewMode}
          filteredPropertiesCount={testProperties.length}
          filteredComplexesCount={testComplexes.length}
        />

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Карта */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Интерактивная карта</h3>
            <MapComponent
              properties={testProperties}
              complexes={testComplexes}
              viewMode={viewMode}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
            />
          </div>

          {/* Список объектов */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">
              {viewMode === 'properties' ? 'Объекты недвижимости' : 'Комплексы'}
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testProperties.map(property => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isSelected={selectedProperty?.id === property.id}
                  onSelect={handlePropertySelect}
                  onToggleSelection={handleToggleSelection}
                  isInSelection={selectedProperties.includes(property.id)}
                />
              ))}
            </div>
          </div>
        </div>
{/* Состояние приложения */}
       <div className="mt-6 bg-white rounded-lg shadow-md p-4">
         <h3 className="font-semibold mb-2">🎯 Состояние приложения:</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
           <div>
             <strong>Режим просмотра:</strong> {viewMode === 'properties' ? 'Объекты' : 'Комплексы'}
           </div>
           <div>
             <strong>Выбранный объект:</strong> {selectedProperty?.title || 'Нет'}
           </div>
           <div>
             <strong>В подборке:</strong> {selectedProperties.length} объектов
           </div>
         </div>
         
         {/* Активные фильтры */}
         {(propertyFilters.searchTerm || propertyFilters.regionFilter || complexFilters.searchTerm) && (
           <div className="mt-3 pt-3 border-t">
             <strong className="text-sm">Активные фильтры:</strong>
             <div className="flex flex-wrap gap-2 mt-1">
               {propertyFilters.searchTerm && (
                 <span className="bg-cyprus-100 text-cyprus-800 px-2 py-1 rounded-full text-xs">
                   Поиск: {propertyFilters.searchTerm}
                 </span>
               )}
               {propertyFilters.regionFilter && (
                 <span className="bg-cyprus-100 text-cyprus-800 px-2 py-1 rounded-full text-xs">
                   Регион: {propertyFilters.regionFilter}
                 </span>
               )}
             </div>
           </div>
         )}
       </div>
     </main>
   </div>
 );
};

export default App;
