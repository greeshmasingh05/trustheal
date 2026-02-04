import { cn } from "@/lib/utils";

interface HealthScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function HealthScoreGauge({
  score,
  size = "md",
  showLabel = true,
}: HealthScoreGaugeProps) {
  const normalizedScore = Math.max(0, Math.min(100, score));

  const getScoreColor = () => {
    if (normalizedScore < 30) return "text-success";
    if (normalizedScore < 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = () => {
    if (normalizedScore < 30) return "Low Risk";
    if (normalizedScore < 60) return "Moderate";
    return "High Risk";
  };

  const getGradientStops = () => {
    const percentage = normalizedScore / 100;
    return `conic-gradient(
      from 135deg,
      hsl(var(--success)) 0%,
      hsl(var(--success)) ${percentage * 50}%,
      hsl(var(--warning)) ${percentage * 75}%,
      hsl(var(--destructive)) ${percentage * 100}%,
      hsl(var(--muted)) ${percentage * 100}%,
      hsl(var(--muted)) 100%
    )`;
  };

  const sizeClasses = {
    sm: "w-20 h-20",
    md: "w-32 h-32",
    lg: "w-44 h-44",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference * 0.75;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size])}>
        <svg
          className="w-full h-full transform -rotate-[135deg]"
          viewBox="0 0 100 100"
        >
          {/* Background arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          />
          {/* Progress arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={
              normalizedScore < 30
                ? "hsl(var(--success))"
                : normalizedScore < 60
                ? "hsl(var(--warning))"
                : "hsl(var(--destructive))"
            }
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-bold",
              textSizeClasses[size],
              getScoreColor()
            )}
          >
            {normalizedScore}
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn("text-sm font-medium", getScoreColor())}>
          {getScoreLabel()}
        </span>
      )}
    </div>
  );
}
