import { mlService } from './MLService';

interface ChatMessage {
  message: string;
  context?: {
    userId?: string;
    userPreferences?: any;
    currentPage?: string;
    availableProperties?: any[];
    totalProperties?: number;
  };
}

interface PropertyRecommendation {
  propertyId: string;
  compatibilityScore: number;
  reasoning: string[];
}

export class AIService {
  /**
   * Process chat messages and generate AI responses
   * Enhanced with property-specific intelligence
   */
  async processChatMessage(chatMessage: ChatMessage): Promise<string> {
    const { message, context } = chatMessage;
    
    try {
      // Enhanced response generation with property context
      const response = await this.generateResponse(message, context);
      return response;
    } catch (error) {
      console.error('Error processing chat message:', error);
      return "I'm sorry, I'm having trouble understanding your request. Could you please rephrase it?";
    }
  }

  /**
   * Get property recommendations based on chat context
   */
  async getPropertyRecommendations(
    userPreferences: any,
    limit: number = 5
  ): Promise<PropertyRecommendation[]> {
    try {
      const properties = await this.fetchProperties();
      const recommendations: PropertyRecommendation[] = [];

      for (const property of properties.slice(0, limit)) {
        const score = await mlService.calculateCompatibilityScore(property, userPreferences);
        const reasoning = this.generateReasoningForScore(userPreferences, property, score);
        
        recommendations.push({
          propertyId: property.id,
          compatibilityScore: score,
          reasoning
        });
      }

      return recommendations.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }

  /**
   * Enhanced response generation with property intelligence
   */
  private async generateResponse(message: string, context?: any): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    // Property search with specific criteria
    if (this.detectIntent(lowerMessage, ['find', 'search', 'looking for', 'want', 'need'])) {
      if (this.detectIntent(lowerMessage, ['apartment', 'flat', '2bhk', '3bhk', 'studio'])) {
        return this.handlePropertyTypeQuery(message, context);
      }
      if (this.detectIntent(lowerMessage, ['mumbai', 'delhi', 'bangalore', 'pune', 'chennai', 'hyderabad'])) {
        return this.handleLocationQuery(message, context);
      }
      if (this.detectIntent(lowerMessage, ['budget', 'price', 'cost', 'lakhs', 'crores'])) {
        return this.handleBudgetQuery(message, context);
      }
    }

    // Location-specific queries
    if (this.detectIntent(lowerMessage, ['mumbai', 'delhi', 'bangalore', 'pune', 'chennai', 'hyderabad', 'kolkata', 'ahmedabad'])) {
      const location = this.extractLocation(message);
      const properties = await this.getPropertiesByLocation(location);
      return `I found ${properties.length} properties in ${location}! The average price range is ₹${this.calculateAveragePrice(properties)} lakhs. Would you like me to show you the best matches based on your preferences?`;
    }

    // Facility-based queries
    if (this.detectIntent(lowerMessage, ['gym', 'metro', 'school', 'hospital', 'market', 'park'])) {
      return this.handleFacilityQuery(message, context);
    }

    // Comparison queries
    if (this.detectIntent(lowerMessage, ['compare', 'vs', 'difference', 'better'])) {
      return "I can help you compare properties! Please tell me which specific properties or areas you'd like to compare, and I'll analyze their compatibility scores, prices, and nearby facilities.";
    }

    // Investment advice
    if (this.detectIntent(lowerMessage, ['investment', 'roi', 'returns', 'appreciation'])) {
      return "Based on our AI analysis of market trends, areas like Pune IT corridors, Bangalore tech hubs, and emerging Mumbai suburbs show good investment potential. Would you like specific recommendations based on your budget?";
    }

    // Default intelligent response
    return this.getContextualResponse(message, context);
  }

  /**
   * Handle property type specific queries
   */
  private async handlePropertyTypeQuery(message: string, context?: any): Promise<string> {
    const propertyType = this.extractPropertyType(message);
    const properties = await this.getPropertiesByType(propertyType);
    
    return `I found ${properties.length} ${propertyType} properties! The price range varies from ₹${Math.min(...properties.map(p => p.price))/100000} to ₹${Math.max(...properties.map(p => p.price))/100000} lakhs. Would you like me to filter these based on your location preference?`;
  }

  /**
   * Handle location-specific queries
   */
  private async handleLocationQuery(message: string, context?: any): Promise<string> {
    const location = this.extractLocation(message);
    const properties = await this.getPropertiesByLocation(location);
    
    if (context?.userPreferences) {
      const matchedProperties = properties.filter(p => 
        this.matchesPreferences(p, context.userPreferences)
      ).slice(0, 3);
      
      return `Found ${matchedProperties.length} highly compatible properties in ${location}! The top match has ${matchedProperties[0]?.compatibilityScore || 85}% compatibility. Shall I show you the details?`;
    }
    
    return `${location} has ${properties.length} properties available. Popular areas include tech hubs with good connectivity. Would you like to set your preferences first for better recommendations?`;
  }

  /**
   * Handle budget-related queries
   */
  private async handleBudgetQuery(message: string, context?: any): Promise<string> {
    const budget = this.extractBudget(message);
    const properties = await this.getPropertiesInBudget(budget);
    
    return `Within your budget of ₹${budget/100000} lakhs, I found ${properties.length} properties across Mumbai, Pune, and Bangalore. The best value options are in emerging areas with excellent growth potential!`;
  }

  /**
   * Handle facility-based queries
   */
  private async handleFacilityQuery(message: string, context?: any): Promise<string> {
    const facilities = this.extractFacilities(message);
    const properties = await this.getPropertiesWithFacilities(facilities);
    
    return `Found ${properties.length} properties with ${facilities.join(', ')} nearby! Properties near metro stations typically have 15-20% higher appreciation rates. Would you like to see the top matches?`;
  }

  /**
   * Utility functions for data extraction
   */
  private extractLocation(message: string): string {
    const locations = ['mumbai', 'delhi', 'bangalore', 'pune', 'chennai', 'hyderabad', 'kolkata', 'ahmedabad'];
    const found = locations.find(loc => message.toLowerCase().includes(loc));
    return found ? found.charAt(0).toUpperCase() + found.slice(1) : 'Mumbai';
  }

  private extractPropertyType(message: string): string {
    if (message.includes('studio')) return 'Studio';
    if (message.includes('apartment') || message.includes('flat')) return 'Apartment';
    if (message.includes('villa')) return 'Villa';
    if (message.includes('house')) return 'House';
    return 'Apartment';
  }

  private extractBudget(message: string): number {
    const numbers = message.match(/\d+/g);
    if (numbers) {
      const num = parseInt(numbers[0]);
      if (message.includes('crore')) return num * 10000000;
      if (message.includes('lakh')) return num * 100000;
      return num * 100000; // Default to lakhs
    }
    return 5000000; // Default 50 lakhs
  }

  private extractFacilities(message: string): string[] {
    const facilities = ['gym', 'metro', 'school', 'hospital', 'market', 'park'];
    return facilities.filter(facility => message.toLowerCase().includes(facility));
  }

  /**
   * Enhanced property fetching methods
   */
  private async getPropertiesByLocation(location: string): Promise<any[]> {
    // This would connect to your property database/API
    // For now, returning mock data that matches the location
    const mockProperties = await this.fetchProperties();
    return mockProperties.filter(p => p.location === location);
  }

  private async getPropertiesByType(type: string): Promise<any[]> {
    const mockProperties = await this.fetchProperties();
    return mockProperties.filter(p => p.propertyType === type);
  }

  private async getPropertiesInBudget(budget: number): Promise<any[]> {
    const mockProperties = await this.fetchProperties();
    return mockProperties.filter(p => p.price <= budget * 1.2 && p.price >= budget * 0.8);
  }

  private async getPropertiesWithFacilities(facilities: string[]): Promise<any[]> {
    const mockProperties = await this.fetchProperties();
    return mockProperties.filter(p => 
      facilities.some(facility => p.nearbyFacilities?.[facility])
    );
  }

  private calculateAveragePrice(properties: any[]): string {
    if (properties.length === 0) return '50';
    const avg = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
    return (avg / 100000).toFixed(0);
  }

  private matchesPreferences(property: any, preferences: any): boolean {
    return property.location === preferences.location || 
           property.propertyType === preferences.propertyType ||
           Math.abs(property.price - preferences.budget) / preferences.budget < 0.3;
  }

  private getContextualResponse(message: string, context?: any): string {
    if (context?.userPreferences) {
      return `Based on your preferences for ${context.userPreferences.location} and budget of ₹${context.userPreferences.budget/100000} lakhs, I can help you find the perfect property. What specific aspect would you like to explore - location, amenities, or investment potential?`;
    }
    
    return "I'm your AI property assistant! I can help with property search, compare locations, explain our compatibility algorithm, or provide market insights. What would you like to know?";
  }

  private detectIntent(message: string, keywords: string[]): boolean {
    return keywords.some(keyword => message.includes(keyword));
  }

  private generateReasoningForScore(userPreferences: any, property: any, score: number): string[] {
    const reasoning: string[] = [];
    
    if (userPreferences.budget && property.price) {
      const budgetMatch = Math.abs(userPreferences.budget - property.price) / userPreferences.budget;
      if (budgetMatch < 0.1) {
        reasoning.push("Perfect budget match");
      } else if (budgetMatch < 0.2) {
        reasoning.push("Good budget fit");
      }
    }

    if (userPreferences.location === property.location) {
      reasoning.push("Exact location match");
    }

    if (userPreferences.propertyType === property.type) {
      reasoning.push("Property type matches preference");
    }

    if (userPreferences.bedrooms === property.bedrooms) {
      reasoning.push("Ideal bedroom count");
    }

    const matchingFacilities = this.getMatchingFacilities(userPreferences, property);
    if (matchingFacilities.length > 0) {
      reasoning.push(`${matchingFacilities.length} preferred facilities nearby`);
    }

    return reasoning;
  }

  private getMatchingFacilities(userPreferences: any, property: any): string[] {
    const facilities = ['gym', 'market', 'school', 'hospital', 'park', 'restaurant', 'metro'];
    return facilities.filter(facility => 
      userPreferences.facilities?.[facility] && property.facilities?.[facility]
    );
  }

  private async fetchProperties(): Promise<any[]> {
    // This would typically fetch from your backend API
    // For now, return empty array as placeholder - this will be replaced with actual API call
    return [];
  }
}

export const aiService = new AIService();
