import { useMemo } from "react";
import Modal from "@/components/modal/modal";
import Container from "@/components/container/container";
import Icon from "@/components/icon/icon";
import Text from "@/components/text";
import Spacer from "@/components/layout/spacer";
import { selectTokens } from "@/utils/swap/route";
import clsx from "clsx";
import styles from "./../swap.module.scss";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (tok: {
    symbol: string;
    address: string;
    iconURL?: string;
  }) => void;
  balances: Record<string, string>;
  currentA: string;
  currentB: string;
};

export default function SelectTokenModal({
  open,
  onClose,
  onSelect,
  balances,
  currentA,
  currentB,
}: Props) {
  const search = "";

  const tokens = useMemo(() => {
    const q = search.trim().toLowerCase();
    return selectTokens.filter((t) => {
      if (
        t.address.toLowerCase() === currentA.toLowerCase() ||
        t.address.toLowerCase() === currentB.toLowerCase()
      ) {
        return false;
      }
      if (!q) return true;
      return (
        t.symbol.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q)
      );
    });
  }, [search, currentA, currentB]);

  return (
    <Modal open={open} onClose={onClose}>
      <Text size="md" font="proto_mono">
        Select Token
      </Text>

      <Spacer height="12px" />

      <div className={clsx(styles["items-list"])}>
        {tokens.map((t) => {
          const bal = balances[t.address.toLowerCase()] ?? "0";
          return (
            <Container
              key={t.address}
              width="100%"
              direction="row"
              gap={20}
              center={{ vertical: true }}
              className={styles.item}
              onClick={() => {
                onSelect(t);
                onClose();
              }}
            >
              <Container direction="row" gap="auto" width="100%">
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  {t.iconURL && <Icon icon={{ url: t.iconURL, size: 30 }} />}
                  <Text font="proto_mono" size="md" style={{ marginLeft: 2 }}>
                    {t.symbol}
                  </Text>
                </span>

                <Text size="md" font="proto_mono">
                  {bal}
                </Text>
              </Container>
            </Container>
          );
        })}

        {tokens.length === 0 && (
          <Text size="sm" color="secondary" style={{ textAlign: "center" }}>
            No tokens found
          </Text>
        )}
      </div>
    </Modal>
  );
}
