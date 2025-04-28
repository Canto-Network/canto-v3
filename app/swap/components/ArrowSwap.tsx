/* components/ArrowSwap.tsx */
import clsx from "clsx";
import Icon from "@/components/icon/icon";
import styles from "../swap.module.scss";

type Props = {
  flipped: boolean;
  onClick(): void;
};

export const ArrowSwap = ({ flipped, onClick }: Props) => (
  <div className={styles.arrowContainer}>
    <button
      className={clsx(styles.arrowBtn, { [styles.flipped]: flipped })}
      onClick={onClick}
    >
      <Icon
        icon={{ url: "/icons/arrow-down.svg", size: 10 }}
      />
    </button>
  </div>
);
