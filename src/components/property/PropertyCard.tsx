
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Property, useProperty } from '@/context/PropertyContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Dumbbell, Store, School, Building, TreePine, Utensils, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PropertyCardProps {
  property: Property;
  showScore?: boolean;
}

export default function PropertyCard({ property, showScore = true }: PropertyCardProps) {
  const { saveProperty, unsaveProperty, savedProperties } = useProperty();
  const [isSaved, setIsSaved] = useState(
    savedProperties.some(p => p.id === property.id)
  );
  const { toast } = useToast();

  const handleSave = () => {
    if (isSaved) {
      unsaveProperty(property.id);
      setIsSaved(false);
      toast({
        title: "Property removed",
        description: "Property has been removed from your saved list.",
      });
    } else {
      saveProperty(property.id);
      setIsSaved(true);
      toast({
        title: "Property saved",
        description: "Property has been added to your saved list.",
      });
    }
  };

  const getCompatibilityClass = () => {
    if (!property.compatibilityScore) return 'compatibility-badge-medium';
    
    if (property.compatibilityScore >= 80) {
      return 'compatibility-badge-high';
    } else if (property.compatibilityScore >= 50) {
      return 'compatibility-badge-medium';
    } else {
      return 'compatibility-badge-low';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get facility icons
  const getFacilityIcons = () => {
    const icons = [];
    
    if (property.nearbyFacilities.gym) {
      icons.push({
        icon: <Dumbbell key="gym" className="h-4 w-4 text-muted-foreground" />,
        label: "Gym Nearby"
      });
    }
    
    if (property.nearbyFacilities.market) {
      icons.push({
        icon: <Store key="market" className="h-4 w-4 text-muted-foreground" />,
        label: "Market Nearby"
      });
    }
    
    if (property.nearbyFacilities.school) {
      icons.push({
        icon: <School key="school" className="h-4 w-4 text-muted-foreground" />,
        label: "School Nearby"
      });
    }
    
    if (property.nearbyFacilities.hospital) {
      icons.push({
        icon: <Building key="hospital" className="h-4 w-4 text-muted-foreground" />,
        label: "Hospital Nearby"
      });
    }
    
    if (property.nearbyFacilities.park) {
      icons.push({
        icon: <TreePine key="park" className="h-4 w-4 text-muted-foreground" />,
        label: "Park Nearby"
      });
    }
    
    if (property.nearbyFacilities.restaurant) {
      icons.push({
        icon: <Utensils key="restaurant" className="h-4 w-4 text-muted-foreground" />,
        label: "Restaurant Nearby"
      });
    }
    
    if (property.nearbyFacilities.metroStation) {
      icons.push({
        icon: <Train key="metroStation" className="h-4 w-4 text-muted-foreground" />,
        label: "Metro Station Nearby"
      });
    }
    
    return icons;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={property.images[0] || '/placeholder.svg'}
            alt={property.title}
            className="object-cover w-full h-full rounded-t-md"
          />
        </AspectRatio>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90",
            isSaved && "text-rose-500 hover:text-rose-600"
          )}
          onClick={handleSave}
        >
          <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
        </Button>
        
        {showScore && property.compatibilityScore !== undefined && (
          <div className="absolute bottom-2 left-2">
            <span className={cn("compatibility-badge", getCompatibilityClass())}>
              {property.compatibilityScore}% Match
            </span>
          </div>
        )}
      </div>

      <CardHeader className="py-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{property.title}</CardTitle>
        </div>
        <CardDescription className="mt-1 flex items-center">
          <Badge variant="outline" className="mr-2">
            {property.propertyType}
          </Badge>
          <span className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {property.location}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="py-2 flex-grow">
        <div className="grid grid-cols-3 gap-2 text-sm mb-3">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Beds</span>
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Baths</span>
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Area</span>
            <span className="font-medium">{property.area} ft²</span>
          </div>
        </div>
        
        {/* Nearby facilities icons */}
        <div className="flex flex-wrap gap-2 mb-1">
          <TooltipProvider>
            {getFacilityIcons().map((item, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="cursor-help">
                    {item.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-2 pb-4">
        <div className="text-lg font-semibold">{formatPrice(property.price)}</div>
        <Link to={`/property/${property.id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
