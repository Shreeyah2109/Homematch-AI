import { Property } from '@/context/PropertyContext';

// Interface matching your Kaggle dataset structure
export interface KagglePropertyData {
  Name: string;
  Total_Area: number;
  Price_per_SQFT: number;
  Description: string;
  Baths: number;
  hasBalcony: boolean;
  city: string;
  suburb: string;
  price: number;
  'Bed Rooms': number;
  'Room Type': string;
  'Property Type': string;
}

// Transform Kaggle data to our Property interface
export function transformKaggleToProperty(kaggleData: KagglePropertyData[], startId: number = 1): Property[] {
  return kaggleData.map((item, index) => {
    const property: Property = {
      id: (startId + index).toString(),
      title: item.Name || `${item['Property Type']} in ${item.city}`,
      description: item.Description || `A beautiful ${item['Property Type']} in ${item.suburb}, ${item.city}`,
      price: item.price,
      location: item.city,
      propertyType: normalizePropertyType(item['Property Type']),
      bedrooms: item['Bed Rooms'] || 0,
      bathrooms: item.Baths || 1,
      area: item.Total_Area,
      images: generateDefaultImages(item['Property Type']),
      features: generateFeatures(item),
      listed: true,
      listedAt: new Date(),
      nearbyFacilities: generateRandomFacilities()
    };

    return property;
  });
}

// Normalize property types to match our system
function normalizePropertyType(type: string): string {
  const typeMap: { [key: string]: string } = {
    'apartment': 'Apartment',
    'flat': 'Apartment',
    'house': 'House',
    'villa': 'Villa',
    'bungalow': 'House',
    'penthouse': 'Penthouse',
    'studio': 'Studio',
    'commercial': 'Commercial',
    'office': 'Commercial'
  };

  const normalized = type.toLowerCase();
  return typeMap[normalized] || 'Apartment';
}

// Generate default images based on property type
function generateDefaultImages(propertyType: string): string[] {
  const imageMap: { [key: string]: string } = {
    'apartment': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    'house': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    'villa': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    'studio': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
    'penthouse': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
  };

  const type = propertyType.toLowerCase();
  return [imageMap[type] || imageMap['apartment']];
}

// Generate features based on dataset properties
function generateFeatures(item: KagglePropertyData): string[] {
  const features: string[] = [];
  
  if (item.hasBalcony) features.push('Balcony');
  if (item.Total_Area > 1500) features.push('Spacious');
  if (item.Baths >= 2) features.push('Multiple bathrooms');
  if (item['Bed Rooms'] >= 3) features.push('Family-friendly');
  
  // Add common features for Indian properties
  features.push('Power backup', 'Security', 'Parking');
  
  return features;
}

// Generate random nearby facilities (you can enhance this based on actual data)
function generateRandomFacilities() {
  return {
    gym: Math.random() > 0.6,
    market: Math.random() > 0.3,
    school: Math.random() > 0.5,
    hospital: Math.random() > 0.7,
    park: Math.random() > 0.5,
    restaurant: Math.random() > 0.4,
    metroStation: Math.random() > 0.6
  };
}

// Load and process CSV data (you'll need to call this with your actual CSV data)
export async function loadKaggleDataset(csvData: KagglePropertyData[]): Promise<Property[]> {
  console.log(`Processing ${csvData.length} properties from Kaggle dataset`);
  return transformKaggleToProperty(csvData);
}
