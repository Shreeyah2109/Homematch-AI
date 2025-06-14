import React from 'react';
import Layout from '@/components/layout/Layout';
import { Mail, MapPin, Calendar } from 'lucide-react';

export default function Privacy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-white-900">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground flex justify-center items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: May 18, 2025
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-10 text-muted-foreground text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">1. Introduction</h2>
              <p>
                At <strong>PropertyMatch AI</strong>, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, services, and applications (collectively, the "Service").
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">2. Information We Collect</h2>
              <p>We collect several types of information from and about users of our Service, including:</p>

              <h3 className="text-xl font-semibold mb-1">Personal Data</h3>
              <p>
                This includes information that can be used to identify you, such as your name, email address, phone number, and other contact details that you provide when registering for our Service or updating your profile.
              </p>

              <h3 className="text-xl font-semibold mb-1">Preference Data</h3>
              <p>
                Information about your property preferences, including location, budget, property type, number of bedrooms and bathrooms, and nearby facility preferences. This data is used to provide you with personalized property recommendations.
              </p>

              <h3 className="text-xl font-semibold mb-1">Usage Data</h3>
              <p>
                Information about how you access and use our Service, including your IP address, browser type, operating system, referring website, pages viewed, time spent on pages, and other diagnostic data.
              </p>

              <h3 className="text-xl font-semibold mb-1">Cookies and Tracking Technologies</h3>
              <p>
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">3. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To generate personalized property recommendations and compatibility scores</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">4. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors, such as lawyers, auditors, and insurers</li>
                <li>Government authorities when required by law</li>
                <li>Property listing partners, with your explicit consent</li>
              </ul>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure and we cannot guarantee the absolute security of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">6. Your Data Rights</h2>
              <p>Depending on your location, you may have certain rights regarding your personal data, including:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The right to access, update, or delete your personal information</li>
                <li>The right to rectification if your information is inaccurate or incomplete</li>
                <li>The right to object to our processing of your personal data</li>
                <li>The right to request that we restrict the processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">7. Children's Privacy</h2>
              <p>
                Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">9. Contact Us</h2>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> privacy@propertymatchai.com
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
