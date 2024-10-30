"use client";

import styles from "./lending.module.scss";
import Modal from "@/components/modal/modal";
import Table from "@/components/table/table";
import { displayAmount, formatPercent } from "@/utils/formatting";
import { useLendingCombo } from "./utils";
import Text from "@/components/text";
import Container from "@/components/container/container";
import { LendingModal } from "./components/modal/modal";
import { useState, useMemo, useEffect } from "react";
import Spacer from "@/components/layout/spacer";
import ToggleGroup from "@/components/groupToggle/ToggleGroup";
import AccountHealth from "./components/accountHealth/accountHealth";
import TokenCard from "./components/tokenCard/tokenCard";
import Icon from "@/components/icon/icon";
import {
  addTokenBalances,
  divideBalances,
  greaterThan,
} from "@/utils/math/tokenMath.utils";
import useScreenSize from "@/hooks/helpers/useScreenSize";
import clsx from "clsx";
import { CTokenWithUserData } from "@/hooks/lending/interfaces/tokens";
import Splash from "@/components/splash/splash";
import Button from "@/components/button/button";
import { Pagination } from "@/components/pagination/Pagination";
import { useAccount } from "wagmi";
import {
  useMyPositionsQuery,
  usePositionsQuery,
  usePositionsCountQuery,
  useMyPositionsCountQuery,
} from "@/hooks/generated/graphql.hook";
import { HEALTH_THRESHOLDS, HealthBar } from "./components/healthBar/healthBar";
import { useBorrowBalances } from "@/hooks/lending/useBorrowBalances";

enum CLMModalTypes {
  SUPPLY = "supply",
  BORROW = "borrow",
  NONE = "none",
}

function sortCTokens(
  a: CTokenWithUserData,
  b: CTokenWithUserData,
  sortBy: "supplyBalanceInUnderlying" | "borrowBalance"
) {
  // sort by prop first
  if (a.userDetails?.[sortBy] !== "0" || b.userDetails?.[sortBy] !== "0") {
    return greaterThan(
      a.userDetails?.[sortBy] ?? "0",
      b.userDetails?.[sortBy] ?? "0",
      a.decimals,
      b.decimals
    )
      ? -1
      : 1;
  }
  // if no balance, sort by symbol
  return a.underlying.symbol.localeCompare(b.underlying.symbol);
}

const POSITIONS_PER_PAGE = 10;

const calculateHealthFactor = (tokens: any[]) => {
  let totalCollateral = 0;
  let totalBorrowed = 0;

  tokens.forEach((token) => {
    const price = Number(token.market.underlyingPriceUSD) || 0;
    const collateralFactor = Number(token.market.collateralFactor) || 0;
    const supplied = Number(token.totalUnderlyingSupplied) || 0;
    const borrowed = Number(token.totalUnderlyingBorrowed) || 0;

    const collateralValue = supplied * collateralFactor * price;
    const borrowedValue = borrowed * price;

    totalCollateral += collateralValue;
    totalBorrowed += borrowedValue;
  });

  if (totalBorrowed === 0) return Infinity;
  return totalCollateral / totalBorrowed;
};

export default function LendingPage() {
  // track current modal type
  const [currentModal, setCurrentModal] = useState<CLMModalTypes>(
    CLMModalTypes.NONE
  );

  const [currentToggle, setCurrentToggle] = useState<"Supply" | "Borrow">(
    "Supply"
  );

  const [currentPositionsPage, setCurrentPositionsPage] = useState(1);

  const handlePositionsPageClick = (pageNumber: number) => {
    setCurrentPositionsPage(pageNumber);
  };

  // get all data from lending combo
  const {
    cTokens,
    clmPosition,
    transaction,
    selection,
    isLoading,
    lendingStats,
  } = useLendingCombo({
    onSuccessTx: () => {
      setCurrentModal(CLMModalTypes.NONE);
    },
  });
  const { cNote, rwas, stableCoins } = cTokens;
  const { selectedCToken, setSelectedCToken } = selection;
  const { isMobile } = useScreenSize();

  const [positionsToggle, setPositionsToggle] = useState<"All" | "My">("All");
  const { address } = useAccount();

  const { data: allPositionsData, loading: allPositionsLoading } =
    usePositionsQuery({
      variables: {
        skip: (currentPositionsPage - 1) * POSITIONS_PER_PAGE,
        first: POSITIONS_PER_PAGE,
      },
    });
  const { data: myPositionsData, loading: myPositionsLoading } =
    useMyPositionsQuery({
      variables: {
        account: address ?? "",
        skip: (currentPositionsPage - 1) * POSITIONS_PER_PAGE,
        first: POSITIONS_PER_PAGE,
      },
      skip: !address || positionsToggle === "All",
    });

  const { data: allPositionsCount } = usePositionsCountQuery();
  const { data: myPositionsCount } = useMyPositionsCountQuery({
    variables: { account: address ?? "" },
    skip: !address || positionsToggle === "All",
  });

  const totalPages = Math.ceil(
    ((positionsToggle === "All"
      ? allPositionsCount?.accountCTokens?.length
      : myPositionsCount?.accountCTokens?.length) ?? 0) / POSITIONS_PER_PAGE
  );

  const paginatedPositions = useMemo(() => {
    const positionsData =
      positionsToggle === "All" ? allPositionsData : myPositionsData;
    return positionsData?.accountCTokens ?? [];
  }, [allPositionsData, myPositionsData, positionsToggle]);

  const borrowBalances = useBorrowBalances(paginatedPositions);

  if (isLoading || cNote === undefined || stableCoins === undefined) {
    return (
      <div className={styles.loading}>
        <Splash themed />
      </div>
    );
  }

  const supplyTokens = [cNote, ...stableCoins, ...rwas].sort((a, b) =>
    sortCTokens(a, b, "supplyBalanceInUnderlying")
  );
  const borrowedTokens = [...stableCoins, cNote].sort((a, b) =>
    sortCTokens(a, b, "borrowBalance")
  );

  return (
    <div className={clsx(styles.container, "separator")}>
      <Text size="x-lg" font="proto_mono" className={styles.title}>
        Lending
      </Text>
      <Spacer height="20px" />
      <Modal
        open={currentModal !== CLMModalTypes.NONE}
        onClose={() => setCurrentModal(CLMModalTypes.NONE)}
        title="Lending"
        width="32rem"
      >
        {selectedCToken && (
          <LendingModal
            isSupplyModal={currentModal === CLMModalTypes.SUPPLY}
            position={clmPosition.position}
            cToken={selectedCToken}
            transaction={{
              performTx: transaction.performTx,
              validateParams: transaction.validateParams,
            }}
          />
        )}
      </Modal>

      <div className={styles.accountHealth}>
        <AccountHealth
          title="Account Health"
          items={[
            {
              name: "Supplied",
              value: displayAmount(clmPosition.position.totalSupply, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Borrow Limit",
              value: displayAmount(
                clmPosition.general.maxAccountLiquidity,
                18,
                {
                  precision: 2,
                }
              ),
              symbol: true,
            },
            {
              name: "Net APR",
              value: clmPosition.general.netApr + "%",
            },
            {
              name: "Borrowed",
              value: displayAmount(clmPosition.position.totalBorrow, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Liquidity Remaining",
              value: displayAmount(clmPosition.position.liquidity, 18, {
                precision: 2,
              }),
              symbol: true,
            },
            {
              name: "Limit Used",
              value: clmPosition.general.percentLimitUsed + "%",
            },
          ]}
          percent={Number(clmPosition.general.percentLimitUsed) / 100}
        />
      </div>
      <div className={styles.highlightCard}>
        <TokenCard
          cToken={cNote}
          items={[
            {
              key: "Circulating Supply",
              value: displayAmount(
                addTokenBalances(
                  lendingStats.circulatingNote,
                  lendingStats.circulatingCNote
                ),
                18
              ),
            },
            {
              key: "Percent Deposited",
              value: formatPercent(
                divideBalances(
                  lendingStats.circulatingCNote,
                  addTokenBalances(
                    lendingStats.circulatingNote,
                    lendingStats.circulatingCNote
                  )
                )
              ),
            },
            {
              key: "RWA TVl",
              value: displayAmount(lendingStats.valueOfAllRWA, 18),
            },
          ]}
          onClick={() => {
            window.open(
              "https://app.slingshot.finance/swap/Canto/NOTE",
              "_blank"
            );
          }}
        />
      </div>

      <div className={clsx(styles.mainTable, "separator")}>
        {isMobile && (
          <div>
            <ToggleGroup
              options={["Supply", "Borrow"]}
              selected={currentToggle}
              setSelected={(value) => {
                if (value === "Borrow" || value === "Supply")
                  setCurrentToggle(value);
                else console.error("invalid toggle value");
              }}
            />
          </div>
        )}
        {(!isMobile || currentToggle === "Supply") && (
          <Container gap={12} width="100%">
            <Text size="x-lg" font="proto_mono">
              SUPPLY
            </Text>
            <Table
              title="Canto Lending Market"
              headerFont="proto_mono"
              headers={[
                {
                  value: "Asset",
                  ratio: 3,
                },
                {
                  value: "APR",
                  ratio: 2,
                },
                {
                  value: "Collateral",
                  ratio: 2,
                },
                {
                  value: "Supplied",
                  ratio: 2,
                },
              ]}
              onRowsClick={supplyTokens.map((cStableCoin) => () => {
                setSelectedCToken(cStableCoin.address);
                setCurrentModal(CLMModalTypes.SUPPLY);
              })}
              content={[
                ...supplyTokens.map((cStableCoin) => [
                  <Container
                    center={{
                      vertical: true,
                    }}
                    width="100%"
                    direction="row"
                    gap={10}
                    style={{
                      paddingLeft: "30px",
                    }}
                    key={"title" + cStableCoin.address}
                    onClick={
                      cStableCoin.address !== cNote.address
                        ? () => {
                            setSelectedCToken(cStableCoin.address);
                            setCurrentModal(CLMModalTypes.SUPPLY);
                          }
                        : undefined
                    }
                  >
                    <Icon
                      icon={{ url: cStableCoin.underlying.logoURI, size: 30 }}
                    />
                    <Container
                      style={{
                        alignItems: "flex-start",
                      }}
                    >
                      <Text font="proto_mono">
                        {cStableCoin.underlying.symbol}
                      </Text>
                      <Text theme="secondary-dark" size="x-sm">
                        Bal:{" "}
                        {displayAmount(
                          cStableCoin.userDetails?.balanceOfUnderlying ?? "0",
                          cStableCoin.underlying.decimals,
                          {
                            precision: 2,
                          }
                        )}
                      </Text>
                    </Container>
                  </Container>,
                  cStableCoin.supplyApr + "%",
                  displayAmount(cStableCoin.collateralFactor, 16) + "%",
                  cStableCoin.userDetails?.supplyBalanceInUnderlying == null ||
                  cStableCoin.userDetails?.supplyBalanceInUnderlying === "0"
                    ? "-"
                    : displayAmount(
                        cStableCoin.userDetails?.supplyBalanceInUnderlying ??
                          "0",
                        cStableCoin.underlying.decimals,
                        {
                          precision: 2,
                        }
                      ),
                ]),
              ]}
            />
          </Container>
        )}
        {(!isMobile || currentToggle === "Borrow") && (
          <Container gap={12} width="100%">
            <Text size="x-lg" font="proto_mono">
              Borrow
            </Text>
            <Table
              title="Canto Lending Market"
              headerFont="proto_mono"
              headers={[
                {
                  value: "Asset",
                  ratio: 3,
                },
                {
                  value: "APR",
                  ratio: 2,
                },
                {
                  value: "Liquidity",
                  ratio: 2,
                },
                {
                  value: "Borrowed",
                  ratio: 2,
                },
              ]}
              onRowsClick={borrowedTokens.map((borrowedToken) => () => {
                setSelectedCToken(borrowedToken.address);
                setCurrentModal(CLMModalTypes.BORROW);
              })}
              content={[
                ...borrowedTokens.map((borrowedToken) => [
                  <Container
                    center={{
                      vertical: true,
                    }}
                    width="100%"
                    direction="row"
                    gap={10}
                    style={{
                      paddingLeft: "30px",
                    }}
                    key={"title" + borrowedToken.address}
                  >
                    <Icon
                      icon={{
                        url: borrowedToken.underlying.logoURI,
                        size: 30,
                      }}
                    />
                    <Container
                      style={{
                        alignItems: "flex-start",
                      }}
                    >
                      <Text font="proto_mono">
                        {borrowedToken.underlying.symbol}
                      </Text>
                      <Text theme="secondary-dark" size="x-sm">
                        Bal:{" "}
                        {displayAmount(
                          borrowedToken.userDetails?.balanceOfUnderlying ?? "0",
                          borrowedToken.underlying.decimals,
                          {
                            precision: 2,
                          }
                        )}
                      </Text>
                    </Container>
                  </Container>,
                  borrowedToken.borrowApr + "%",
                  displayAmount(borrowedToken.liquidity, 0),
                  borrowedToken.userDetails?.borrowBalance == null ||
                  borrowedToken.userDetails?.borrowBalance === "0"
                    ? "-"
                    : displayAmount(
                        borrowedToken.userDetails?.borrowBalance ?? "0",
                        borrowedToken.underlying.decimals,
                        {
                          precision: 2,
                        }
                      ),
                ]),
              ]}
            />
          </Container>
        )}
      </div>
      <div className={clsx(styles.positionsContainer, "separator")}>
        <div className={styles.positionsHeader}>
          <Text size="x-lg" font="proto_mono">
            Positions
          </Text>
          <Container
            width={isMobile ? "100%" : "200px"}
            style={{ padding: isMobile ? "0 8px 0 8px" : "" }}
          >
            <ToggleGroup
              options={["All", "My"]}
              selected={positionsToggle}
              setSelected={(value) => setPositionsToggle(value as "All" | "My")}
            />
          </Container>
        </div>

        <Spacer height="20px" />
        <Table
          title="Positions"
          headerFont="proto_mono"
          headers={[
            {
              value: "Account Address",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "Market Address",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "Borrowed Amount",
              ratio: isMobile ? 0 : 3,
              hideOnMobile: isMobile,
            },
            {
              value: "Borrow Balance",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "Health Factor",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: "",
              ratio: isMobile ? 1 : 3,
            },
          ]}
          isLoading={allPositionsLoading || myPositionsLoading}
          content={
            paginatedPositions.length > 0
              ? [
                  ...paginatedPositions.map((position, index) => [
                    <Container
                      key={`account-${index}`}
                      width="100%"
                      direction="row"
                      gap={10}
                      center={{ horizontal: true }}
                    >
                      <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                        {`${position.account.id.slice(
                          0,
                          4
                        )}...${position.account.id.slice(-5)}`}
                      </Text>
                    </Container>,
                    <Container
                      key={`market-${index}`}
                      width="100%"
                      direction="row"
                      gap={10}
                      center={{ horizontal: true }}
                    >
                      <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                        {position.market.name}
                      </Text>
                    </Container>,
                    isMobile ? null : (
                      <Container
                        key={`borrowed-${index}`}
                        width="100%"
                        direction="row"
                        gap={10}
                        center={{ horizontal: true }}
                      >
                        <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                          {displayAmount(position.storedBorrowBalance, 18, {
                            precision: 2,
                          })}
                        </Text>
                      </Container>
                    ),
                    <Container
                      key={`balance-${index}`}
                      width="100%"
                      direction="row"
                      gap={10}
                      center={{ horizontal: true }}
                    >
                      <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                        {borrowBalances[position.id]
                          ? displayAmount(
                              borrowBalances[position.id].borrowBalance,
                              Number(borrowBalances[position.id].decimals),
                              { precision: 2 }
                            )
                          : "Loading..."}
                      </Text>
                    </Container>,
                    <Container
                      key={`health-${index}`}
                      width="100%"
                      direction={isMobile ? "column" : "row"}
                      gap={isMobile ? 4 : 10}
                      center={{ vertical: true, horizontal: true }}
                      style={{ justifyContent: "center" }}
                    >
                      <Text font="proto_mono" size={isMobile ? "sm" : "md"}>
                        {position.account.tokens
                          ? (() => {
                              const hf = calculateHealthFactor(
                                position.account.tokens
                              );
                              return hf === Infinity ? "N/A" : hf.toFixed(2);
                            })()
                          : "Loading..."}
                      </Text>
                      {position.account.tokens && (
                        <HealthBar
                          value={calculateHealthFactor(position.account.tokens)}
                        />
                      )}
                    </Container>,
                    <Container
                      key={`manage-${index}`}
                      width="100%"
                      direction="row"
                      gap={10}
                      center={{ horizontal: true }}
                    >
                      {calculateHealthFactor(position.account.tokens) <
                        HEALTH_THRESHOLDS.DANGER && (
                        <button
                          className={styles.liquidateButton}
                          onClick={() => {}}
                        >
                          Liquidate
                        </button>
                      )}
                    </Container>,
                  ]),
                  <Pagination
                    key="pagination"
                    currentPage={currentPositionsPage}
                    totalPages={totalPages}
                    handlePageClick={handlePositionsPageClick}
                  />,
                ]
              : [
                  <Container
                    key="noData"
                    className={styles.noPositionsContainer}
                  >
                    <Text font="proto_mono" size={isMobile ? "md" : "lg"}>
                      NO POSITIONS FOUND
                    </Text>
                  </Container>,
                ]
          }
        />
      </div>
    </div>
  );
}
