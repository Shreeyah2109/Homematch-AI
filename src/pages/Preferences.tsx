
import Layout from '@/components/layout/Layout';
import PreferenceForm from '@/components/preference/PreferenceForm';
import { useNavigate } from 'react-router-dom';

export default function Preferences() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Property Preferences</h1>
          <p className="text-muted-foreground mt-2">
            Tell us what you're looking for, and our AI will find the best matches for you
          </p>
        </div>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h2 className="text-lg font-medium text-blue-800 mb-2">New: Nearby Facilities Matching</h2>
          <p className="text-blue-700 mb-2">
            You can now select nearby facilities that are important to you, such as gyms, markets, schools, and more.
            Our intelligent matching algorithm will find properties with these facilities nearby.
          </p>
          <p className="text-blue-700">
            The more preferences you provide, the better we can match you with your ideal property.
          </p>
        </div>
        
        <PreferenceForm onSaved={() => navigate('/properties')} />
      </div>
    </Layout>
  );
}
