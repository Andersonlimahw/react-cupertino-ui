import * as React from "react";
import { cn } from "@react-cupertino-ui/shared/lib/utils";
import type { BaseProps } from "@react-cupertino-ui/shared/lib/interfaces/BaseProps";
import { Button } from "@react-cupertino-ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@react-cupertino-ui/card";
import { TextField } from "@react-cupertino-ui/text-field";

import "./index.scss";

export interface FeatureItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface LandingPageTemplateProps
  extends Omit<BaseProps<HTMLDivElement>, "children" | "variant" | "size"> {
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  heroSecondaryText?: string;
  onHeroCtaClick?: () => void;
  onHeroSecondaryClick?: () => void;
  features?: FeatureItem[];
  aboutTitle?: string;
  aboutContent?: string;
  contactTitle?: string;
  onContactSubmit?: (data: Record<string, string>) => void;
}

const LandingPageTemplate = React.forwardRef<HTMLDivElement, LandingPageTemplateProps>((props, ref) => {
  const {
    className,
    heroTitle = "Welcome to Cupertino",
    heroSubtitle = "A beautiful, native-feeling component library for React.",
    heroCtaText = "Get Started",
    heroSecondaryText = "Learn More",
    onHeroCtaClick,
    onHeroSecondaryClick,
    features = [
      { title: "Native Feel", description: "Components that look and feel like iOS." },
      { title: "Accessible", description: "Built with accessibility in mind." },
      { title: "Customizable", description: "Easy to style and adapt to your brand." },
    ],
    aboutTitle = "About Us",
    aboutContent = "We are dedicated to building the best UI components for the web, bringing the elegance of native apps to the browser.",
    contactTitle = "Get in Touch",
    onContactSubmit,
    ...rest
  } = props;

  const [contactForm, setContactForm] = React.useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContactSubmit?.(contactForm);
  };

  return (
    <div ref={ref} className={cn("react-cupertino-ui-landing-page", className)} {...rest}>
      {/* Hero Section */}
      <section className="react-cupertino-ui-landing-page__hero">
        <h1 className="react-cupertino-ui-landing-page__hero-title">{heroTitle}</h1>
        <p className="react-cupertino-ui-landing-page__hero-subtitle">{heroSubtitle}</p>
        <div className="react-cupertino-ui-landing-page__hero-actions">
          <Button size="lg" onClick={onHeroCtaClick}>{heroCtaText}</Button>
          <Button size="lg" variant="secondary" onClick={onHeroSecondaryClick}>{heroSecondaryText}</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="react-cupertino-ui-landing-page__features">
        <div className="react-cupertino-ui-landing-page__container">
          <div className="react-cupertino-ui-landing-page__grid">
            {features.map((feature, index) => (
              <Card key={index} className="react-cupertino-ui-landing-page__feature-card">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="react-cupertino-ui-landing-page__about">
        <div className="react-cupertino-ui-landing-page__container">
          <h2 className="react-cupertino-ui-landing-page__section-title">{aboutTitle}</h2>
          <p className="react-cupertino-ui-landing-page__section-content">{aboutContent}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="react-cupertino-ui-landing-page__contact">
        <div className="react-cupertino-ui-landing-page__container">
          <Card className="react-cupertino-ui-landing-page__contact-card">
            <CardHeader>
              <CardTitle>{contactTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="react-cupertino-ui-landing-page__contact-form">
                <TextField
                  label="Name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                />
                 <TextField
                  label="Message"
                  placeholder="How can we help?"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                />
                <Button type="submit" fullWidth>Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
});

LandingPageTemplate.displayName = "LandingPageTemplate";

export { LandingPageTemplate };
