
import { useState } from 'react';
import { useProperty, Property } from '@/context/PropertyContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Separator } from "@/components/ui/separator";

interface PropertyFormProps {
  property?: Property;
  onSaved?: () => void;
}

export default function PropertyForm({ property, onSaved }: PropertyFormProps) {
  const { addProperty, updateProperty } = useProperty();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: property?.title || '',
    description: property?.description || '',
    price: property?.price || 0,
    location: property?.location || '',
    propertyType: property?.propertyType || '',
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    area: property?.area || 0,
    images: property?.images || [''],
    features: property?.features?.join(', ') || '',
    listed: property?.listed !== undefined ? property.listed : true,
    nearbyFacilities: property?.nearbyFacilities || {
      gym: false,
      market: false,
      school: false,
      hospital: false,
      park: false,
      restaurant: false,
      metroStation: false
    }
  });

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      nearbyFacilities: {
        ...prev.nearbyFacilities,
        [facility]: checked
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const propertyData = {
      ...formData,
      features: formData.features.split(',').map(feature => feature.trim()),
      listedAt: property?.listedAt || new Date()
    };
    
    if (property) {
      updateProperty({
        ...property,
        ...propertyData
      });
      toast({
        title: "Property updated",
        description: "The property has been successfully updated.",
      });
    } else {
      addProperty(propertyData);
      toast({
        title: "Property created",
        description: "A new property has been successfully created.",
      });
      
      // Reset form after adding new property
      setFormData({
        title: '',
        description: '',
        price: 0,
        location: '',
        propertyType: '',
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        images: [''],
        features: '',
        listed: true,
        nearbyFacilities: {
          gym: false,
          market: false,
          school: false,
          hospital: false,
          park: false,
          restaurant: false,
          metroStation: false
        }
      });
    }
    
    if (onSaved) {
      onSaved();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property ? 'Edit Property' : 'Add New Property'}</CardTitle>
        <CardDescription>
          {property
            ? 'Update the property information below.'
            : 'Fill in the details to create a new property listing.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Enter property title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter property description"
              rows={4}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price || ''}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                placeholder="Enter price"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City or neighborhood"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select 
                value={formData.propertyType} 
                onValueChange={(value) => handleChange('propertyType', value)}
                required
              >
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="House">House</SelectItem>
                    <SelectItem value="Studio">Studio</SelectItem>
                    <SelectItem value="Penthouse">Penthouse</SelectItem>
                    <SelectItem value="Cabin">Cabin</SelectItem>
                    <SelectItem value="Condo">Condo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select
                value={formData.bedrooms.toString()}
                onValueChange={(value) => handleChange('bedrooms', Number(value))}
                required
              >
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Number of bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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
                value={formData.bathrooms.toString()}
                onValueChange={(value) => handleChange('bathrooms', Number(value))}
                required
              >
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Number of bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
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
            
            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                type="number"
                min="0"
                value={formData.area || ''}
                onChange={(e) => handleChange('area', Number(e.target.value))}
                placeholder="Enter area in square feet"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.images[0] || ''}
                onChange={(e) => handleChange('images', [e.target.value])}
                placeholder="Enter image URL"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => handleChange('features', e.target.value)}
              placeholder="Enter features separated by commas"
              rows={2}
            />
          </div>
          
          <div className="space-y-4">
            <Label>Nearby Facilities</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gym" 
                  checked={formData.nearbyFacilities.gym}
                  onCheckedChange={(checked) => handleFacilityChange('gym', checked === true)}
                />
                <Label htmlFor="gym">Gym</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="market" 
                  checked={formData.nearbyFacilities.market}
                  onCheckedChange={(checked) => handleFacilityChange('market', checked === true)}
                />
                <Label htmlFor="market">Market</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="school" 
                  checked={formData.nearbyFacilities.school}
                  onCheckedChange={(checked) => handleFacilityChange('school', checked === true)}
                />
                <Label htmlFor="school">School</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hospital" 
                  checked={formData.nearbyFacilities.hospital}
                  onCheckedChange={(checked) => handleFacilityChange('hospital', checked === true)}
                />
                <Label htmlFor="hospital">Hospital</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="park" 
                  checked={formData.nearbyFacilities.park}
                  onCheckedChange={(checked) => handleFacilityChange('park', checked === true)}
                />
                <Label htmlFor="park">Park</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="restaurant" 
                  checked={formData.nearbyFacilities.restaurant}
                  onCheckedChange={(checked) => handleFacilityChange('restaurant', checked === true)}
                />
                <Label htmlFor="restaurant">Restaurant</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="metroStation" 
                  checked={formData.nearbyFacilities.metroStation}
                  onCheckedChange={(checked) => handleFacilityChange('metroStation', checked === true)}
                />
                <Label htmlFor="metroStation">Metro Station</Label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="submit">
              {property ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
