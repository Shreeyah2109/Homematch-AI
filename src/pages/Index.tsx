import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Search, Home, BarChart } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatBot from '@/components/chatbot/ChatBot';

const cities = [
  "Mumbai", "Pune", "Solapur", "Nagpur", "Nashik",
  "Thane", "Aurangabad", "Amravati", "Kolhapur", "Latur",
  "Pimpri-Chinchwad", "Vasai-Virar", "Navi Mumbai", "Mira-Bhayandar", "Bhiwandi-Nizampur",
  "Ulhasnagar", "Sangli-Miraj-Kupwad", "Nanded-Waghala", "Malegaon", "Jalgaon",
  "Akola", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani",
  "Ichalkaranji", "Jalna", "Ambarnath", "Bhusawal", "Panvel"
];

const flatPrices = [
  10500000, 9800000, 4500000, 3800000, 3200000,
  2900000, 2500000, 2200000, 2000000, 1800000,
  8200000, 7800000, 9000000, 7500000, 7000000,
  6500000, 6000000, 5500000, 5200000, 5000000,
  4800000, 4600000, 4400000, 4200000, 4000000,
  3800000, 3600000, 3400000, 3200000, 3000000
];

const rents = [
  "Mumbai 2BHK", "Pune 3BHK", "Solapur 3BHK", "Nagpur 2BHK", "Nashik 1BHK",
  "Thane 2BHK", "Aurangabad 2BHK", "Amravati 1BHK", "Kolhapur 3BHK", "Latur 1BHK",
  "Pimpri-Chinchwad 2BHK", "Vasai-Virar 2BHK", "Navi Mumbai 3BHK", "Mira-Bhayandar 2BHK", "Bhiwandi 2BHK",
  "Ulhasnagar 1BHK", "Sangli 1BHK", "Nanded 2BHK", "Malegaon 1BHK", "Jalgaon 2BHK",
  "Akola 2BHK", "Dhule 1BHK", "Ahmednagar 2BHK", "Chandrapur 2BHK", "Parbhani 1BHK",
  "Ichalkaranji 2BHK", "Jalna 1BHK", "Ambarnath 2BHK", "Bhusawal 1BHK", "Panvel 3BHK"
];

const topNeighborhoods = [
  "Bandra West", "Kothrud", "Shivaji Nagar", "Hadapsar", "Wanowrie",
  "Yerwada", "Kalyani Nagar", "Viman Nagar", "Koregaon Park", "Magarpatta",
  "Chinchwad", "Nerul", "Belapur", "Vadgaon", "Kalyan West",
  "Uttan", "Kupwad", "Waghala", "Malegaon MIDC", "Ramalapur",
  "Akola East", "Vinishanagar", "Rahuri", "Nagbhid", "Parbhani Main",
  "Ichalkaranji Ward No5", "Jalna Central", "Badlapur", "Bhusalwal Colony", "Nerul Sector-20"
];

export default function Index() {
  const { user } = useAuth();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % cities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-12 pb-24 md:pt-24 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Find Your Perfect Property Match with AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our AI-powered compatibility scoring helps you discover properties that truly match your preferences and lifestyle needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {user ? (
                <>
                  <Link to="/properties">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Search className="mr-2 h-5 w-5" />
                      Browse Properties
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      <Home className="mr-2 h-5 w-5" />
                      My Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/properties">
                    <Button size="lg" className="w-full sm:w-auto">
                      <Search className="mr-2 h-5 w-5" />
                      Browse Properties
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AI Enhances Your Property Search</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform leverages advanced AI algorithms to provide a smarter, more personalized property search experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Compatibility Scoring</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your preferences and compares them with property features to generate personalized compatibility scores.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground">
                Get intelligent property recommendations that actually match what you're looking for based on your unique preferences.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Personalized Dashboard</h3>
              <p className="text-muted-foreground">
                Track your property search journey with a custom dashboard that helps you manage saved properties and search criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Cards + Map Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-center">
            <div className="bg-card p-4 rounded-lg shadow-sm border flex flex-col justify-center h-20 transition-all duration-2000 ease-in-out">
              <h4 className="font-semibold text-primary mb-1 text-center">Cities</h4>
              <p className="text-muted-foreground text-center text-lg">{cities[index]}</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border flex flex-col justify-center h-20 transition-all duration-2000 ease-in-out">
              <h4 className="font-semibold text-primary mb-1 text-center">Flat Price</h4>
              <p className="text-muted-foreground text-center text-lg">
                Rs.{flatPrices[index].toLocaleString()}
              </p>
            </div>
            <div className="col-span-2 md:col-span-3 lg:col-span-3 h-64 md:h-80 lg:h-[22rem] rounded-xl overflow-hidden shadow-lg border transition-all duration-1000 ease-in-out">
              <iframe
                title="PropertyMatch AI Office Location - Maharashtra"
                className="w-full h-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1931402.8683725765!2d72.82497442996875!3d19.281254021134368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e6b7f34e2e9%3A0x495606d88d96bbdb!2sMaharashtra!5e0!3m2!1sen!2sin!4v1716329520294!5m2!1sen!2sin"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              />
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border flex flex-col justify-center h-20 transition-all duration-2000 ease-in-out">
              <h4 className="font-semibold text-primary mb-1 text-center">Rents Available in</h4>
              <p className="text-muted-foreground text-center text-lg">{rents[index]}</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border flex flex-col justify-center h-20 transition-all duration-2000 ease-in-out">
              <h4 className="font-semibold text-primary mb-1 text-center">Top Neighborhood</h4>
              <p className="text-muted-foreground text-center text-lg">{topNeighborhoods[index]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                text: "The AI recommendations showed me properties that matched my exact preferences — it felt like the platform truly understood what I wanted.",
                author: "Priya S.",
              },
              {
                text: "Thanks to the personalized dashboard, I could easily keep track of all properties I liked and compare them side by side.",
                author: "Rahul M.",
              },
              {
                text: "The smart AI suggestions helped me discover homes I wouldn’t have found otherwise — all fitting perfectly with my budget and location.",
                author: "Anjali K.",
              },
              {
                text: "The property matches felt truly personalized, and the detailed compatibility scores made decision-making so much easier.",
                author: "Sameer R.",
              },
            ].map(({ text, author }, idx) => (
              <blockquote
                key={idx}
                className="bg-gradient-to-tr from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg border border-blue-200 text-blue-900 italic flex flex-col justify-between transition-transform duration-300 transform hover:scale-105 hover:z-10"
              >
                <p className="mb-6">"{text}"</p>
                <footer className="font-semibold text-right">— {author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Property?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Create an account now to start receiving AI-powered property recommendations tailored to your preferences.
          </p>

          {!user && (
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          )}

          {user && (
            <Link to="/properties">
              <Button size="lg">
                Browse Properties
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* ChatBot Integration */}
      {/* <ChatBot /> */}
    </Layout>
  );
}
