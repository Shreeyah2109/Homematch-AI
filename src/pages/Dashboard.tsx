import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import PreferenceForm from '@/components/preference/PreferenceForm';
import PropertyList from '@/components/property/PropertyList';
import { useProperty } from '@/context/PropertyContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserRound, Heart, Home, Settings, Compass } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const { savedProperties } = useProperty();
  const [activeTab, setActiveTab] = useState('overview');

  const hasPreferences = !!user?.preferences?.location;

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}
            </p>
          </div>

          <Link to="/properties">
            <Button>
              Browse Properties
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">
              <Home className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Heart className="mr-2 h-4 w-4" />
              Saved Properties
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="recommendation">
              <Compass className="mr-2 h-4 w-4" />
              Property Recommendation
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="space-y-8">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <UserRound className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold ml-3">Account Summary</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-1">Preferences</h3>
                    <p className="text-sm">
                      {hasPreferences ? (
                        <>Your preferences are set. You can update them at any time.</>
                      ) : (
                        <>
                          You haven't set your preferences yet.{' '}
                          <Button
                            variant="link"
                            className="h-auto p-0 text-primary"
                            onClick={() => setActiveTab('preferences')}
                          >
                            Set preferences
                          </Button>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-1">Saved Properties</h3>
                    <p className="text-sm">
                      You have saved {savedProperties.length} properties.{' '}
                      {savedProperties.length > 0 && (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-primary"
                          onClick={() => setActiveTab('saved')}
                        >
                          View all
                        </Button>
                      )}
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-md">
                    <h3 className="font-medium mb-1">Match Quality</h3>
                    <p className="text-sm">
                      {hasPreferences ? (
                        <>Our AI has analyzed your preferences to show you the best matches.</>
                      ) : (
                        <>Set your preferences to get personalized property matches.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {hasPreferences ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Recommended Properties</h2>
                    <Link to="/properties">
                      <Button variant="outline" size="sm">
                        View All Properties
                      </Button>
                    </Link>
                  </div>

                  <PropertyList showScores={true} />
                </div>
              ) : (
                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <h2 className="text-xl font-bold mb-4">Get Your Personalized Property Matches</h2>
                  <p className="mb-4 max-w-lg mx-auto">
                    Set your preferences to let our AI algorithm find the perfect properties for you based on your unique needs.
                  </p>
                  <Button onClick={() => setActiveTab('preferences')}>
                    Set Your Preferences
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Saved Properties Tab */}
          <TabsContent value="saved">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Saved Properties</h2>
              </div>

              {savedProperties.length === 0 ? (
                <div className="text-center py-12 bg-card border rounded-lg">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="text-xl font-semibold mt-4 mb-2">No saved properties yet</h3>
                  <p className="text-muted-foreground mb-6">
                    When you find properties you like, save them here to keep track of them.
                  </p>
                  <Link to="/properties">
                    <Button>Browse Properties</Button>
                  </Link>
                </div>
              ) : (
                <PropertyList showScores={true} savedOnly={true} />
              )}
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <PreferenceForm onSaved={() => setActiveTab('overview')} />
          </TabsContent>

          {/* Property Recommendation Tab */}
          <TabsContent value="recommendation">
            <div className="bg-card border rounded-lg p-6 text-center space-y-4">
              <h2 className="text-xl font-bold">AI-Powered Property Recommendation</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Visit our AI-based recommendation engine to explore personalized property suggestions 
                based on your preferences and location data.
              </p>
              <a 
                href="https://real-estate-application-jq.streamlit.app/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="default" className="mt-2">
                  Launch Property Recommender
                </Button>
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
