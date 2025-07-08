
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About PropertyMatch AI</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Using artificial intelligence to match you with your perfect property in India
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center">
            <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-muted-foreground">
              To revolutionize property search in India by using AI to match buyers with their ideal homes based on comprehensive preference analysis.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-muted-foreground">
              To become the leading property platform in India where homebuyers find not just houses, but perfect homes that match their unique lifestyle needs.
            </p>
          </Card>

          <Card className="p-8 text-center">
            <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Values</h3>
            <p className="text-muted-foreground">
              Innovation, transparency, customer satisfaction, and ethical practices form the foundation of everything we do at PropertyMatch AI.
            </p>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-white-900">
            Our Story
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-muted-foreground">
                Founded in 2023, <strong className="text-primary">PropertyMatch AI</strong> began with a realization: even with countless property listings, finding the right home was still a frustrating journey for many Indians.
              </p>
              {/* <p className="text-muted-foreground">
                Our founder faced the same hurdles while house hunting in cities like Mumbai and Bangalore. That sparked the idea for a smarter solution—one that uses AI to understand personal preferences beyond just filters.
              </p> */}
              <p className="text-muted-foreground">
                By analyzing a wide range of factors tailored to each buyer’s lifestyle, PropertyMatch AI simplifies the home search process and helps connect people with properties that truly match their needs.
              </p>
              <p className="text-muted-foreground">
                We're a team of real estate pros, data scientists, and tech innovators reshaping how India searches for homes—from metro hubs to fast-growing towns.
              </p>
            </div>


            <div className="hidden md:block">
              <img
                src="/public/team.jpg"
                alt="Team working on AI-powered real estate solutions"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>


        <div className="bg-muted rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
              <p className="text-muted-foreground mb-4">
                Our proprietary algorithm uses machine learning to analyze your preferences and match them with available properties, learning and improving with each interaction.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Preference analysis</li>
                <li>Location-based compatibility</li>
                <li>Facility proximity assessment</li>
                <li>Budget optimization recommendations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Property Data</h3>
              <p className="text-muted-foreground mb-4">
                We collect and verify detailed information about each property, from basic specifications to neighborhood amenities and future development plans.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Verified property listings</li>
                <li>Neighborhood analysis</li>
                <li>Historical price trends</li>
                <li>Investment potential indicators</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Team</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-12">
            Meet the passionate individuals behind PropertyMatch AI who are dedicated to transforming the property search experience in India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Sherrya Holikatti",
                role: "Founder & CEO",
                image: "/woman.png",
              },
              {
                name: "Yashraj Kalshetti",
                role: "Chief Technology Officer",
                image: "/man.png",
              },
              {
                name: "Urjeeta Kasabe",
                role: "Head of Real Estate Partnerships",
                image: "/woman.png",
              },
              {
                name: "Amareswar Kore",
                role: "Lead Data Scientist",
                image: "man.jpg",
              }
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
