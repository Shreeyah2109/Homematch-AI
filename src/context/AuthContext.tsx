
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define API URL
const API_URL = 'http://localhost:5000/api';

// Define user types with facilities
export interface UserPreferences {
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
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  preferences?: UserPreferences;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
  updateUserPreferences: (preferences: UserPreferences) => Promise<void>;
  isAdmin: boolean;
  token: string | null;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load user data on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch user profile with token
  const fetchUserProfile = async (authToken: string) => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'x-auth-token': authToken
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const userData = await response.json();
      
      const foundUser: User = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        preferences: userData.preferences
      };

      setUser(foundUser);
      setIsAdmin(foundUser.role === 'admin');
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Login functionality
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { token: authToken, user: userData } = await response.json();
      
      // Store token
      localStorage.setItem('token', authToken);
      setToken(authToken);
      
      // Update user state
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        preferences: userData.preferences
      });
      setIsAdmin(userData.role === 'admin');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout functionality
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
  };

  // Register functionality
  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const { token: authToken, user: userData } = await response.json();
      
      // Store token
      localStorage.setItem('token', authToken);
      setToken(authToken);
      
      // Update user state
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      });
      setIsAdmin(userData.role === 'admin');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user preferences
  const updateUserPrefs = async (preferences: UserPreferences) => {
    if (!user || !token) return;

    try {
      const response = await fetch(`${API_URL}/users/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(preferences)
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }
      
      const updatedUser = await response.json();
      
      setUser({
        ...user,
        preferences
      });
    } catch (error) {
      console.error('Failed to update preferences:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        logout, 
        register,
        updateUserPreferences: updateUserPrefs,
        isAdmin,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
