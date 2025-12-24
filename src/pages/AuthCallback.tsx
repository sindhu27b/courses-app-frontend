import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const API_BASE_URL = 'http://localhost:8080/api';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError('Authentication failed. Please try again.');
        toast({
          title: 'Authentication Error',
          description: 'Failed to sign in with Google. Please try again.',
          variant: 'destructive',
        });
        setTimeout(() => navigate('/auth'), 3000);
        return;
      }

      if (token) {
        try {
          // Validate the token and get user info
          const response = await fetch(`${API_BASE_URL}/auth/validate`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            toast({
              title: 'Welcome!',
              description: `Signed in as ${data.user.name}`,
            });
            
            // Reload to update auth context
            window.location.href = '/';
          } else {
            throw new Error('Token validation failed');
          }
        } catch (err) {
          setError('Failed to complete authentication.');
          toast({
            title: 'Authentication Error',
            description: 'Failed to complete sign in. Please try again.',
            variant: 'destructive',
          });
          setTimeout(() => navigate('/auth'), 3000);
        }
      } else {
        setError('No authentication token received.');
        setTimeout(() => navigate('/auth'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <div className="text-destructive text-lg font-medium">{error}</div>
            <p className="text-muted-foreground">Redirecting to login...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Completing sign in...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
