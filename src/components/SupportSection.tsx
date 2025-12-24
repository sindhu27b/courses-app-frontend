import { Button } from '@/components/ui/button';
import { Heart, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const SupportSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSupport = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 500 }) // $5.00 default donation
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <Heart className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Support Our Mission
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Help us keep education free and accessible for everyone. Your contribution 
            helps maintain our platform and create more quality content.
          </p>
          <Button 
            onClick={handleSupport}
            size="lg"
            disabled={loading}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8"
          >
            {loading ? 'Processing...' : 'Support Us'}
            {!loading && <ExternalLink className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;