import React from 'react';

type ViewMode = 'properties' | 'complexes';

interface PropertyFilters {
  searchTerm: string;
  priceRange: { min: string; max: string };
  regionFilter: string;
  typeFilter: string;
  statusFilter: string;
  roomsFilter: string;
  maxDistanceToSea: string;
}

interface ComplexFilters {
  searchTerm: string;
  priceRange: { min: string; max: string };
  regionFilter: string;
  developerFilter: string;
}

interface FilterPanelProps {
  viewMode: ViewMode;
  propertyFilters: PropertyFilters;
  complexFilters: ComplexFilters;
  onPropertyFiltersChange: (filters: PropertyFilters) => void;
  onComplexFiltersChange: (filters: ComplexFilters) => void;
  onResetFilters: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  selectedComplexId?: string | null;
  selectedComplexName?: string;
  filteredPropertiesCount: number;
  filteredComplexesCount: number;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  viewMode,
  propertyFilters,
  complexFilters,
  onPropertyFiltersChange,
  onComplexFiltersChange,
  onResetFilters,
  onViewModeChange,
  selectedComplexId,
  selectedComplexName,
  filteredPropertiesCount,
  filteredComplexesCount,
  className = ''
}) => {
  const handlePropertyFilterChange = (key: keyof PropertyFilters, value: string) => {
    if (key === 'priceRange') {
      // Не должно попасть сюда, но для безопасности
      return;
    }
    onPropertyFiltersChange({
      ...propertyFilters,
      [key]: value
    });
  };

  const handlePropertyPriceChange = (type: 'min' | 'max', value: string) => {
    onPropertyFiltersChange({
      ...propertyFilters,
      priceRange: {
        ...propertyFilters.priceRange,
        [type]: value
      }
    });
  };

  const handleComplexFilterChange = (key: keyof ComplexFilters, value: string) => {
    if (key === 'priceRange') {
      // Не должно попасть сюда, но для безопасности
      return;
    }
    onComplexFiltersChange({
      ...complexFilters,
      [key]: value
    });
  };

  const handleComplexPriceChange = (type: 'min' | 'max', value: string) => {
    onComplexFiltersChange({
      ...complexFilters,
      priceRange: {
        ...complexFilters.priceRange,
        [type]: value
      }
    });
  };

  const currentFilters = viewMode === 'properties' ? propertyFilters : complexFilters;
  const currentCount = viewMode === 'properties' ? filteredPropertiesCount : filteredComplexesCount;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 ${className}`}>
      {/* Заголовок и переключатель режима */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* Переключатель режима */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('complexes')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'complexes'
                ? 'text-white bg-cyprus-400'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Комплексы ({filteredComplexesCount})
          </button>
          <button
            onClick={() => onViewModeChange('properties')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'properties'
                ? 'text-white bg-cyprus-400'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Объекты ({filteredPropertiesCount})
          </button>
        </div>

        {/* Хлебные крошки */}
        {selectedComplexId && selectedComplexName && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Комплекс: <strong className="text-cyprus-600">{selectedComplexName}</strong>
            </span>
            <button
              onClick={onResetFilters}
              className="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-2 py-1 rounded"
            >
              ✕ Сбросить
            </button>
          </div>
        )}

        {/* Счетчик результатов */}
        <div className="ml-auto text-sm text-gray-600">
          Найдено: <strong>{currentCount}</strong> {viewMode === 'properties' ? 'объектов' : 'комплексов'}
        </div>
      </div>

      {/* Фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Поиск */}
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder={`Поиск по ${viewMode === 'properties' ? 'объектам' : 'комплексам'}...`}
            value={currentFilters.searchTerm}
            onChange={(e) => viewMode === 'properties' 
              ? handlePropertyFilterChange('searchTerm', e.target.value)
              : handleComplexFilterChange('searchTerm', e.target.value)
            }
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
          />
          <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Регион */}
        <select 
          value={currentFilters.regionFilter}
          onChange={(e) => viewMode === 'properties' 
            ? handlePropertyFilterChange('regionFilter', e.target.value)
            : handleComplexFilterChange('regionFilter', e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
        >
          <option value="">Все регионы</option>
          <option value="Limassol">Лимассол</option>
          <option value="Paphos">Пафос</option>
          <option value="Nicosia">Никосия</option>
          <option value="Larnaca">Ларнака</option>
          <option value="Famagusta">Фамагуста</option>
        </select>

        {/* Дополнительные фильтры для объектов */}
        {viewMode === 'properties' && (
          <>
            {/* Тип объекта */}
            <select 
              value={propertyFilters.typeFilter}
              onChange={(e) => handlePropertyFilterChange('typeFilter', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
            >
              <option value="">Все типы</option>
              <option value="apartment">Апартаменты</option>
              <option value="villa">Вилла</option>
              <option value="house">Дом</option>
              <option value="studio">Студия</option>
            </select>

            {/* Статус */}
            <select 
              value={propertyFilters.statusFilter}
              onChange={(e) => handlePropertyFilterChange('statusFilter', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
            >
              <option value="">Все статусы</option>
              <option value="available">Доступно</option>
              <option value="reserved">Резерв</option>
              <option value="sold">Продано</option>
            </select>

            {/* Комнаты */}
            <select 
              value={propertyFilters.roomsFilter}
              onChange={(e) => handlePropertyFilterChange('roomsFilter', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
            >
              <option value="">Комнаты</option>
              <option value="1">1 комната</option>
              <option value="2">2 комнаты</option>
              <option value="3">3 комнаты</option>
              <option value="4">4 комнаты</option>
              <option value="5">5+ комнат</option>
            </select>
          </>
        )}

        {/* Дополнительные фильтры для комплексов */}
        {viewMode === 'complexes' && (
          <select 
            value={complexFilters.developerFilter}
            onChange={(e) => handleComplexFilterChange('developerFilter', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent md:col-span-2"
          >
            <option value="">Все застройщики</option>
            <option value="Antaria Development">Antaria Development</option>
            <option value="Athanasiou Group">Athanasiou Group</option>
            <option value="Cyprus Developers Ltd">Cyprus Developers Ltd</option>
            <option value="Urban Developments">Urban Developments</option>
            <option value="Luxury Estates Cyprus">Luxury Estates Cyprus</option>
            <option value="Resort Properties Ltd">Resort Properties Ltd</option>
          </select>
        )}
      </div>

      {/* Ценовые фильтры */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        <input
          type="number"
          placeholder="Цена от €"
          value={currentFilters.priceRange.min}
          onChange={(e) => viewMode === 'properties' 
            ? handlePropertyPriceChange('min', e.target.value)
            : handleComplexPriceChange('min', e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
        />

        <input
          type="number"
          placeholder="Цена до €"
          value={currentFilters.priceRange.max}
          onChange={(e) => viewMode === 'properties' 
            ? handlePropertyPriceChange('max', e.target.value)
            : handleComplexPriceChange('max', e.target.value)
          }
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
        />

        {/* Расстояние до моря (только для объектов) */}
        {viewMode === 'properties' && (
          <input
            type="number"
            placeholder="До моря (м)"
            value={propertyFilters.maxDistanceToSea}
            onChange={(e) => handlePropertyFilterChange('maxDistanceToSea', e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyprus-400 focus:border-transparent"
          />
        )}

        {/* Кнопка сброса */}
        <button
          onClick={onResetFilters}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
