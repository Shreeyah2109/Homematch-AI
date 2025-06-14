import { UserPreferences } from '@/context/AuthContext';
import { Property } from '@/context/PropertyContext';

// Enhanced ML Service for real Indian property data integration
class MLService {
  private model: any = null;
  private isModelLoaded = false;

  // INTEGRATION POINT: Load ML models
  private async loadModel() {
    if (this.isModelLoaded) return this.model;

    try {
      // OPTION 1: TensorFlow.js integration (uncomment when you have trained models)
      // import * as tf from '@tensorflow/tfjs';
      // this.model = await tf.loadLayersModel('/src/ml/models/property_compatibility_model.json');
      
      // OPTION 2: For custom ML models or ONNX models
      // const modelResponse = await fetch('/src/ml/models/property_model.onnx');
      // this.model = await modelResponse.arrayBuffer();
      
      // OPTION 3: Hugging Face Transformers (for NLP-based property matching)
      // import { pipeline } from '@huggingface/transformers';
      // this.model = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
      
      console.log('ML model loading simulated - replace with actual model loading');
      this.isModelLoaded = true;
      return this.model;
    } catch (error) {
      console.error('Failed to load ML model:', error);
      return null;
    }
  }

  // Enhanced compatibility scoring for Indian property dataset
  async calculateCompatibilityScore(
    property: Property,
    preferences: UserPreferences
  ): Promise<number> {
    await this.loadModel();

    // Extract features from real dataset
    const features = this.extractRealDatasetFeatures(property, preferences);
    
    // Use enhanced rule-based scoring optimized for Indian market
    return this.calculateEnhancedRuleBasedScore(property, preferences, features);
  }

  // Feature extraction optimized for your Kaggle dataset structure
  private extractRealDatasetFeatures(property: Property, preferences: UserPreferences): number[] {
    const features: number[] = [];
    
    // Price per sq ft analysis (important for Indian market)
    const pricePerSqft = property.price / property.area;
    const avgPricePerSqft = this.getAvgPricePerSqftForCity(property.location);
    const priceRatio = pricePerSqft / avgPricePerSqft;
    features.push(Math.min(priceRatio, 3.0)); // Cap at 3x average
    
    // Location compatibility (city-based)
    const locationScore = this.getCityCompatibility(property.location, preferences.location);
    features.push(locationScore);
    
    // Size efficiency (area vs bedrooms)
    const areaPerBedroom = property.bedrooms > 0 ? property.area / property.bedrooms : property.area;
    features.push(Math.min(areaPerBedroom / 500, 2.0)); // Normalize to reasonable range
    
    // Budget alignment
    const budgetRatio = Math.abs(property.price - preferences.budget) / preferences.budget;
    features.push(Math.max(0, 1 - budgetRatio)); // Closer to budget = higher score
    
    // Property characteristics match
    features.push(
      property.bedrooms / 5.0,
      property.bathrooms / 4.0,
      property.area / 3000.0
    );
    
    return features;
  }

  // Enhanced rule-based scoring for Indian dataset
  private calculateEnhancedRuleBasedScore(property: Property, preferences: UserPreferences, features: number[]): number {
    let score = 0;
    let totalWeight = 0;

    // City/Location match (30% weight - very important in India)
    totalWeight += 30;
    const cityScore = this.getCityCompatibility(property.location, preferences.location);
    score += cityScore * 30;

    // Budget compatibility (25% weight)
    totalWeight += 25;
    const budgetDiff = Math.abs(property.price - preferences.budget) / preferences.budget;
    if (budgetDiff <= 0.05) score += 25; // Within 5%
    else if (budgetDiff <= 0.15) score += 20; // Within 15%
    else if (budgetDiff <= 0.30) score += 15; // Within 30%
    else if (budgetDiff <= 0.50) score += 8; // Within 50%

    // Property type match (15% weight)
    totalWeight += 15;
    if (property.propertyType.toLowerCase() === preferences.propertyType.toLowerCase()) {
      score += 15;
    } else if (this.isCompatiblePropertyType(property.propertyType, preferences.propertyType)) {
      score += 10; // Partial match for similar types
    }

    // Size compatibility (15% weight)
    totalWeight += 15;
    const bedroomScore = this.calculateBedroomScore(property.bedrooms, preferences.bedrooms);
    const bathroomScore = this.calculateBathroomScore(property.bathrooms, preferences.bathrooms);
    score += (bedroomScore + bathroomScore) * 7.5;

    // Facilities and amenities (15% weight)
    totalWeight += 15;
    const facilityScore = this.calculateFacilityCompatibility(property, preferences);
    score += facilityScore * 15;

    return Math.max(0, Math.min(100, Math.round((score / totalWeight) * 100)));
  }

  // City compatibility for Indian metros
  private getCityCompatibility(propertyCity: string, preferredCity: string): number {
    if (propertyCity.toLowerCase() === preferredCity.toLowerCase()) return 1.0;
    
    // Indian metro area clusters
    const metroGroups = {
      'mumbai': ['mumbai', 'thane', 'navi mumbai', 'kalyan', 'pune'],
      'delhi': ['delhi', 'new delhi', 'gurgaon', 'noida', 'faridabad', 'ghaziabad'],
      'bangalore': ['bangalore', 'bengaluru', 'whitefield', 'electronic city'],
      'chennai': ['chennai', 'omr', 'tambaram', 'velachery'],
      'hyderabad': ['hyderabad', 'secunderabad', 'gachibowli', 'hitec city'],
      'kolkata': ['kolkata', 'calcutta', 'howrah', 'salt lake']
    };
    
    for (const [metro, cities] of Object.entries(metroGroups)) {
      if (cities.includes(propertyCity.toLowerCase()) && cities.includes(preferredCity.toLowerCase())) {
        return 0.8; // High compatibility within metro area
      }
    }
    
    return 0.1; // Low compatibility for different regions
  }

  // Average price per sq ft by city (you can update these with real data)
  private getAvgPricePerSqftForCity(city: string): number {
    const cityPrices: { [key: string]: number } = {
      'mumbai': 20000,
      'delhi': 15000,
      'bangalore': 8000,
      'pune': 7000,
      'chennai': 6000,
      'hyderabad': 5500,
      'kolkata': 4500,
      'ahmedabad': 4000
    };
    
    return cityPrices[city.toLowerCase()] || 6000; // Default average
  }

  // Property type compatibility
  private isCompatiblePropertyType(propertyType: string, preferredType: string): boolean {
    const compatibleTypes: { [key: string]: string[] } = {
      'apartment': ['flat', 'condo'],
      'house': ['villa', 'bungalow'],
      'villa': ['house', 'bungalow'],
      'studio': ['apartment', 'flat']
    };
    
    const compatible = compatibleTypes[preferredType.toLowerCase()] || [];
    return compatible.includes(propertyType.toLowerCase());
  }

  // Bedroom scoring
  private calculateBedroomScore(propertyBedrooms: number, preferredBedrooms: number): number {
    const diff = Math.abs(propertyBedrooms - preferredBedrooms);
    if (diff === 0) return 1.0;
    if (diff === 1) return 0.7;
    if (diff === 2) return 0.4;
    return 0.1;
  }

  // Bathroom scoring
  private calculateBathroomScore(propertyBathrooms: number, preferredBathrooms: number): number {
    const diff = Math.abs(propertyBathrooms - preferredBathrooms);
    if (diff === 0) return 1.0;
    if (diff <= 0.5) return 0.8;
    if (diff === 1) return 0.6;
    return 0.3;
  }

  // Enhanced facility compatibility for Indian preferences
  private calculateFacilityCompatibility(property: Property, preferences: UserPreferences): number {
    if (!preferences.facilities || !property.nearbyFacilities) return 0.5;
    
    let totalWeight = 0;
    let matchedWeight = 0;
    
    // Indian-specific facility weights
    const facilityWeights = {
      metroStation: 0.25,  // Very important in Indian cities
      school: 0.20,        // Important for families
      hospital: 0.20,      // Healthcare access
      market: 0.15,        // Daily shopping
      gym: 0.10,           // Lifestyle
      park: 0.10          // Recreation
    };
    
    for (const [facility, weight] of Object.entries(facilityWeights)) {
      if (preferences.facilities[facility]) {
        totalWeight += weight;
        if (property.nearbyFacilities[facility]) {
          matchedWeight += weight;
        }
      }
    }
    
    return totalWeight > 0 ? matchedWeight / totalWeight : 0.5;
  }

  // UTILITY METHODS for future ML integration

  // Generate property embeddings for semantic matching
  async getPropertyEmbedding(property: Property): Promise<number[]> {
    // This would use NLP models to create semantic embeddings
    // Example: Convert property description + features to embeddings
    // const text = `${property.title} ${property.description} ${property.features.join(' ')}`;
    // const embedding = await this.model.encode(text);
    // return embedding;
    
    return new Array(128).fill(0).map(() => Math.random()); // Mock embedding
  }

  // Generate user preference embeddings
  async getPreferenceEmbedding(preferences: UserPreferences): Promise<number[]> {
    // Convert user preferences to comparable embeddings
    return new Array(128).fill(0).map(() => Math.random()); // Mock embedding
  }

  // Calculate cosine similarity between embeddings
  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  // Real-time model retraining trigger
  async updateModelWithNewData(newPropertyData: any[], userFeedback: any[]): Promise<void> {
    // This would trigger model retraining with new data
    console.log('Model update triggered with new data points:', newPropertyData.length);
    // Implementation depends on your ML pipeline (TensorFlow.js, remote API, etc.)
  }
}

export const mlService = new MLService();
