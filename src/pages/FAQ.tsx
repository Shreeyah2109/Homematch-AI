
import React from 'react';
import Layout from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';

export default function FAQ() {
  // FAQ categories
  const categories = [
    {
      title: "General Questions",
      questions: [
        {
          question: "What is PropertyMatch AI?",
          answer: "PropertyMatch AI is an innovative platform that uses artificial intelligence to match property seekers with their ideal homes in India. We analyze your preferences, including location, budget, and nearby facilities, to provide personalized property recommendations with compatibility scores."
        },
        {
          question: "How does the AI matching work?",
          answer: "Our AI algorithm analyzes over 50 different factors from your preferences and compares them with available properties. The system considers location, budget, property type, nearby facilities, and many other factors to calculate a compatibility score that helps you find properties that best match your needs."
        },
        {
          question: "Is the service available across all of India?",
          answer: "Currently, PropertyMatch AI offers listings in major Indian cities including Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, and several others. We're continually expanding our coverage to include more regions across India."
        },
        {
          question: "Do I need to create an account to use PropertyMatch AI?",
          answer: "While you can browse properties without an account, creating a free account allows you to save your preferences, receive personalized property recommendations, save favorite properties, and get notifications about new listings that match your criteria."
        }
      ]
    },
    {
      title: "Preferences & Matching",
      questions: [
        {
          question: "How can I set my property preferences?",
          answer: "After creating an account, navigate to the Preferences page where you can specify your desired location, budget, property type, number of bedrooms and bathrooms, and nearby facilities you consider important. Our AI system will use these preferences to calculate compatibility scores."
        },
        {
          question: "Can I change my preferences later?",
          answer: "Absolutely! You can update your preferences at any time through the Preferences page in your account. As soon as you save your new preferences, our AI will recalculate compatibility scores for all properties accordingly."
        },
        {
          question: "What does the compatibility score mean?",
          answer: "The compatibility score is a percentage that indicates how well a property matches your stated preferences. A higher score (closer to 100%) means the property closely aligns with what you're looking for in terms of location, budget, property type, and nearby facilities."
        },
        {
          question: "Why do some properties have higher scores than others that seem similar?",
          answer: "The compatibility score takes into account many factors beyond the basic features. Two seemingly similar properties might have different scores based on precise location, proximity to your preferred facilities, price relative to your budget, and other nuanced factors that our AI considers."
        }
      ]
    },
    {
      title: "Property Listings",
      questions: [
        {
          question: "How often are new properties added to the platform?",
          answer: "We update our property listings daily. Our team works with real estate developers, agents, and property owners across India to ensure our database is current and comprehensive."
        },
        {
          question: "Are the listed properties verified?",
          answer: "Yes, we verify all properties listed on our platform. Our team conducts basic verification to ensure listings are legitimate. However, we always recommend conducting your own due diligence before making any property decisions."
        },
        {
          question: "Can I list my property on PropertyMatch AI?",
          answer: "Yes, if you're a property owner, developer, or authorized agent, you can submit your property for listing. Please contact our team through the Contact page, and we'll guide you through the process and verification requirements."
        },
        {
          question: "How do I report an inaccurate listing?",
          answer: "If you find any inaccuracies in a property listing, please use the 'Report Listing' button on the property detail page. Our team will investigate and make necessary corrections."
        }
      ]
    },
    {
      title: "Account & Privacy",
      questions: [
        {
          question: "Is my personal information secure?",
          answer: "Yes, protecting your data is our priority. We use industry-standard security measures to protect your personal information. We do not share your data with third parties without your explicit consent, except as required by law."
        },
        {
          question: "How do I delete my account?",
          answer: "To delete your account, go to your Profile settings and select 'Delete Account'. Following confirmation, your account and personal data will be permanently removed from our system."
        },
        {
          question: "What data does PropertyMatch AI collect about me?",
          answer: "We collect basic information such as your name, email address, and property preferences. With your consent, we may also track your interaction with the platform to improve our recommendations. You can review our Privacy Policy for complete details."
        },
        {
          question: "Can I use PropertyMatch AI without sharing my contact information?",
          answer: "You need to provide an email address to create an account. However, you can adjust your privacy settings to control how and when we contact you, and whether your contact information is shared with property listers."
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Find answers to common questions about PropertyMatch AI and our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <nav className="flex flex-col space-y-2">
                {categories.map((category, index) => (
                  <a 
                    key={index}
                    href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors py-2 border-l-2 border-transparent hover:border-primary pl-3"
                  >
                    {category.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-12">
            {categories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex}
                id={category.title.toLowerCase().replace(/\s+/g, '-')}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <Card>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${categoryIndex}-${itemIndex}`}>
                        <AccordionTrigger className="text-left px-6">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center border-t border-border pt-12">
          <h2 className="text-2xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer to your question, please don't hesitate to contact our support team.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Contact Support
            </a>
            <a href="/about" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
              Learn About Us
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
