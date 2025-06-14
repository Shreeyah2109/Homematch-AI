import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, Bot, User, MapPin, Home, DollarSign } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useProperty } from '@/context/PropertyContext';
import { aiService } from '@/ml/AIService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  properties?: any[]; // For property recommendations
  quickReplies?: string[]; // For suggested responses
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { properties, filteredProperties } = useProperty();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: user 
          ? `Hello ${user.name}! I'm your AI property assistant. I can help you find properties, compare locations, or answer questions about Indian real estate market. What would you like to explore today?`
          : "Hello! I'm your AI property assistant powered by machine learning. I can help you discover properties across Mumbai, Delhi, Bangalore, Pune, and other Indian cities. What are you looking for?",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: user 
          ? ['Show me properties in my budget', 'Find 2BHK apartments', 'Properties near metro stations', 'Investment advice']
          : ['Properties in Mumbai', 'Budget under 50 lakhs', 'Apartments vs Villas', 'Set my preferences']
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, user]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Enhanced context with current properties data
      const response = await aiService.processChatMessage({
        message: textToSend,
        context: {
          userId: user?.id,
          userPreferences: user?.preferences,
          currentPage: 'home',
          availableProperties: properties.slice(0, 5), // Send sample of current properties
          totalProperties: properties.length
        }
      });
      
      // Check if user is asking for property recommendations
      let propertyRecommendations: any[] = [];
      let quickReplies: string[] = [];
      
      if (textToSend.toLowerCase().includes('show') || 
          textToSend.toLowerCase().includes('find') ||
          textToSend.toLowerCase().includes('recommend')) {
        
        if (user?.preferences) {
          const recommendations = await aiService.getPropertyRecommendations(user.preferences, 3);
          propertyRecommendations = recommendations.map(rec => {
            const property = properties.find(p => p.id === rec.propertyId);
            return property ? { ...property, compatibilityScore: rec.compatibilityScore, reasoning: rec.reasoning } : null;
          }).filter(Boolean);
        }
        
        quickReplies = ['More details', 'Different location', 'Adjust budget', 'Save favorites'];
      } else {
        // Contextual quick replies based on message content
        quickReplies = this.generateQuickReplies(textToSend, user);
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        properties: propertyRecommendations,
        quickReplies: quickReplies
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment, or feel free to browse our properties directly.",
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: ['Browse Properties', 'Try Again', 'Contact Support']
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const generateQuickReplies = (message: string, user: any): string[] => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('price')) {
      return ['Under 30 lakhs', '30-50 lakhs', '50+ lakhs', 'Investment options'];
    }
    
    if (lowerMessage.includes('location') || lowerMessage.includes('city')) {
      return ['Mumbai properties', 'Bangalore options', 'Pune locations', 'Delhi NCR'];
    }
    
    if (lowerMessage.includes('apartment') || lowerMessage.includes('flat')) {
      return ['2BHK apartments', '3BHK options', 'Studio apartments', 'Luxury flats'];
    }
    
    return ['Property search', 'Market insights', 'Investment advice', 'Set preferences'];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const formatPropertyCard = (property: any) => (
    <div key={property.id} className="bg-card border rounded-lg p-3 mb-2 text-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-sm">{property.title}</h4>
        {property.compatibilityScore && (
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
            {property.compatibilityScore}% match
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {property.location}
        </span>
        <span className="flex items-center gap-1">
          <Home className="h-3 w-3" />
          {property.bedrooms}BHK
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="h-3 w-3" />
          ₹{(property.price / 100000).toFixed(0)}L
        </span>
      </div>
      {property.reasoning && (
        <div className="mt-2 text-xs text-muted-foreground">
          Why it matches: {property.reasoning.slice(0, 2).join(', ')}
        </div>
      )}
    </div>
  );

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      <Card className="w-96 h-[500px] shadow-xl border-0 bg-background/95 backdrop-blur">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Property AI Assistant</CardTitle>
                <p className="text-xs text-muted-foreground">Real-time ML powered</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`flex gap-2 animate-fade-in ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg px-3 py-2 max-w-[85%] text-sm transition-all duration-200 hover:shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  
                  {/* Property recommendations */}
                  {message.properties && message.properties.length > 0 && (
                    <div className="ml-8 space-y-2">
                      {message.properties.map(formatPropertyCard)}
                    </div>
                  )}
                  
                  {/* Quick reply buttons */}
                  {message.quickReplies && message.quickReplies.length > 0 && (
                    <div className="ml-8 flex flex-wrap gap-2">
                      {message.quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => handleQuickReply(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start animate-fade-in">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about properties in your city..."
                className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage()}
                size="sm"
                disabled={!inputValue.trim() || isLoading}
                className="transition-all duration-200 hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
