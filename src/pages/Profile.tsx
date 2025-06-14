
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth, User } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRound, Mail, UserCog, Settings, Home } from 'lucide-react';
import PreferenceForm from '@/components/preference/PreferenceForm';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadUserDetails = async () => {
      try {
        setIsLoading(true);
        if (!token) {
          throw new Error('No authentication token');
        }

        const response = await fetch('https://homematch-ai.onrender.com/api/users/profile', {
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const userData = await response.json();
        setUserDetails({
          id: userData._id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          preferences: userData.preferences
        });
      } catch (error) {
        console.error('Failed to load user details:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDetails();
  }, [user, navigate, token, toast]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <Tabs defaultValue="profile">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">
              <UserRound className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Settings className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>View and manage your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <p>Loading user details...</p>
                ) : (
                  <>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <UserRound className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{userDetails?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pb-3 border-b">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{userDetails?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <UserCog className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Account Type</p>
                        <p className="font-medium capitalize">{userDetails?.role}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Sign Out
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <PreferenceForm onSaved={() => {}} />
          </TabsContent>

          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard</CardTitle>
                <CardDescription>Go to your property dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <p>View your saved properties and property recommendations.</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
