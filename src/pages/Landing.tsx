import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  Activity,
  Shield,
  Brain,
  Heart,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { useEffect } from "react";

const features = [
  {
    icon: Brain,
    title: "AI Health Intelligence",
    description:
      "Advanced symptom analysis with personalized health risk scoring and actionable insights.",
  },
  {
    icon: Lock,
    title: "Blockchain Security",
    description:
      "Your medical data is encrypted with blockchain-inspired access control and unique DIDs.",
  },
  {
    icon: Heart,
    title: "Preventive Care",
    description:
      "Track symptoms, sleep patterns, and lifestyle factors to prevent health issues early.",
  },
  {
    icon: Shield,
    title: "Doctor Access Control",
    description:
      "Generate one-time cryptographic keys for secure, time-limited doctor consultations.",
  },
];

const steps = [
  "Complete your health profile",
  "Log daily symptoms and sleep",
  "Get AI-powered health insights",
  "Connect securely with doctors",
];

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"></div>

        <div className="container relative px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Preventive Healthcare
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Your Health,{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Secured & Intelligent
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Experience the future of healthcare with AI-assisted health
              monitoring, blockchain-secured medical records, and seamless
              doctor consultations.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/auth?mode=signup">
                <Button
                  size="lg"
                  className="group gap-2 bg-gradient-primary px-8 text-lg text-white hover:shadow-glow"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Powered by Advanced Technology
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Digital Hospital combines cutting-edge AI with blockchain-inspired
              security to revolutionize your healthcare experience.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-medical group p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-20">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Get started in minutes with our simple onboarding process.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 md:grid-cols-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-2xl bg-card p-6 shadow-card"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <span className="font-medium text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="card-glass p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    <Lock className="h-4 w-4" />
                    Blockchain Security
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                    Your Data, Your Control
                  </h3>
                  <p className="mb-6 text-muted-foreground">
                    Every piece of your medical data is encrypted with a unique
                    Decentralized Health ID (DID). Doctors can only access your
                    records with your explicit permission through time-limited,
                    one-time cryptographic keys.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "End-to-end encryption",
                      "One-time access keys",
                      "Complete audit trail",
                      "User-controlled permissions",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse-slow rounded-3xl bg-primary/20 blur-2xl"></div>
                    <div className="relative rounded-3xl bg-gradient-primary p-8">
                      <Shield className="h-32 w-32 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-hero py-20 text-white">
        <div className="container px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Take Control of Your Health?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/80">
            Join thousands of users who are already experiencing smarter,
            more secure healthcare.
          </p>
          <Link to="/auth?mode=signup">
            <Button
              size="lg"
              className="gap-2 bg-white px-8 text-lg text-primary hover:bg-white/90"
            >
              Create Free Account
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background py-12">
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
              <Link to="/about" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/about" className="hover:text-foreground">
                Terms
              </Link>
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
