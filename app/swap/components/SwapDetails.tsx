import Container from "@/components/container/container";
import Text from "@/components/text";
import styles from "../swap.module.scss";
import { useMemo } from "react";
import { popularTokens } from "@/utils/swap/route";

type Props = {
  conversionRate: string;
  gasFee: bigint | undefined;
  routePath: any;
  tokenA?: { symbol: string };
  tokenB?: { symbol: string };
};

function sym(addr?: string) {
  if (!addr) return "";
  const t = popularTokens.find(
    (p) => p.address.toLowerCase() === addr.toLowerCase()
  );
  return t ? t.symbol : `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}

export const SwapDetails = ({
  conversionRate,
  gasFee,
  routePath,
  tokenA,
  tokenB,
}: Props) => {
  const hopSymbols = useMemo(() => {
    if (!tokenA || !tokenB || !routePath.length) return [];

    const list = [tokenA.symbol];

    routePath.forEach((leg: any) => {
      list.push(sym(leg.to));
    });

    if (list[list.length - 1] !== tokenB.symbol) list.push(tokenB.symbol);
    return list;
  }, [tokenA, tokenB, routePath]);

  return (
    <div className={styles.rateCard}>
      <Container direction="column" gap={12} width="100%">
        <Container direction="row" width="100%" gap="auto">
          <Text font="proto_mono" size="x-sm">
            Rate
          </Text>
          {(tokenA?.symbol === "CANTO" && tokenB?.symbol === "wCANTO") ||
          (tokenA?.symbol === "wCANTO" && tokenB?.symbol === "CANTO") ? (
            <Text font="proto_mono" size="x-sm" color="accent">
              1 {tokenA?.symbol} ≈ 1 {tokenB?.symbol}
            </Text>
          ) : (
            <Text font="proto_mono" size="x-sm" color="accent">
              1 {tokenA?.symbol} ≈ {conversionRate || "---"} {tokenB?.symbol}
            </Text>
          )}
        </Container>

        <Container direction="row" gap="auto">
          <Text font="proto_mono" size="x-sm">
            Routing
          </Text>

          <Container direction="row" gap={4}>
            {hopSymbols.length
              ? hopSymbols.map((s, i) => (
                  <Container
                    key={i}
                    direction="row"
                    gap={4}
                    style={{ color: "#06FC99" }}
                  >
                    <Text font="proto_mono" size="x-sm">
                      {s}
                    </Text>
                    {i < hopSymbols.length - 1 && "-"}
                  </Container>
                ))
              : "---"}
          </Container>
        </Container>
      </Container>
    </div>
  );
};
