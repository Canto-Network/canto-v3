import Container from "@/components/container/container";
import Button from "@/components/button/button";
import Icon from "@/components/icon/icon";
import Text from "@/components/text";
import styles from "../swap.module.scss";
import { popularTokens } from "../page";

type Props = {
  label: "PAY" | "RECEIVE";
  token?: { symbol: string; address: string };
  amount: string;
  onAmount?: (v: string) => void;
  disabled?: boolean;
  onSelect: (t: any) => void;
  balance?: string;
  onMax?: () => void;
};

function iconFor(addr?: string) {
  if (!addr) return undefined;
  const t = popularTokens.find(
    (p) => p.address.toLowerCase() === addr.toLowerCase()
  );
  return t?.iconURL;
}

export const TokenSelector = ({
  label,
  token,
  amount,
  onAmount,
  disabled,
  onSelect,
  balance = "0",
  onMax,
}: Props) => (
  <Container direction="column" gap={6} width="100%">
    <Text size="sm" color="secondary" font="proto_mono">
      {label}
    </Text>
    <Container direction="row" gap={8} width="100%">
      <input
        type="number"
        inputMode="decimal"
        placeholder="0.00"
        value={amount}
        onChange={(e) => onAmount?.(e.target.value)}
        disabled={disabled}
        className={styles.amountNativeInput}
      />
      <div style={{ marginLeft: "auto" }}>
        <Button
          //@ts-expect-error: type exists
          onClick={onSelect}
          height="medium"
          color="secondary"
          font="proto_mono"
        >
          {token && (
            <Icon
              icon={{
                url: iconFor(token.address) ?? "/icons/default.svg",
                size: 20,
              }}
            />
          )}
          {token ? token.symbol : "SELECT TOKEN"}
          <Icon themed icon={{ url: "/icons/down.svg", size: 18 }} />
        </Button>
      </div>
    </Container>
    <Container direction="row">
      <Text font="proto_mono" size="x-sm" color="secondary">
        BALANCE&nbsp;
        <span className={styles.balanceValue}>{balance}</span>
        <span className={styles.maxValue} onClick={onMax}>
          (max)
        </span>
      </Text>
    </Container>
  </Container>
);
