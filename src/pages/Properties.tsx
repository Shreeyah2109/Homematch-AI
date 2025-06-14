
import Layout from '@/components/layout/Layout';
import PropertyList from '@/components/property/PropertyList';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Properties() {
  const { user } = useAuth();
  
  const hasPreferences = !!user?.preferences?.location;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Browse Properties</h1>
            <p className="text-muted-foreground">
              {user && hasPreferences
                ? 'View properties with personalized compatibility scores'
                : 'Find the perfect property for your needs'}
            </p>
          </div>
          
          {user && !hasPreferences && (
            <Link to="/preferences">
              <Button>
                Set Your Preferences
              </Button>
            </Link>
          )}
          
          {!user && (
            <Link to="/login">
              <Button>
                Sign In for Personalized Results
              </Button>
            </Link>
          )}
        </div>
        
        <PropertyList showScores={!!user} />
      </div>
    </Layout>
  );
}
