
// This file provides an interface for mock database operations
// in a browser environment where real MongoDB connections aren't possible

// Types for users and properties
export interface UserData {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  password?: string; // Only used for authentication, not stored in state
  role: 'user' | 'admin';
  preferences?: {
    location: string;
    budget: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    facilities?: {
      gym?: boolean;
      market?: boolean;
      school?: boolean;
      hospital?: boolean;
      park?: boolean;
      restaurant?: boolean;
      metroStation?: boolean;
    }
  };
  createdAt?: Date;
}

export interface PropertyData {
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
}

// Configuration information
export const MONGODB_CONFIG = {
  dbName: "propertyMatchDB",
  collections: {
    users: "users",
    properties: "properties"
  }
};

// Initial data
const initialUsers: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'user@example.com',
    password: 'password', // In real app, this would be hashed
    role: 'user',
    preferences: {
      location: 'Mumbai',
      budget: 5000000,
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      facilities: {
        gym: true,
        market: true,
        school: false,
        hospital: false,
        park: true,
        restaurant: false,
        metroStation: true
      }
    },
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password', // In real app, this would be hashed
    role: 'admin',
    createdAt: new Date()
  }
];

const initialProperties: PropertyData[] = [
  {
    id: '1',
    title: 'Luxury Apartment with Sea View',
    description: 'A beautiful luxury apartment with stunning sea views in the heart of Mumbai.',
    price: 8500000,
    location: 'Mumbai',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    images: ['apartment1.jpg', 'apartment2.jpg'],
    features: ['Sea View', 'Swimming Pool', 'Gym'],
    listed: true,
    listedAt: new Date(),
    nearbyFacilities: {
      gym: true,
      market: true,
      park: true,
      restaurant: true,
      metroStation: true
    }
  },
  {
    id: '2',
    title: 'Modern Villa in Delhi',
    description: 'Spacious modern villa in a quiet neighborhood in Delhi.',
    price: 12000000,
    location: 'Delhi',
    propertyType: 'Villa',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: ['villa1.jpg', 'villa2.jpg'],
    features: ['Garden', 'Parking', 'Security'],
    listed: true,
    listedAt: new Date(),
    nearbyFacilities: {
      school: true,
      hospital: true,
      park: true,
      restaurant: true
    }
  }
];

// In-memory database collections
class MockDatabase {
  private users: UserData[];
  private properties: PropertyData[];

  constructor() {
    // Initialize with mock data
    this.users = [...initialUsers];
    this.properties = [...initialProperties];
    console.log('MockDatabase initialized with', this.users.length, 'users and', this.properties.length, 'properties');
  }

  // User operations
  async findUserByEmail(email: string): Promise<UserData | null> {
    console.log(`Looking for user with email: ${email}`);
    return this.users.find(u => u.email === email) || null;
  }

  async findUserById(id: string): Promise<UserData | null> {
    console.log(`Looking for user with id: ${id}`);
    return this.users.find(u => u.id === id) || null;
  }

  async createUser(userData: UserData): Promise<UserData> {
    console.log('Creating new user:', userData.email);
    
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async updateUserPreferences(userId: string, preferences: any): Promise<UserData | null> {
    console.log(`Updating preferences for user: ${userId}`);
    
    const userIndex = this.users.findIndex(u => u.id === userId);
    if (userIndex === -1) return null;
    
    this.users[userIndex] = {
      ...this.users[userIndex],
      preferences
    };
    
    // Return user without password
    const { password, ...userWithoutPassword } = this.users[userIndex];
    return userWithoutPassword;
  }

  // Property operations
  async getAllProperties(): Promise<PropertyData[]> {
    return this.properties;
  }

  async getPropertyById(id: string): Promise<PropertyData | null> {
    return this.properties.find(p => p.id === id) || null;
  }

  async getPropertiesByLocation(location: string): Promise<PropertyData[]> {
    return this.properties.filter(p => p.location === location);
  }

  async createProperty(propertyData: Omit<PropertyData, 'id'>): Promise<PropertyData> {
    const newProperty = {
      ...propertyData,
      id: Math.random().toString(36).substr(2, 9)
    } as PropertyData;
    
    this.properties.push(newProperty);
    return newProperty;
  }

  async updateProperty(id: string, propertyData: Partial<PropertyData>): Promise<PropertyData | null> {
    const propertyIndex = this.properties.findIndex(p => p.id === id);
    if (propertyIndex === -1) return null;
    
    this.properties[propertyIndex] = {
      ...this.properties[propertyIndex],
      ...propertyData
    };
    
    return this.properties[propertyIndex];
  }

  async deleteProperty(id: string): Promise<boolean> {
    const initialLength = this.properties.length;
    this.properties = this.properties.filter(p => p.id !== id);
    return this.properties.length < initialLength;
  }
}

// Create a singleton instance
const mockDB = new MockDatabase();

// Export public interface
export async function connectToDatabase(): Promise<boolean> {
  console.log('Mock database connection established');
  return true;
}

// User operations with mock data
export async function findUserByEmail(email: string): Promise<UserData | null> {
  return mockDB.findUserByEmail(email);
}

export async function findUserById(id: string): Promise<UserData | null> {
  return mockDB.findUserById(id);
}

export async function createUser(userData: UserData): Promise<UserData> {
  return mockDB.createUser(userData);
}

export async function updateUserPreferences(userId: string, preferences: any): Promise<UserData | null> {
  return mockDB.updateUserPreferences(userId, preferences);
}

// Property operations with mock data
export async function getAllProperties(): Promise<PropertyData[]> {
  return mockDB.getAllProperties();
}

export async function getPropertyById(id: string): Promise<PropertyData | null> {
  return mockDB.getPropertyById(id);
}

export async function getPropertiesByLocation(location: string): Promise<PropertyData[]> {
  return mockDB.getPropertiesByLocation(location);
}

export async function createProperty(propertyData: Omit<PropertyData, 'id'>): Promise<PropertyData> {
  return mockDB.createProperty(propertyData);
}

export async function updateProperty(id: string, propertyData: Partial<PropertyData>): Promise<PropertyData | null> {
  return mockDB.updateProperty(id, propertyData);
}

export async function deleteProperty(id: string): Promise<boolean> {
  return mockDB.deleteProperty(id);
}

// Get the cities array for filtering properties
export const getIndianCities = (): string[] => {
  return [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
    'Surat', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad',
    'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut',
    'Rajkot', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad',
    'Amritsar', 'Allahabad', 'Guwahati', 'Ranchi', 'Gwalior',
    'Chandigarh', 'Vijayawada', 'Jodhpur', 'Raipur', 'Kochi',
    'Shimla', 'Goa', 'Dehradun', 'Mysuru', 'Puducherry'
  ];
};

// ML model integration info (for documentation)
export const ML_MODEL_CONFIG = {
  modelPath: "/src/ml/models/",
  defaultModel: "compatibility_model.json",
  // In a real app, MLService would load this model and use it for predictions
};

// Automatically connect to mock database when module is loaded
connectToDatabase().then(() => {
  console.log('Mock database ready');
}).catch(error => {
  console.error('Failed to connect to mock database', error);
});
