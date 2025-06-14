
import { useState, useEffect } from 'react';
import { useProperty, Property } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import PropertyCard from './PropertyCard';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PropertyListProps {
  showScores?: boolean;
  savedOnly?: boolean;
}

export default function PropertyList({ showScores = true, savedOnly = false }: PropertyListProps) {
  const { properties, savedProperties, loading, filteredProperties } = useProperty();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'match' | 'recent'>('match');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>([]);

  // Get properties based on filters
  useEffect(() => {
    const baseProperties = savedOnly ? savedProperties : 
      locationFilter !== 'all' ? filteredProperties(locationFilter) : properties;
    
    // Apply search filter
    const filtered = baseProperties.filter(property => {
      const searchLower = searchQuery.toLowerCase();
      return (
        property.title.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.location.toLowerCase().includes(searchLower) ||
        property.propertyType.toLowerCase().includes(searchLower)
      );
    });

    // Apply sorting
    const sorted = [...filtered].sort((a: Property, b: Property) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'match':
          return (b.compatibilityScore || 0) - (a.compatibilityScore || 0);
        case 'recent':
          return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
        default:
          return 0;
      }
    });

    setDisplayedProperties(sorted);
  }, [properties, savedProperties, searchQuery, sortBy, locationFilter, savedOnly, filteredProperties]);

  // Get unique locations for filter
  const locations = [...new Set(properties.map(p => p.location))].sort();

  // Set location from user preferences if available
  useEffect(() => {
    if (user?.preferences?.location && locationFilter === 'all') {
      setLocationFilter(user.preferences.location);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="md:w-48">
          <Select value={locationFilter} onValueChange={setLocationFilter}>
            <SelectTrigger>
              <div className="flex items-center">
                {locationFilter !== 'all' && <MapPin className="h-4 w-4 mr-2" />}
                <SelectValue placeholder="Filter by location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:w-48">
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                {showScores && (
                  <SelectItem value="match">Highest Match</SelectItem>
                )}
                <SelectItem value="recent">Recently Added</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayedProperties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold">No properties found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search filters or check back later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              showScore={showScores}
            />
          ))}
        </div>
      )}
    </div>
  );
}
