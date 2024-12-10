import { useMemo } from "react";
import styles from "./healthBar.module.scss";
import clsx from "clsx";

interface HealthBarProps {
  value: number;
}

export const HEALTH_THRESHOLDS = {
  DANGER: 1, // When borrowed >= collateral
  WARNING: 1.25,
  CAUTION: 1.5,
  MODERATE: 1.75,
  SAFE: 2,
};

const HEALTH_COLORS = {
  DANGER: "#FF0000", // Red - HF < 1
  WARNING: "#FC8B06", // Dark Orange - HF < 1.25
  CAUTION: "#D79B00", // Orange - HF < 1.5
  MODERATE: "#FCD506", // Yellow - HF < 1.75
  SAFE: "#06FC99", // Green - HF >= 2
};

export const HealthBar = ({ value }: HealthBarProps) => {
  const { activeSteps, barColor } = useMemo(() => {
    if (value === Infinity) {
      return { activeSteps: 1, barColor: HEALTH_COLORS.SAFE };
    }

    let color = HEALTH_COLORS.DANGER;
    let steps = 5;

    if (value >= HEALTH_THRESHOLDS.SAFE) {
      color = HEALTH_COLORS.SAFE;
      steps = 1;
    } else if (value >= HEALTH_THRESHOLDS.MODERATE) {
      color = HEALTH_COLORS.MODERATE;
      steps = 2;
    } else if (value >= HEALTH_THRESHOLDS.CAUTION) {
      color = HEALTH_COLORS.CAUTION;
      steps = 3;
    } else if (value >= HEALTH_THRESHOLDS.WARNING) {
      color = HEALTH_COLORS.WARNING;
      steps = 4;
    } else if (value >= HEALTH_THRESHOLDS.DANGER) {
      color = HEALTH_COLORS.WARNING;
      steps = 4;
    }

    return { activeSteps: steps, barColor: color };
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
            backgroundColor: step <= activeSteps ? barColor : "#ffffff",
          }}
        />
      ))}
    </div>
  );
};
