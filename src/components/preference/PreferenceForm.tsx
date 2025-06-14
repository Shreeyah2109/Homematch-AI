
import { useState } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { getIndianCities } from '@/utils/mongodb';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPin, School, Store, Dumbbell, Building, TreePine, Utensils, Train } from 'lucide-react';

interface FacilityOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PreferenceFormProps {
  onSaved?: () => void;
}

export default function PreferenceForm({ onSaved }: PreferenceFormProps) {
  const { user, updateUserPreferences } = useAuth();
  const { toast } = useToast();

  const facilityOptions: FacilityOption[] = [
    { id: 'gym', label: 'Gym', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'market', label: 'Market', icon: <Store className="h-4 w-4" /> },
    { id: 'school', label: 'School', icon: <School className="h-4 w-4" /> },
    { id: 'hospital', label: 'Hospital', icon: <Building className="h-4 w-4" /> },
    { id: 'park', label: 'Park', icon: <TreePine className="h-4 w-4" /> },
    { id: 'restaurant', label: 'Restaurant', icon: <Utensils className="h-4 w-4" /> },
    { id: 'metroStation', label: 'Metro Station', icon: <Train className="h-4 w-4" /> },
  ];

  const [preferences, setPreferences] = useState<Required<User>['preferences']>(
    user?.preferences || {
      location: '',
      budget: 0,
      propertyType: '',
      bedrooms: 0,
      bathrooms: 0,
      facilities: {
        gym: false,
        market: false,
        school: false,
        hospital: false,
        park: false,
        restaurant: false,
        metroStation: false
      }
    }
  );

  const handleChange = (field: keyof typeof preferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFacilityChange = (facilityId: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facilityId]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPreferences(preferences);
    
    toast({
      title: "Preferences saved",
      description: "Your property preferences have been updated.",
    });
    
    if (onSaved) {
      onSaved();
    }
  };

  // Get Indian cities list from utility
  const indianCities = getIndianCities();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Preferences</CardTitle>
        <CardDescription>
          Tell us what you're looking for and we'll help you find the perfect property match.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Preferred Location</Label>
              <Select 
                value={preferences.location || "select-city"}
                onValueChange={(value) => handleChange('location', value === "select-city" ? "" : value)}
              >
                <SelectTrigger id="location" className="w-full">
                  <div className="flex items-center">
                    {preferences.location && <MapPin className="h-4 w-4 mr-2" />}
                    <SelectValue placeholder="Select a city" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select-city">Select a city</SelectItem>
                    {indianCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹)</Label>
              <Input
                id="budget"
                type="number"
                min="0"
                value={preferences.budget || ''}
                onChange={(e) => handleChange('budget', Number(e.target.value))}
                placeholder="Maximum budget"
              />
            </div>
                
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={preferences.propertyType || "select-type"} 
                onValueChange={(value) => handleChange('propertyType', value === "select-type" ? "" : value)}
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select-type">Select property type</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Cabin">Cottage/Cabin</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={preferences.bedrooms ? preferences.bedrooms.toString() : "select-bedrooms"}
                onValueChange={(value) => handleChange('bedrooms', value === "select-bedrooms" ? 0 : Number(value))}
              >
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Number of bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select-bedrooms">Select bedrooms</SelectItem>
                    <SelectItem value="0">Studio</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4 Bedrooms</SelectItem>
                    <SelectItem value="5">5+ Bedrooms</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select
                value={preferences.bathrooms ? preferences.bathrooms.toString() : "select-bathrooms"}
                onValueChange={(value) => handleChange('bathrooms', value === "select-bathrooms" ? 0 : Number(value))}
              >
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Number of bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select-bathrooms">Select bathrooms</SelectItem>
                    <SelectItem value="1">1 Bathroom</SelectItem>
                    <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                    <SelectItem value="2">2 Bathrooms</SelectItem>
                    <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                    <SelectItem value="3">3 Bathrooms</SelectItem>
                    <SelectItem value="3.5">3.5+ Bathrooms</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <Label>Nearby Facilities</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {facilityOptions.map((facility) => (
                <div key={facility.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={facility.id}
                    checked={preferences.facilities?.[facility.id] || false}
                    onCheckedChange={(checked) => 
                      handleFacilityChange(facility.id, checked === true)
                    }
                  />
                  <Label 
                    htmlFor={facility.id}
                    className="flex items-center cursor-pointer"
                  >
                    <span className="mr-2">{facility.icon}</span>
                    {facility.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full">Save Preferences</Button>
        </form>
      </CardContent>
    </Card>
  );
}
