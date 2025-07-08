
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth, User } from './AuthContext';

// Define the property type with additional fields for facilities
export type Property = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  features: string[];
  listed: boolean;
  compatibilityScore?: number;
  listedAt: Date;
  nearbyFacilities: {
    gym?: boolean;
    market?: boolean;
    school?: boolean;
    hospital?: boolean;
    park?: boolean;
    restaurant?: boolean;
    metroStation?: boolean;
  };
};

// Define the context type
type PropertyContextType = {
  properties: Property[];
  savedProperties: Property[];
  saveProperty: (propertyId: string) => void;
  unsaveProperty: (propertyId: string) => void;
  addProperty: (property: Omit<Property, 'id' | 'compatibilityScore'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
  getPropertyById: (propertyId: string) => Property | undefined;
  loading: boolean;
  filteredProperties: (location?: string) => Property[];
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

// Mock property data with Indian locations and facilities
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Apartment in South Mumbai',
    description: 'A beautiful modern apartment in South Mumbai with amazing city views.',
    price: 4500000,
    location: 'Mumbai',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    features: ['Hardwood floors', 'Modular kitchen', 'Balcony', 'Power backup'],
    listed: true,
    listedAt: new Date('2023-05-10'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '2',
    title: 'Spacious Villa in Gurugram',
    description: 'A large family villa in a secure gated community in Gurugram with modern amenities.',
    price: 12500000,
    location: 'Delhi',
    propertyType: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Large backyard', 'Swimming pool', 'Attached garage', 'Smart home system'],
    listed: true,
    listedAt: new Date('2023-06-15'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: false,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '3',
    title: 'Cozy Studio Apartment in Bangalore',
    description: 'A cozy studio apartment perfect for IT professionals in the heart of Bangalore.',
    price: 2200000,
    location: 'Bangalore',
    propertyType: 'Studio',
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0dWRpbyUyMGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Kitchen nook', 'Walk-in closet', 'Pet-friendly'],
    listed: true,
    listedAt: new Date('2023-07-20'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: false,
      park: false,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '4',
    title: 'Luxury Penthouse in Delhi',
    description: 'A stunning luxury penthouse with panoramic city views and high-end finishes in Delhi.',
    price: 22000000,
    location: 'Delhi',
    propertyType: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    area: 3000,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bHV4dXJ5JTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Rooftop terrace', 'Private elevator', 'Floor-to-ceiling windows', 'Smart home system'],
    listed: true,
    listedAt: new Date('2023-03-05'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '5',
    title: 'Garden Cottage in Shimla',
    description: 'A charming cottage surrounded by nature, perfect for a peaceful getaway in Shimla.',
    price: 5800000,
    location: 'Shimla',
    propertyType: 'Cabin',
    bedrooms: 2,
    bathrooms: 1,
    area: 900,
    images: ['https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Wood-burning fireplace', 'Deck with mountain view', 'Hiking trails nearby'],
    listed: true,
    listedAt: new Date('2023-08-10'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: false,
      park: true,
      restaurant: false,
      metroStation: false
    }
  },
  {
    id: '6',
    title: 'Beachfront Villa in Goa',
    description: 'A beautiful beachfront villa with direct access to the beach in North Goa.',
    price: 18000000,
    location: 'Goa',
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Private beach access', 'Swimming pool', 'Outdoor kitchen', 'Garden'],
    listed: true,
    listedAt: new Date('2023-09-15'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: false,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '7',
    title: 'Modern Apartment in Pune',
    description: 'A sleek modern apartment in an upscale neighborhood of Pune with great amenities.',
    price: 4800000,
    location: 'Pune',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    features: ['Modular kitchen', 'Club house access', 'Reserved parking', '24x7 security'],
    listed: true,
    listedAt: new Date('2023-10-05'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: false
    }
  },
  // Adding more properties from different Indian cities
  {
    id: '8',
    title: 'Waterfront Luxury Home in Kochi',
    description: 'Exquisite waterfront property with panoramic views of the backwaters in Kerala.',
    price: 14500000,
    location: 'Kochi',
    propertyType: 'House',
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Waterfront view', 'Private dock', 'Infinity pool', 'Home theater', 'Smart home system'],
    listed: true,
    listedAt: new Date('2023-11-12'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '9',
    title: 'Colonial Heritage Home in Kolkata',
    description: 'Historic colonial-era home beautifully preserved with modern amenities in central Kolkata.',
    price: 8750000,
    location: 'Kolkata',
    propertyType: 'House',
    bedrooms: 3,
    bathrooms: 2,
    area: 2100,
    images: ['https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhpc3RvcmljJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Original hardwood floors', 'High ceilings', 'Period details', 'Modern kitchen', 'Garden'],
    listed: true,
    listedAt: new Date('2023-09-28'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '10',
    title: 'Tech Park Adjacent Condo in Hyderabad',
    description: 'Modern condominium steps away from HITEC City with premium amenities for IT professionals.',
    price: 6800000,
    location: 'Hyderabad',
    propertyType: 'Condo',
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    images: ['https://images.unsplash.com/photo-1551361415-69c87bd7d364?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29uZG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Balcony', '24/7 security', 'Co-working space', 'Fitness center', 'Party hall'],
    listed: true,
    listedAt: new Date('2023-10-15'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '11',
    title: 'Riverfront Apartment in Varanasi',
    description: 'Spiritual retreat with direct views of the Ganges River in the holy city of Varanasi.',
    price: 7500000,
    location: 'Varanasi',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    images: ['https://images.unsplash.com/photo-1580041065738-e72023775cdc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJpdmVyJTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    features: ['River view', 'Private ghats access', 'Meditation space', 'Traditional decor', 'Air conditioning'],
    listed: true,
    listedAt: new Date('2023-08-21'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '12',
    title: 'Desert Oasis Retreat in Jaipur',
    description: 'Luxurious haveli-style home with traditional Rajasthani architecture and modern comforts.',
    price: 16800000,
    location: 'Jaipur',
    propertyType: 'House',
    bedrooms: 5,
    bathrooms: 4,
    area: 4500,
    images: ['https://images.unsplash.com/photo-1577003833619-76bbd7f82948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFqYXN0aGFuJTIwaG9tZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Courtyard with fountain', 'Rooftop terrace', 'Hand-painted murals', 'Private pool', 'Staff quarters'],
    listed: true,
    listedAt: new Date('2023-07-08'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '13',
    title: 'Hill Station Cottage in Mussoorie',
    description: 'Quaint cottage with breathtaking Himalayan views in the popular hill station of Mussoorie.',
    price: 9200000,
    location: 'Dehradun',
    propertyType: 'Cabin',
    bedrooms: 2,
    bathrooms: 1,
    area: 850,
    images: ['https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGlsbCUyMHN0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Mountain views', 'Stone fireplace', 'Wooden interiors', 'Garden', 'Hiking trails nearby'],
    listed: true,
    listedAt: new Date('2023-11-05'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: false,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '14',
    title: 'Commercial Space in Central Chennai',
    description: 'Prime commercial property in the heart of Chennai, perfect for office or retail space.',
    price: 28000000,
    location: 'Chennai',
    propertyType: 'Commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 2800,
    images: ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    features: ['Corner location', 'High foot traffic', 'Modern infrastructure', 'Parking space', '24/7 security'],
    listed: true,
    listedAt: new Date('2023-06-30'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '15',
    title: 'Luxury Golf Course Villa in Ahmedabad',
    description: 'Exclusive villa with direct access to an 18-hole golf course in prestigious Ahmedabad neighborhood.',
    price: 35000000,
    location: 'Ahmedabad',
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 4.5,
    area: 5200,
    images: ['/images/Ahmedabad.webp'],
    features: ['Golf course views', 'Private pool', 'Home automation', 'Home theater', 'Wine cellar', 'Outdoor kitchen'],
    listed: true,
    listedAt: new Date('2023-09-01'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '16',
    title: 'Skyline View Apartment in Mumbai',
    description: 'High-rise apartment in South Mumbai with a panoramic view of the city skyline.',
    price: 5200000,
    location: 'Mumbai',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1350,
    images: ['https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=60'],
    features: ['City view', 'Modern kitchen', 'Gated society', 'Power backup'],
    listed: true,
    listedAt: new Date('2023-12-01'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '17',
    title: 'Eco-Friendly Home in Gurugram',
    description: 'Sustainable 3BHK home in a quiet eco-society of Gurugram with solar and rainwater systems.',
    price: 9800000,
    location: 'Delhi',
    propertyType: 'House',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=60'],
    features: ['Solar panels', 'Rainwater harvesting', 'Greenhouse', 'Garden area'],
    listed: true,
    listedAt: new Date('2024-01-10'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: false,
      metroStation: true
    }
  },
  {
    id: '18',
    title: 'Smart Studio Apartment in Bangalore',
    description: 'Compact tech-enabled studio in Indiranagar, ideal for startup professionals.',
    price: 2500000,
    location: 'Bangalore',
    propertyType: 'Studio',
    bedrooms: 0,
    bathrooms: 1,
    area: 550,
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60'],
    features: ['Automated lighting', 'Remote locks', 'Fast internet', 'Furnished'],
    listed: true,
    listedAt: new Date('2023-11-18'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '19',
    title: 'Art Deco Penthouse in Delhi',
    description: 'Chic penthouse inspired by Art Deco design with cityscape views and a private lounge.',
    price: 21000000,
    location: 'Delhi',
    propertyType: 'Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=60'],
    features: ['Sky lounge', 'Designer interiors', 'Private bar', 'Automated blinds'],
    listed: true,
    listedAt: new Date('2024-02-12'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '20',
    title: 'Rustic Cottage in Shimla Hills',
    description: 'Beautiful rustic-themed wooden cottage nestled in apple orchards of Shimla.',
    price: 6300000,
    location: 'Shimla',
    propertyType: 'Cabin',
    bedrooms: 2,
    bathrooms: 1,
    area: 1000,
    images: ['https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=60'],
    features: ['Orchard view', 'Fireplace', 'Loft bedroom', 'Stone patio'],
    listed: true,
    listedAt: new Date('2023-12-20'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: false,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '21',
    title: 'Palm Grove Beach House in Goa',
    description: 'Contemporary villa a few steps from the beach, surrounded by palm trees in South Goa.',
    price: 19000000,
    location: 'Goa',
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 2000,
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60'],
    features: ['Deck', 'Tropical garden', 'Outdoor shower', 'Beach access'],
    listed: true,
    listedAt: new Date('2023-12-05'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: false,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '22',
    title: 'Elegant High-Rise in Pune',
    description: 'Elegant 3BHK apartment in Koregaon Park with club access and sky deck.',
    price: 5500000,
    location: 'Pune',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1300,
    images: ['https://images.unsplash.com/photo-1586105251261-72a756497a12?auto=format&fit=crop&w=800&q=60'],
    features: ['Sky deck', 'Modern finishes', 'Gym access', 'EV charging'],
    listed: true,
    listedAt: new Date('2024-01-25'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '23',
    title: 'Backwater View Villa in Kochi',
    description: 'Spacious luxury villa facing serene Kerala backwaters with lush green surroundings.',
    price: 15500000,
    location: 'Kochi',
    propertyType: 'Villa',
    bedrooms: 3,
    bathrooms: 3,
    area: 3000,
    images: ['https://images.unsplash.com/photo-1593967593064-f80dc889a5f2?auto=format&fit=crop&w=800&q=60'],
    features: ['Backwater deck', 'Indoor garden', 'Heritage design', 'Solar energy system'],
    listed: true,
    listedAt: new Date('2024-03-02'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '24',
    title: 'Vintage Bungalow in South Kolkata',
    description: 'A beautiful colonial-era bungalow with modern updates and private courtyard.',
    price: 9100000,
    location: 'Kolkata',
    propertyType: 'House',
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    images: ['https://images.unsplash.com/photo-1592595896551-12a3a444b8fc?auto=format&fit=crop&w=800&q=60'],
    features: ['Courtyard', 'Antique woodwork', 'Renovated kitchen', 'Veranda'],
    listed: true,
    listedAt: new Date('2024-02-22'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '25',
    title: 'Hitech Business Loft in Hyderabad',
    description: 'Premium loft-style property inside a commercial complex near Cyber Towers.',
    price: 7200000,
    location: 'Hyderabad',
    propertyType: 'Loft',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60'],
    features: ['Mezzanine level', 'Modern kitchen', 'Co-working lounge', 'Tech-integrated design'],
    listed: true,
    listedAt: new Date('2024-03-09'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: false,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '26',
    title: 'Temple View Flat in Varanasi',
    description: 'Spacious 2BHK with a peaceful view of Kashi Vishwanath temple spires.',
    price: 7800000,
    location: 'Varanasi',
    propertyType: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1150,
    images: ['https://images.unsplash.com/photo-1547809395-8e0b9f00113e?auto=format&fit=crop&w=800&q=60'],
    features: ['Temple view', 'Meditation balcony', 'Wooden decor', 'Air cooling'],
    listed: true,
    listedAt: new Date('2024-02-14'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: false,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '27',
    title: 'Palace-Inspired Home in Jaipur',
    description: 'Spacious 6BHK with Rajasthani pillars, arches and traditional aesthetics.',
    price: 18500000,
    location: 'Jaipur',
    propertyType: 'House',
    bedrooms: 6,
    bathrooms: 5,
    area: 4800,
    images: ['https://images.unsplash.com/photo-1618221378884-5e3db5b27cb3?auto=format&fit=crop&w=800&q=60'],
    features: ['Pillar hall', 'Indoor courtyard', 'Traditional kitchen', 'Guest suite'],
    listed: true,
    listedAt: new Date('2024-03-12'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '28',
    title: 'Valley View Home in Dehradun',
    description: 'Home in a quiet valley with open balconies and a lush garden.',
    price: 8900000,
    location: 'Dehradun',
    propertyType: 'House',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: ['https://images.unsplash.com/photo-1588850561783-41966d91d82c?auto=format&fit=crop&w=800&q=60'],
    features: ['Garden', 'View deck', 'Sloped roof', 'Modern wooden design'],
    listed: true,
    listedAt: new Date('2024-01-18'),
    nearbyFacilities: {
      gym: false,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  },
  {
    id: '29',
    title: 'Commercial Hub Office in Chennai',
    description: 'Fully furnished office space in a tech-commercial building in central Chennai.',
    price: 26500000,
    location: 'Chennai',
    propertyType: 'Commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 2600,
    images: ['https://images.unsplash.com/photo-1600585154205-6b2c6f179df8?auto=format&fit=crop&w=800&q=60'],
    features: ['Furnished cabins', 'Power backup', 'Pantry', 'Meeting rooms'],
    listed: true,
    listedAt: new Date('2024-03-05'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: false,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '30',
    title: 'Lakeside Retreat Villa in Ahmedabad',
    description: 'Premium villa overlooking a peaceful lake, ideal for weekend stays and work-from-home setup.',
    price: 33000000,
    location: 'Ahmedabad',
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 5,
    area: 5400,
    images: ['https://images.unsplash.com/photo-1597902502403-fbfa1962ad51?auto=format&fit=crop&w=800&q=60'],
    features: ['Lake view', 'Infinity pool', 'Outdoor deck', 'Smart lighting', 'Library'],
    listed: true,
    listedAt: new Date('2024-02-28'),
    nearbyFacilities: {
      gym: true,
      market: true,
      school: true,
      hospital: true,
      park: true,
      restaurant: true,
      metroStation: false
    }
  }
];

// Simple mock compatibility calculation function that includes facilities
const calculateCompatibilityScore = (property: Property, user: User): number => {
  if (!user.preferences) return 50; // Default score if no preferences
  
  let score = 0;
  let totalWeight = 0;
  
  // Location match (20% weight)
  totalWeight += 20;
  if (property.location === user.preferences.location) {
    score += 20;
  }
  
  // Budget match (20% weight)
  totalWeight += 20;
  const budgetDifference = Math.abs(property.price - user.preferences.budget);
  const budgetPercentage = budgetDifference / user.preferences.budget;
  if (budgetPercentage <= 0.1) { // Within 10%
    score += 20;
  } else if (budgetPercentage <= 0.2) { // Within 20%
    score += 15;
  } else if (budgetPercentage <= 0.3) { // Within 30%
    score += 10;
  }
  
  // Property type match (15% weight)
  totalWeight += 15;
  if (property.propertyType === user.preferences.propertyType) {
    score += 15;
  }
  
  // Bedrooms match (10% weight)
  totalWeight += 10;
  if (property.bedrooms === user.preferences.bedrooms) {
    score += 10;
  } else if (Math.abs(property.bedrooms - user.preferences.bedrooms) === 1) {
    score += 5;
  }
  
  // Bathrooms match (10% weight)
  totalWeight += 10;
  if (property.bathrooms === user.preferences.bathrooms) {
    score += 10;
  } else if (Math.abs(property.bathrooms - user.preferences.bathrooms) === 1) {
    score += 5;
  }
  
  // Facility preferences (25% weight total, 5% each)
  if (user.preferences.facilities) {
    // Calculate weights based on selected facilities
    let facilityWeightPerItem = 0;
    let selectedFacilitiesCount = 0;
    
    for (const facility in user.preferences.facilities) {
      if (user.preferences.facilities[facility]) {
        selectedFacilitiesCount++;
      }
    }
    
    if (selectedFacilitiesCount > 0) {
      facilityWeightPerItem = 25 / selectedFacilitiesCount;
      
      for (const facility in user.preferences.facilities) {
        if (user.preferences.facilities[facility] && property.nearbyFacilities[facility]) {
          score += facilityWeightPerItem;
          totalWeight += facilityWeightPerItem;
        } else if (user.preferences.facilities[facility]) {
          // Still count this in total weight even if property doesn't have it
          totalWeight += facilityWeightPerItem;
        }
      }
    }
  }
  
  // Calculate final percentage score
  return totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 50;
};

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties with compatibility scores when user changes
  useEffect(() => {
    setLoading(true);
    
    // Get saved property IDs from localStorage
    const savedIds = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    // Calculate compatibility scores if user has preferences
    const propertiesWithScores = mockProperties.map(property => {
      if (user?.preferences) {
        return {
          ...property,
          compatibilityScore: calculateCompatibilityScore(property, user)
        };
      }
      return property;
    });
    
    setProperties(propertiesWithScores);
    
    // Set saved properties
    const saved = propertiesWithScores.filter(property => savedIds.includes(property.id));
    setSavedProperties(saved);
    
    setLoading(false);
  }, [user]);

  const saveProperty = (propertyId: string) => {
    const property = properties.find(p => p.id === propertyId);
    if (property && !savedProperties.some(p => p.id === propertyId)) {
      const updated = [...savedProperties, property];
      setSavedProperties(updated);
      
      // Save to localStorage
      const savedIds = updated.map(p => p.id);
      localStorage.setItem('savedProperties', JSON.stringify(savedIds));
    }
  };

  const unsaveProperty = (propertyId: string) => {
    const updated = savedProperties.filter(p => p.id !== propertyId);
    setSavedProperties(updated);
    
    // Update localStorage
    const savedIds = updated.map(p => p.id);
    localStorage.setItem('savedProperties', JSON.stringify(savedIds));
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'compatibilityScore'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    if (user?.preferences) {
      newProperty.compatibilityScore = calculateCompatibilityScore(newProperty, user);
    }
    
    setProperties(prevProperties => [...prevProperties, newProperty]);
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === updatedProperty.id ? updatedProperty : property
      )
    );
    
    // Update in saved properties if it exists there
    if (savedProperties.some(p => p.id === updatedProperty.id)) {
      setSavedProperties(prevSaved => 
        prevSaved.map(property => 
          property.id === updatedProperty.id ? updatedProperty : property
        )
      );
    }
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(prevProperties => 
      prevProperties.filter(property => property.id !== propertyId)
    );
    
    // Remove from saved properties if it exists there
    if (savedProperties.some(p => p.id === propertyId)) {
      unsaveProperty(propertyId);
    }
  };

  const getPropertyById = (propertyId: string) => {
    return properties.find(property => property.id === propertyId);
  };

  // New function to filter properties by location
  const filteredProperties = (location?: string) => {
    if (!location) return properties;
    return properties.filter(property => property.location === location);
  };

  return (
    <PropertyContext.Provider 
      value={{ 
        properties, 
        savedProperties, 
        saveProperty, 
        unsaveProperty, 
        addProperty, 
        updateProperty, 
        deleteProperty, 
        getPropertyById,
        loading,
        filteredProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperty() {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}
