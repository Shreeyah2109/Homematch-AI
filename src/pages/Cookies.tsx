import React from 'react';
import Layout from '@/components/layout/Layout';
import { Mail, MapPin, Calendar } from 'lucide-react';

export default function Cookies() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 text-white-900">Cookie Policy</h1>
            <p className="text-sm text-muted-foreground flex justify-center items-center gap-1">
              <Calendar className="w-4 h-4" />
              Last updated: May 18, 2025
            </p>
          </div>

          {/* Cookie Policy Content */}
          <div className="space-y-10 text-muted-foreground text-lg leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">1. Introduction</h2>
              <p>
                This Cookie Policy explains how <strong>PropertyMatch AI</strong> ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">2. What are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, PropertyMatch AI) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g. advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">3. Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties place cookies on our website for advertising, analytics, and other purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">4. Types of Cookies We Use</h2>
              <p>The specific types of first and third-party cookies served through our website and the purposes they perform include:</p>

              <h3 className="text-xl font-semibold mb-1">Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>

              <h3 className="text-xl font-semibold mb-1">Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>

              <h3 className="text-xl font-semibold mb-1">Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </p>

              <h3 className="text-xl font-semibold mb-1">Advertising Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements that are based on your interests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">5. How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner when you first visit our website.
              </p>
              <p>
                You can also control and manage cookies in different ways through your browser settings. Please bear in mind that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">6. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2 text-white-900">7. Contact Us</h2>
              <p className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" /> cookies@propertymatchai.com
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
