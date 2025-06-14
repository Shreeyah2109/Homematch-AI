import React from 'react';
import Layout from '@/components/layout/Layout';
import { Mail, MapPin, Calendar } from 'lucide-react';

export default function Terms() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-white-900">Terms of Service</h1>
            <p className="text-sm text-muted-foreground flex justify-center items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: May 18, 2025
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-10 text-muted-foreground text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">1. Introduction</h2>
              <p>
                Welcome to <strong>PropertyMatch AI</strong>. By using our services, you agree to these Terms of Service. Please read them carefully before proceeding.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">2. Definitions</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>PropertyMatch AI</strong>: Our company, platform, and services</li>
                <li><strong>User</strong>: Individuals who use our platform</li>
                <li><strong>Property</strong>: Real estate listings on our site</li>
                <li><strong>Content</strong>: All data, media, and information on the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">3. Account Registration</h2>
              <p>
                Users must register with accurate details. You are responsible for maintaining the confidentiality of your credentials and all activities under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">4. User Responsibilities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the platform in accordance with all laws</li>
                <li>Avoid disrupting the service or other users</li>
                <li>Do not attempt unauthorized access to our systems</li>
                <li>Do not misuse the Service for illegal activities</li>
                <li>Do not attempt to reverse-engineer our technology</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">5. Property Listings</h2>
              <p>
                Property details are for informational purposes. We recommend verifying listings independently before making decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">6. Intellectual Property</h2>
              <p>
                All platform content and features are protected by copyright and other IP laws. You may not reuse or modify content without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">7. AI Compatibility Scoring</h2>
              <p>
                Our scoring is a recommendation based on user and property data. It should be used as guidance—not as a definitive evaluation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">8. Limitation of Liability</h2>
              <p>
                We are not liable for indirect or consequential damages, including but not limited to loss of data, profits, or goodwill, arising from use of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">9. Changes to Terms</h2>
              <p>
                We may update these Terms at any time. Changes will be communicated via our website or email. Continued use constitutes acceptance of changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">10. Contact Us</h2>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> legal@propertymatchai.com
              </p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" /> 99 Workspace Avenue, Railway Lines Business District, Solapur, India
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
