import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  loginWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Replace with your Spring Boot backend URL
// const API_BASE_URL = 'http://localhost:8080/api';
const API_BASE_URL = 'https://courses-app-backend-production.up.railway.app/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
      
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = () => {
    // Redirect to Spring Boot OAuth2 authorization endpoint
    // window.location.href = 'http://localhost:8080/oauth2/authorization/google';
     window.location.href = 'https://courses-app-backend-production.up.railway.app/oauth2/authorization/google';
  };
   const loginWithEmail = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { error: null };
      } else {
        const errorData = await response.json();
        return { error: errorData.message || 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { error: 'Login failed. Please try again.' };
    }
  };

  const signUpWithEmail = async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        return { error: null };
      } else {
        const errorData = await response.json();
        return { error: errorData.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { error: 'Registration failed. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      loginWithGoogle,
      loginWithEmail,
      signUpWithEmail,
      logout,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
