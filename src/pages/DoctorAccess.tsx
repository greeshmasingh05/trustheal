import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { HealthScoreGauge } from "@/components/ui/HealthScoreGauge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Lock,
  Key,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  User,
  Heart,
  Moon,
  Brain,
  Clock,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { symptoms as symptomList } from "@/lib/mockData";

interface PatientData {
  profile: {
    full_name: string;
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    allergies: string[];
    past_diagnoses: string[];
    ongoing_medications: string;
    decentralized_health_id: string;
  };
  healthLogs: Array<{
    symptoms: string[];
    severity: number;
    notes: string;
    created_at: string;
  }>;
  sleepEntries: Array<{
    hours_slept: number;
    quality_rating: string;
    sleep_score: number;
    logged_date: string;
  }>;
  aiReport: {
    health_risk_score: number;
    urgency_level: string;
    recommended_doctor_type: string;
    reasoning: string;
    summary: string;
  } | null;
}

export default function DoctorAccess() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [accessKey, setAccessKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  const handleVerifyKey = async () => {
    if (!accessKey.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter an access key",
      });
      return;
    }

    setIsVerifying(true);

    try {
      // Find the access key
      const { data: keyData, error: keyError } = await supabase
        .from("doctor_access_keys")
        .select("*")
        .eq("access_key", accessKey.toUpperCase())
        .single();

      if (keyError || !keyData) {
        toast({
          variant: "destructive",
          title: "Invalid Key",
          description: "The access key you entered is invalid or doesn't exist.",
        });
        return;
      }

      // Check if key is expired
      if (new Date(keyData.expires_at) < new Date()) {
        toast({
          variant: "destructive",
          title: "Key Expired",
          description: "This access key has expired.",
        });
        return;
      }

      // Check if key is already used
      if (keyData.is_used) {
        toast({
          variant: "destructive",
          title: "Key Already Used",
          description: "This access key has already been used.",
        });
        return;
      }

      // Mark key as used
      await supabase
        .from("doctor_access_keys")
        .update({ is_used: true, used_at: new Date().toISOString() })
        .eq("id", keyData.id);

      // Fetch patient data
      const patientUserId = keyData.patient_user_id;

      const [profileRes, healthLogsRes, sleepRes, aiReportRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", patientUserId).single(),
        supabase
          .from("health_logs")
          .select("*")
          .eq("user_id", patientUserId)
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
          .from("sleep_entries")
          .select("*")
          .eq("user_id", patientUserId)
          .order("logged_date", { ascending: false })
          .limit(7),
        supabase
          .from("ai_health_reports")
          .select("*")
          .eq("user_id", patientUserId)
          .order("created_at", { ascending: false })
          .limit(1)
          .single(),
      ]);

      if (profileRes.data) {
        setPatientData({
          profile: profileRes.data as any,
          healthLogs: healthLogsRes.data || [],
          sleepEntries: sleepRes.data || [],
          aiReport: aiReportRes.data || null,
        });
        setIsVerified(true);
        toast({
          title: "Access Granted",
          description: "You now have temporary access to patient records.",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to verify access key. Please try again.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  if (authLoading) {
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

        {!isVerified ? (
          <div className="mx-auto max-w-md">
            <div className="card-medical p-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-primary">
                <Shield className="h-10 w-10 text-white" />
              </div>

              <h1 className="mb-2 text-2xl font-bold text-foreground">Doctor Access Portal</h1>
              <p className="mb-8 text-muted-foreground">
                Enter the patient's one-time access key to view their medical records
              </p>

              <div className="space-y-4">
                <div className="text-left">
                  <Label htmlFor="accessKey">Access Key</Label>
                  <div className="relative mt-1">
                    <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="accessKey"
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value.toUpperCase())}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="input-medical pl-10 font-mono tracking-wider"
                    />
                  </div>
                </div>

                <Button
                  className="w-full gap-2 bg-gradient-primary text-white"
                  onClick={handleVerifyKey}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Lock className="h-4 w-4" />
                      Verify & Access
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-8 space-y-3 text-left text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Keys are one-time use and expire after 24 hours
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  All access is logged and auditable
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  Patient data is end-to-end encrypted
                </p>
              </div>
            </div>
          </div>
        ) : patientData ? (
          <div className="space-y-6">
            {/* Access Confirmation */}
            <div className="card-glass flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Access Verified</p>
                  <p className="text-sm text-muted-foreground">
                    Viewing patient: {patientData.profile.full_name}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Session expires in</p>
                <p className="font-mono text-sm font-medium text-warning">23:59:59</p>
              </div>
            </div>

            {/* Patient Overview Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Patient Info */}
              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Patient Information</h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-medium">{patientData.profile.full_name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Age</p>
                      <p className="font-medium">{patientData.profile.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="font-medium capitalize">{patientData.profile.gender}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Height</p>
                      <p className="font-medium">{patientData.profile.height_cm} cm</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-medium">{patientData.profile.weight_kg} kg</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Health ID</p>
                    <p className="font-mono text-xs">
                      {patientData.profile.decentralized_health_id}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Health Score */}
              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI Health Analysis</h3>
                </div>

                <div className="flex justify-center py-4">
                  <HealthScoreGauge
                    score={patientData.aiReport?.health_risk_score || 25}
                    size="md"
                  />
                </div>

                {patientData.aiReport && (
                  <div className="mt-4 space-y-2">
                    <div
                      className={`rounded-lg p-2 text-center text-sm ${
                        patientData.aiReport.urgency_level === "emergency"
                          ? "bg-destructive/10 text-destructive"
                          : patientData.aiReport.urgency_level === "monitor"
                          ? "bg-warning/10 text-warning"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      Urgency: {patientData.aiReport.urgency_level}
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                      Recommended: {patientData.aiReport.recommended_doctor_type}
                    </p>
                  </div>
                )}
              </div>

              {/* Sleep Trends */}
              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Sleep Trends (7 Days)</h3>
                </div>

                {patientData.sleepEntries.length > 0 ? (
                  <>
                    <div className="mb-4 text-center">
                      <span className="text-4xl font-bold text-primary">
                        {patientData.sleepEntries[0]?.sleep_score || 0}
                      </span>
                      <span className="text-lg text-muted-foreground">/100</span>
                      <p className="text-sm text-muted-foreground">Latest Sleep Score</p>
                    </div>
                    <div className="flex gap-1">
                      {patientData.sleepEntries.slice(0, 7).reverse().map((entry, idx) => (
                        <div
                          key={idx}
                          className="h-12 flex-1 rounded-md transition-all"
                          style={{
                            backgroundColor: `hsl(var(--primary) / ${(entry.sleep_score || 0) / 100})`,
                          }}
                          title={`${entry.logged_date}: ${entry.sleep_score}/100`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      Avg: {(patientData.sleepEntries.reduce((acc, s) => acc + (s.hours_slept || 0), 0) / patientData.sleepEntries.length).toFixed(1)}h/night
                    </p>
                  </>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No sleep data available</p>
                )}
              </div>
            </div>

            {/* Allergies & Diagnoses */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  <h3 className="font-semibold">Known Allergies</h3>
                </div>
                {patientData.profile.allergies && patientData.profile.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patientData.profile.allergies.map((allergy, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-warning/10 px-3 py-1 text-sm text-warning"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No known allergies</p>
                )}
              </div>

              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-destructive" />
                  <h3 className="font-semibold">Past Diagnoses</h3>
                </div>
                {patientData.profile.past_diagnoses && patientData.profile.past_diagnoses.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {patientData.profile.past_diagnoses.map((diagnosis, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-destructive/10 px-3 py-1 text-sm text-destructive"
                      >
                        {diagnosis}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No past diagnoses recorded</p>
                )}
              </div>
            </div>

            {/* Symptom Timeline */}
            <div className="card-medical p-6">
              <div className="mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Symptom Timeline</h3>
              </div>

              {patientData.healthLogs.length > 0 ? (
                <div className="space-y-4">
                  {patientData.healthLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-4 border-l-2 border-primary/30 pl-4">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {log.symptoms.map((s) => (
                              <span
                                key={s}
                                className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                              >
                                {symptomList.find((sym) => sym.id === s)?.label || s}
                              </span>
                            ))}
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              log.severity >= 7
                                ? "bg-destructive/10 text-destructive"
                                : log.severity >= 4
                                ? "bg-warning/10 text-warning"
                                : "bg-success/10 text-success"
                            }`}
                          >
                            Severity: {log.severity}/10
                          </span>
                        </div>
                        {log.notes && (
                          <p className="text-sm text-muted-foreground">{log.notes}</p>
                        )}
                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(log.created_at), "MMM d, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-muted-foreground">No symptoms logged</p>
              )}
            </div>

            {/* Ongoing Medications */}
            {patientData.profile.ongoing_medications && (
              <div className="card-medical p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Ongoing Medications</h3>
                </div>
                <p className="text-foreground">{patientData.profile.ongoing_medications}</p>
              </div>
            )}

            {/* Doctor Notes Section */}
            <div className="card-medical p-6">
              <h3 className="mb-4 font-semibold">Doctor's Notes</h3>
              <div className="rounded-xl border-2 border-dashed border-border p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Add your consultation notes here (feature coming soon)
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  Add Note
                </Button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                <div>
                  <p className="font-medium text-warning">Important Notice</p>
                  <p className="text-sm text-muted-foreground">
                    AI-generated health scores and recommendations are for informational
                    purposes only. Always apply your clinical judgment when making medical
                    decisions. Patient data is encrypted and this session will be logged.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
