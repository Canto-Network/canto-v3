import { useState, useMemo } from "react";
import Modal from "@/components/modal/modal";
import Container from "@/components/container/container";
import Button from "@/components/button/button";
import Icon from "@/components/icon/icon";
import Input from "@/components/input/input";
import Text from "@/components/text";
import Spacer from "@/components/layout/spacer";
import { selectTokens } from "@/utils/swap/route";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (token: { symbol: string; address: string; logo?: string }) => void;
};

export default function SelectTokenModal({ open, onClose, onSelect }: Props) {
  const [search, setSearch] = useState("");

  /* simple symbol / address filter */
  const tokens = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return selectTokens;
    return selectTokens.filter(
      (t) =>
        t.symbol.toLowerCase().includes(q) ||
        t.address.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Modal open={open} onClose={onClose}>
      <Text size="md" font="proto_mono">
        Select Token
      </Text>

      <Spacer height="12px" />
      {/* @ts-expect-error : type exists */}
      <Input
        placeholder="SEARCH NAME OR ADDRESS"
        type="search"
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%" }}
      />

      <Spacer height="16px" />

      <Container
        direction="column"
        gap={8}
        width="100%"
        style={{ maxHeight: 300, overflowY: "auto" }}
      >
        {tokens.map((t) => (
          <Button
            color="secondary"
            key={t.address}
            width="fill"
            onClick={() => {
              onSelect(t);
              onClose();
            }}
          >
            {t.iconURL && <Icon icon={{ url: t.iconURL, size: 20 }} />}
            <Text font="proto_mono" size="sm" style={{ marginLeft: 2 }}>
              {t.symbol}
            </Text>
          </Button>
        ))}

        {tokens.length === 0 && (
          <Text size="sm" color="secondary" style={{ textAlign: "center" }}>
            No tokens found
          </Text>
        )}
      </Container>
    </Modal>
  );
}
