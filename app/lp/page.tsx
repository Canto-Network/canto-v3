"use client";
import Spacer from "@/components/layout/spacer";
import Modal from "@/components/modal/modal";
import Table from "@/components/table/table";
import {
  GeneralAmbientPairRow,
  GeneralCantoDexPairRow,
  UserAmbientPairRow,
  UserCantoDexPairRow,
} from "./components/pairRow";
import Text from "@/components/text";
import { CantoDexLPModal } from "./components/dexModals/cantoDexLPModal";
import styles from "./lp.module.scss";
import {
  isAmbientPool,
  isCantoDexPair,
} from "@/hooks/pairs/lpCombo/interfaces.ts/pairTypes";
import { AmbientModal } from "./components/ambient/ambientLPModal";
import { displayAmount } from "@/utils/formatting";
import Rewards from "./components/rewards";
import Container from "@/components/container/container";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import usePool from "./utils";
import Analytics from "@/provider/analytics";
import {
  getAnalyticsCantoLiquidityPoolInfo,
  getAnalyticsAmbientLiquidityPoolInfo,
} from "@/utils/analytics";
import useScreenSize from "@/hooks/helpers/useScreenSize";
import Icon from "@/components/icon/icon";

export default function Page() {
  const {
    pairs,
    rewards,
    filteredPairs,
    setFilteredPairs,
    selectedPair,
    setPair,
    sortedCantoDexPairs,
    validateCantoDexTx,
    sendCantoDexTxFlow,
    validateAmbientTxParams,
    sendAmbientTxFlow,
    sendClaimRewardsFlow,
    pairNames,
    rewardTime,
    isLoading,
  } = usePool();

  //   if mobile only
  // if (!window.matchMedia("(min-width: 768px)").matches) {
  //   return <DesktopOnly />;
  // }
  const { isMobile } = useScreenSize();

  //main content
  return (
    <div className={styles.container}>
      <Modal
        width="min-content"
        padded={false}
        open={selectedPair !== null}
        onClose={() => setPair(null)}
        closeOnOverlayClick={true}
      >
        {selectedPair && isCantoDexPair(selectedPair) && (
          <CantoDexLPModal
            pair={selectedPair}
            validateParams={validateCantoDexTx}
            sendTxFlow={sendCantoDexTxFlow}
          />
        )}
        {selectedPair && isAmbientPool(selectedPair) && (
          <AmbientModal
            pool={selectedPair}
            sendTxFlow={sendAmbientTxFlow}
            verifyParams={validateAmbientTxParams}
            isMobile
          />
        )}
      </Modal>

      <Container
        direction={isMobile ? "column" : "row"}
        gap={isMobile ? 10 : "auto"}
        width="100%"
      >
        <Text size="x-lg" font="proto_mono" className={styles.title}>
          Pools
        </Text>
        <Rewards
          onClick={sendClaimRewardsFlow}
          value={displayAmount(rewards.total, 18, {
            precision: 4,
          })}
        />
      </Container>
      <Spacer height="30px" />
      {pairs.userCantoDex.length + pairs.userAmbient.length > 0 && (
        <>
          <Table
            title="Your Pairs"
            headerFont="proto_mono"
            headers={[
              { value: "Pair", ratio: 2 },
              { value: "APR", ratio: 1 },
              { value: "Pool Share", ratio: 1, hideOnMobile: true },
              { value: "Value", ratio: 1 },
              { value: "Rewards", ratio: 1, hideOnMobile: true },
              { value: "Edit", ratio: 1, hideOnMobile: true },
            ]}
            onRowsClick={
              isMobile
                ? [
                    ...pairs.userAmbient.map((pool) => () => {
                      Analytics.actions.events.liquidityPool.manageLPClicked(
                        getAnalyticsAmbientLiquidityPoolInfo(pool)
                      );
                      setPair(pool.address);
                    }),
                    ...pairs.userCantoDex.map((pair) => () => {
                      Analytics.actions.events.liquidityPool.manageLPClicked(
                        getAnalyticsCantoLiquidityPoolInfo(pair)
                      );
                      setPair(pair.address);
                    }),
                  ]
                : undefined
            }
            content={[
              ...pairs.userAmbient.map((pool) =>
                UserAmbientPairRow({
                  pool,
                  onManage: (poolAddress) => {
                    Analytics.actions.events.liquidityPool.manageLPClicked(
                      getAnalyticsAmbientLiquidityPoolInfo(pool)
                    );
                    setPair(poolAddress);
                  },
                  rewardTime: rewardTime,
                  isMobile,
                })
              ),
              ...pairs.userCantoDex.map((pair) =>
                UserCantoDexPairRow({
                  pair,

                  onManage: (pairAddress) => {
                    Analytics.actions.events.liquidityPool.manageLPClicked(
                      getAnalyticsCantoLiquidityPoolInfo(pair)
                    );
                    setPair(pairAddress);
                  },
                  isMobile,
                })
              ),
            ]}
          />
          <Spacer height="20px" />
        </>
      )}

      <Table
        //@ts-ignore
        title={pairNames[filteredPairs]}
        secondary={
          <Container
            width={!isMobile ? "400px" : "100%"}
            style={isMobile ? { paddingBottom: "1rem" } : {}}
          >
            <ToggleGroup
              options={["all", "stable", "volatile"]}
              selected={filteredPairs}
              setSelected={(value) => {
                Analytics.actions.events.liquidityPool.tabSwitched(value);
                setFilteredPairs(value);
              }}
            />
          </Container>
        }
        headerFont="proto_mono"
        headers={[
          { value: "Pair", ratio: 2 },
          { value: "APR", ratio: 1 },
          { value: "TVL", ratio: 1 },
          { value: "Type", ratio: 1, hideOnMobile: true },
          { value: "Action", ratio: 1, hideOnMobile: true },
        ]}
        onRowsClick={
          isMobile
            ? [
                ...pairs.allAmbient
                  .filter(
                    (pool) =>
                      filteredPairs === "all" ||
                      (filteredPairs === "stable" && pool.stable) ||
                      (filteredPairs === "volatile" && !pool.stable)
                  )
                  .map((pool) => () => {
                    Analytics.actions.events.liquidityPool.addLPClicked({
                      lpType: "AMBIENT",
                      ambientLp: pool.symbol,
                    });
                    setPair(pool.address);
                  }),
                ...sortedCantoDexPairs
                  .filter(
                    (pair) =>
                      filteredPairs === "all" ||
                      (filteredPairs === "stable" && pair.stable) ||
                      (filteredPairs === "volatile" && !pair.stable)
                  )
                  .map((pair) => () => {
                    Analytics.actions.events.liquidityPool.addLPClicked({
                      lpType: "CANTO",
                      cantoLp: pair.symbol,
                    });
                    setPair(pair.address);
                  }),
              ]
            : undefined
        }
        content={[
          ...(!isLoading.ambient
            ? pairs.allAmbient
                .filter(
                  (pool) =>
                    filteredPairs === "all" ||
                    (filteredPairs === "stable" && pool.stable) ||
                    (filteredPairs === "volatile" && !pool.stable)
                )
                .map((pool) =>
                  GeneralAmbientPairRow({
                    pool,
                    onAddLiquidity: (poolAddress) => {
                      Analytics.actions.events.liquidityPool.addLPClicked({
                        lpType: "AMBIENT",
                        ambientLp: pool.symbol,
                      });
                      setPair(poolAddress);
                    },
                    isMobile,
                  })
                )
            : []),
          isLoading.ambient && (
            <tr
              key="loading-row"
              style={{
                margin: "0 auto",
                width: "100%",
                border: "1px solid var(--border-stroke-color)",
                padding: "0 16px",
                height: "80px",
              }}
            >
              <Container
                direction="row"
                gap={10}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                center={{
                  horizontal: true,
                  vertical: true,
                }}
              >
                <Text size="sm" font="proto_mono">
                  Loading concentrated pairs...
                </Text>
                <Icon
                  themed
                  icon={{
                    url: "/icons/spinner.svg",
                    size: 24,
                  }}
                  className={styles.spinnerIcon}
                />
              </Container>
            </tr>
          ),
          ...sortedCantoDexPairs
            .filter(
              (pair) =>
                filteredPairs === "all" ||
                (filteredPairs === "stable" && pair.stable) ||
                (filteredPairs === "volatile" && !pair.stable)
            )
            .map((pair) =>
              GeneralCantoDexPairRow({
                pair,
                onAddLiquidity: (pairAddress) => {
                  Analytics.actions.events.liquidityPool.addLPClicked({
                    lpType: "CANTO",
                    cantoLp: pair.symbol,
                  });
                  setPair(pairAddress);
                },
                isMobile,
              })
            ),
        ]}
      />
      <Spacer height="40px" />
    </div>
  );
}
