import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import {
  Shield,
  Brain,
  Heart,
  Lock,
  CheckCircle2,
  Activity,
  ArrowRight,
  Users,
  AlertTriangle,
  Database,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-12">
        {/* Hero */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            About Digital Hospital
          </h1>
          <p className="text-lg text-muted-foreground">
            Revolutionizing preventive healthcare through AI-powered insights and
            blockchain-inspired data security
          </p>
        </div>

        {/* Mission */}
        <section className="mb-16">
          <div className="card-glass mx-auto max-w-4xl p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="text-muted-foreground">
                  Digital Hospital aims to democratize healthcare by putting powerful health
                  monitoring tools in everyone's hands. We believe that preventive care,
                  powered by AI insights and secured by modern cryptography, can
                  significantly improve health outcomes worldwide.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse-slow rounded-2xl bg-primary/20 blur-2xl"></div>
                  <div className="relative rounded-2xl bg-gradient-primary p-8">
                    <Heart className="h-24 w-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            Key Features
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "AI Health Intelligence",
                description:
                  "Advanced algorithms analyze your symptoms, sleep patterns, and health history to provide personalized risk assessments and recommendations.",
              },
              {
                icon: Shield,
                title: "Blockchain Security",
                description:
                  "Your medical data is protected with blockchain-inspired encryption. Only you control who can access your health records.",
              },
              {
                icon: Lock,
                title: "One-Time Access Keys",
                description:
                  "Generate cryptographic keys for doctor visits that are time-limited, visit-specific, and cannot be reused.",
              },
              {
                icon: Activity,
                title: "Daily Health Logging",
                description:
                  "Track symptoms with severity ratings, log sleep quality, and build a comprehensive health timeline.",
              },
              {
                icon: Users,
                title: "Doctor Dashboard",
                description:
                  "Healthcare providers can securely access patient summaries, symptom timelines, and AI insights.",
              },
              {
                icon: Database,
                title: "Decentralized Health ID",
                description:
                  "Each user receives a unique DID that serves as their secure health identity across the platform.",
              },
            ].map((feature, index) => (
              <div key={index} className="card-medical p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
            How It Works
          </h2>
          <div className="mx-auto max-w-2xl">
            {[
              {
                step: 1,
                title: "Create Your Health Profile",
                description:
                  "Complete a comprehensive medical onboarding including your health history, allergies, and lifestyle factors.",
              },
              {
                step: 2,
                title: "Log Daily Health Data",
                description:
                  "Track symptoms when you feel unwell, log your sleep quality, and maintain a health diary.",
              },
              {
                step: 3,
                title: "Receive AI Insights",
                description:
                  "Our AI engine analyzes your data to provide health risk scores, pattern detection, and doctor recommendations.",
              },
              {
                step: 4,
                title: "Share Securely with Doctors",
                description:
                  "Generate one-time access keys when visiting healthcare providers for secure, controlled data sharing.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="mb-6 flex items-start gap-4 last:mb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="mb-16">
          <div className="card-glass mx-auto max-w-4xl p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
              Privacy & Security
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "All data encrypted at rest and in transit",
                "No third-party data sharing without consent",
                "One-time cryptographic access keys",
                "Complete audit trail of all data access",
                "User-controlled data deletion",
                "HIPAA-compliant architecture",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mb-16">
          <div className="mx-auto max-w-4xl rounded-xl border-2 border-warning/30 bg-warning/5 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="mt-1 h-8 w-8 shrink-0 text-warning" />
              <div>
                <h2 className="mb-4 text-xl font-bold text-foreground">
                  Medical Disclaimer
                </h2>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    <strong>This system does not provide medical diagnosis.</strong> Digital
                    Hospital is designed to assist with symptom tracking, health monitoring,
                    and risk awareness only.
                  </p>
                  <p>
                    The AI-powered health scores and recommendations are generated using
                    pattern analysis and should not be considered as medical advice,
                    diagnosis, or treatment recommendations.
                  </p>
                  <p>
                    <strong>Always consult a qualified healthcare professional</strong> for
                    medical advice, diagnosis, and treatment. In case of a medical emergency,
                    call your local emergency services immediately.
                  </p>
                  <p>
                    By using Digital Hospital, you acknowledge that the platform is intended
                    for informational purposes only and accept full responsibility for your
                    health decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join Digital Hospital today and experience smarter, more secure healthcare.
          </p>
          <Link to="/auth?mode=signup">
            <Button
              size="lg"
              className="gap-2 bg-gradient-primary px-8 text-white"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border/50 bg-background py-12">
        <div className="container px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Activity className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">Digital Hospital</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
              <a href="#" className="hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Digital Hospital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
