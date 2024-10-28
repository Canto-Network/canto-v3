import { useMemo } from "react";
import styles from "./healthBar.module.scss";
import clsx from "clsx";

interface HealthBarProps {
  value: number;
}

const HEALTH_COLORS = {
  1: "#06FC99", // Green
  2: "#FCD506", // Yellow
  3: "#D79B00", // Orange
  4: "#FC8B06", // Dark Orange
  5: "#FF0000", // Red
};

export default function HealthBar({ value }: HealthBarProps) {
  const activeSteps = useMemo(() => {
    if (value >= 1) return 5;
    return Math.ceil(value * 5);
  }, [value]);

  return (
    <div className={styles.healthBarContainer}>
      {[1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className={clsx(styles.healthStep, {
            [styles.active]: step <= activeSteps,
          })}
          style={{
            backgroundColor:
              step <= activeSteps
                ? value >= 1
                  ? HEALTH_COLORS[5] // Force red color when value >= 1
                  : HEALTH_COLORS[activeSteps as keyof typeof HEALTH_COLORS]
                : "#ffffff",
          }}
        />
      ))}
    </div>
  );
}
