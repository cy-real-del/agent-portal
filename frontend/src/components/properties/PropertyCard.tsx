import React from 'react';

interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'studio' | 'house';
  status: 'available' | 'reserved' | 'sold';
  price: number;
  area: { total: number };
  rooms: number;
  bathrooms: number;
  address: { region: string; area: string };
  images: string[];
  distanceToSea: number;
  features: string[];
}

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  onSelect: (property: Property) => void;
  onToggleSelection: (propertyId: string) => void;
  isInSelection?: boolean;
  className?: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSelected = false,
  onSelect,
  onToggleSelection,
  isInSelection = false,
  className = ''
}) => {
  const getStatusColor = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Property['status']) => {
    switch (status) {
      case 'available':
        return 'Доступно';
      case 'reserved':
        return 'Резерв';
      case 'sold':
        return 'Продано';
      default:
        return status;
    }
  };

  const formatPrice = (price: number) => {
    return `€${price.toLocaleString()}`;
  };

  const formatDistance = (distance: number) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(1)}км`;
    }
    return `${distance}м`;
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all cursor-pointer hover:shadow-lg ${
        isSelected ? 'ring-2 ring-cyprus-400 shadow-lg' : ''
      } ${className}`}
      onClick={() => onSelect(property)}
    >
      {/* Image */}
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-32 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400';
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(property.status)}`}>
            {getStatusText(property.status)}
          </span>
        </div>
        
        {/* Property ID */}
        <div className="absolute top-2 left-2">
          <span 
            className="text-white px-2 py-1 rounded text-xs font-medium"
            style={{ backgroundColor: '#C5A880' }}
          >
            {property.id}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-tight">
          {property.title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 text-xs mb-2">
          <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="truncate">{property.address.region}, {property.address.area}</span>
        </div>
        
        {/* Price */}
        <div className="text-lg font-bold mb-2" style={{ color: '#C5A880' }}>
          {formatPrice(property.price)}
        </div>
        
        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-1 text-xs text-gray-600 mb-2">
          <div className="text-center">
            <div className="font-medium">{property.rooms}</div>
            <div>комн.</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{property.area.total}</div>
            <div>м²</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{formatDistance(property.distanceToSea)}</div>
            <div>до моря</div>
          </div>
        </div>
        
        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.features.slice(0, 2).map((feature, index) => (
            <span 
              key={index} 
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
          {property.features.length > 2 && (
            <span className="text-xs text-gray-500">
              +{property.features.length - 2}
            </span>
          )}
        </div>
        
        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelection(property.id);
          }}
          className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${
            isInSelection
              ? 'bg-cyprus-400 text-white hover:bg-cyprus-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isInSelection ? '✓ В подборке' : 'Добавить в подборку'}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
