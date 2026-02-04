import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { mockHospitals } from "@/lib/mockData";
import {
  AlertTriangle,
  Phone,
  MapPin,
  Navigation,
  Ambulance,
  Heart,
  Shield,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function Emergency() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [sosActivated, setSosActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [emergencySent, setEmergencySent] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sosActivated && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (sosActivated && countdown === 0) {
      setEmergencySent(true);
    }
    return () => clearTimeout(timer);
  }, [sosActivated, countdown]);

  const handleSOS = () => {
    setSosActivated(true);
  };

  const cancelSOS = () => {
    setSosActivated(false);
    setCountdown(5);
    setEmergencySent(false);
  };

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

      <main className="container px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Emergency SOS Section */}
        <div className="mb-8">
          {!sosActivated ? (
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold text-destructive">
                Emergency SOS
              </h1>
              <p className="mb-8 text-muted-foreground">
                Tap the button below to alert emergency services
              </p>

              <button
                onClick={handleSOS}
                className="pulse-emergency mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full text-white transition-transform hover:scale-105 active:scale-95"
              >
                <AlertTriangle className="mb-2 h-16 w-16" />
                <span className="text-2xl font-bold">SOS</span>
              </button>

              <p className="mt-8 text-sm text-muted-foreground">
                Only use in case of genuine medical emergency
              </p>
            </div>
          ) : !emergencySent ? (
            <div className="text-center">
              <div className="mx-auto flex h-48 w-48 flex-col items-center justify-center rounded-full bg-destructive/10">
                <span className="text-7xl font-bold text-destructive">{countdown}</span>
                <span className="mt-2 text-sm text-destructive">seconds</span>
              </div>

              <h2 className="mt-6 text-xl font-bold text-foreground">
                Emergency Alert Sending...
              </h2>
              <p className="mb-6 text-muted-foreground">
                Tap cancel if this was accidental
              </p>

              <Button
                variant="outline"
                size="lg"
                onClick={cancelSOS}
                className="gap-2 border-destructive text-destructive hover:bg-destructive/10"
              >
                Cancel Emergency
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-16 w-16 text-success" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-foreground">
                Emergency Alert Sent!
              </h2>
              <p className="mb-6 text-muted-foreground">
                Help is on the way. Stay calm and wait for assistance.
              </p>

              <div className="card-medical mx-auto max-w-md p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Ambulance className="h-8 w-8 text-destructive" />
                  <div className="text-left">
                    <p className="font-semibold">Ambulance Dispatched</p>
                    <p className="text-sm text-muted-foreground">ETA: 8-12 minutes</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>Emergency hotline notified</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Your location shared with responders</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Medical history available to paramedics</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-6"
                onClick={cancelSOS}
              >
                I'm Okay - Cancel Alert
              </Button>
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-foreground">Emergency Contacts</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <a
              href="tel:102"
              className="card-medical flex items-center gap-4 p-4 transition-all hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <Ambulance className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="font-semibold">Ambulance</p>
                <p className="text-2xl font-bold text-primary">102</p>
              </div>
            </a>

            <a
              href="tel:108"
              className="card-medical flex items-center gap-4 p-4 transition-all hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold">Emergency Medical</p>
                <p className="text-2xl font-bold text-primary">108</p>
              </div>
            </a>

            <a
              href="tel:112"
              className="card-medical flex items-center gap-4 p-4 transition-all hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
                <Phone className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="font-semibold">Emergency Services</p>
                <p className="text-2xl font-bold text-primary">112</p>
              </div>
            </a>
          </div>
        </div>

        {/* Nearby Emergency Hospitals */}
        <div>
          <h2 className="mb-4 text-xl font-bold text-foreground">Nearest Emergency Hospitals</h2>
          <div className="space-y-4">
            {mockHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="card-medical flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{hospital.name}</p>
                      {hospital.emergency && (
                        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                          24/7 ER
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{hospital.address}</p>
                    <p className="text-sm text-muted-foreground">
                      {hospital.distance} away • {hospital.type}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a href={`tel:${hospital.phone}`}>
                    <Button variant="outline" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button size="icon" className="bg-gradient-primary text-white">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h3 className="mb-4 font-semibold text-foreground">While Waiting for Help</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Stay calm and remain in a safe position
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Keep your phone nearby and charged
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              If possible, unlock your door for responders
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Have your ID and health insurance ready if available
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
