
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProperty, Property } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { Heart, ArrowLeft, MapPin, Calendar, Check, X, Dumbbell, Store, School, Building, TreePine, Utensils, Train } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';

export default function PropertyDetail() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { getPropertyById, savedProperties, saveProperty, unsaveProperty } = useProperty();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (propertyId) {
      const foundProperty = getPropertyById(propertyId);
      if (foundProperty) {
        setProperty(foundProperty);
        setIsSaved(savedProperties.some(p => p.id === propertyId));
      } else {
        // Property not found
        navigate('/properties', { replace: true });
      }
    }
    setLoading(false);
  }, [propertyId, getPropertyById, savedProperties, navigate]);

  if (loading || !property) {
    return (
      <Layout>
        <div className="container mx-auto py-12 flex justify-center">
          <Spinner size="lg" />
        </div>
      </Layout>
    );
  }

  const handleSaveToggle = () => {
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
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

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link to="/properties" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {user && property.compatibilityScore !== undefined && (
                <span className={cn("compatibility-badge", getCompatibilityClass())}>
                  {property.compatibilityScore}% Match
                </span>
              )}
              
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full",
                  isSaved && "text-rose-500 hover:text-rose-600"
                )}
                onClick={handleSaveToggle}
              >
                <Heart className={cn("h-5 w-5", isSaved && "fill-current")} />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={property.images[0] || '/placeholder.svg'}
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
              
              <CardContent className="py-6">
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-2">Property Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-muted/50 p-3 rounded-md text-center">
                      <p className="text-muted-foreground text-sm">Price</p>
                      <p className="font-semibold">{formatPrice(property.price)}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-center">
                      <p className="text-muted-foreground text-sm">Type</p>
                      <p className="font-semibold">{property.propertyType}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-center">
                      <p className="text-muted-foreground text-sm">Bedrooms</p>
                      <p className="font-semibold">{property.bedrooms}</p>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-md text-center">
                      <p className="text-muted-foreground text-sm">Bathrooms</p>
                      <p className="font-semibold">{property.bathrooms}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{property.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, index) => (
                        <Badge key={index} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Summary</CardTitle>
                <CardDescription>
                  Key information about this property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">{formatPrice(property.price)}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Property Type</span>
                  <span>{property.propertyType}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Area</span>
                  <span>{property.area} sq ft</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Bedrooms</span>
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Bathrooms</span>
                  <span>{property.bathrooms}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Listed</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{formatDate(property.listedAt)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveToggle} className="w-full">
                  {isSaved ? 'Remove from Saved' : 'Save Property'}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link to="/properties">
                  View More Properties
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
