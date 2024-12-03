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
import { HEALTH_THRESHOLDS, HealthBar } from "./components/healthBar/healthBar";
import { useBorrowBalances } from "@/hooks/lending/useBorrowBalances";
import { writeContract, waitForTransaction, readContract } from "@wagmi/core";
import { CERC20_ABI } from "@/config/abis/clm/cErc20";
import { parseUnits } from "viem";
import { useToast } from "@/components/toast/useToast";
import {
  useMyPositionsCountQuery,
  useMyPositionsQuery,
  usePositionsCountQuery,
  usePositionsQuery,
  OrderDirection,
} from "@/hooks/generated/clm-graphql.hook";
import { ApolloContext } from "@/enums/apollo-context.enum";
import { GET_TOKEN_PRICES } from "@/graphql/dex/token-prices-query.graphql";
import { apolloClient } from "@/config/apollo.config";
import { CLM_TOKENS } from "@/config/consts/addresses";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { COMPTROLLER_ABI } from "@/config/abis";

enum CLMModalTypes {
  SUPPLY = "supply",
  BORROW = "borrow",
  NONE = "none",
}

interface AccountLiquidityData {
  errorCode: string;
  liquidity: string;
  shortfall: string;
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

async function getAccountLiquidity(accountAddress: `0x${string}`): Promise<AccountLiquidityData> {
  try {
    const [errorCode, liquidity, shortfall] = await readContract({
      address: "0x5E23dC409Fc2F832f83CEc191E245A191a4bCc5C",
      abi: COMPTROLLER_ABI,
      functionName: "getAccountLiquidity",
      args: [accountAddress],
    });

    return {
      errorCode: errorCode.toString(),
      liquidity: liquidity.toString(),
      shortfall: shortfall.toString(),
    };
  } catch (error) {
    console.error(
      `Error fetching liquidity for account ${accountAddress}:`,
      error
    );
    return {
      errorCode: "1",
      liquidity: "0",
      shortfall: "0",
    };
  }
}

const POSITIONS_PER_PAGE = 10;

const calculateHealthFactor = async (tokens: any[]) => {
  let totalCollateral = 0;
  let totalBorrowed = 0;
  const missingPriceTokens: Array<{
    address: string;
    marketName: string;
    marketId: string;
  }> = [];

  const pricePromises = tokens.map((token) =>
    apolloClient.query({
      query: GET_TOKEN_PRICES,
      variables: {
        tokenId: token.market.underlyingAddress.toLowerCase(),
      },
      context: {
        endpoint: ApolloContext.DEX,
      },
    })
  );

  const prices = await Promise.all(pricePromises);

  tokens.forEach((token, index) => {
    const priceData = prices[index]?.data?.tokenDayDatas?.[0];

    let price;
    if (priceData) {
      price = Number(priceData.token.derivedETH) * Number(priceData.priceUSD);
    } else {
      price = 1;
      missingPriceTokens.push({
        address: token.market.underlyingAddress,
        marketName: token.market.name,
        marketId: token.market.id,
      });
    }

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
  const toast = useToast();
  const [loadingPositions, setLoadingPositions] = useState<
    Record<string, boolean>
  >({});

  const handleLiquidate = async (position: any) => {
    if (!address) {
      toast.add({
        primary: "Please connect your wallet to liquidate positions",
        state: "failure",
        duration: 4000,
      });
      return;
    }

    try {
      setLoadingPositions((prev) => ({ ...prev, [position.id]: true }));
      const tokenDecimals =
        CLM_TOKENS.find(
          (token) => token.id.toLowerCase() === position.market.id.toLowerCase()
        )?.decimals ?? 18;

      const repayAmount =
        (BigInt(parseUnits(position.storedBorrowBalance, tokenDecimals)) *
          BigInt(50)) /
        BigInt(100);

      const cTokenCollateral = position.account.tokens
        .find(
          (token: any) =>
            token.market.id.toLowerCase() !==
              position.market.id.toLowerCase() &&
            token.totalUnderlyingSupplied > repayAmount.toString()
        )
        ?.market.id.toLowerCase();

      const borrowedToken = position.account.tokens.find(
        (token: any) =>
          parseFloat(token.totalUnderlyingBorrowed) > 0 &&
          token.market.id.toLowerCase() === position.market.id.toLowerCase()
      );

      const allowance = await readContract({
        address: borrowedToken.market.underlyingAddress,
        abi: CERC20_ABI,
        functionName: "allowance",
        args: [address as `0x${string}`, position.market.id.toLowerCase()],
      });

      const balance = await readContract({
        address: borrowedToken.market.underlyingAddress,
        abi: CERC20_ABI,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      });

      if (allowance < repayAmount) {
        const { hash: approvalHash } = await writeContract({
          address: borrowedToken.market.underlyingAddress,
          abi: CERC20_ABI,
          functionName: "approve",
          args: [position.market.id.toLowerCase(), repayAmount],
        });

        const { status: approvalStatus } = await waitForTransaction({
          hash: approvalHash,
        });

        if (!approvalStatus) {
          throw new Error("Approval failed");
        }
      }

      if (!cTokenCollateral) {
        throw new Error("Insufficient Collateral to Seize");
      }

      if (balance < repayAmount) {
        throw new Error("Balance is less than repay amount");
      }

      const { hash } = await writeContract({
        address: position.market.id.toLowerCase() as `0x${string}`,
        abi: CERC20_ABI,
        functionName: "liquidateBorrow",
        args: [
          position.account.id.toLowerCase(),
          repayAmount,
          cTokenCollateral,
        ],
      });

      const { status } = await waitForTransaction({ hash });

      if (status) {
        setLoadingPositions((prev) => ({ ...prev, [position.id]: false }));
        toast.add({
          primary: "Position liquidated successfully",
          state: "success",
          duration: 4000,
        });
      } else {
        setLoadingPositions((prev) => ({ ...prev, [position.id]: false }));
        toast.add({
          primary: "Liquidation transaction reverted",
          state: "failure",
          duration: 4000,
        });
      }
    } catch (error: any) {
      setLoadingPositions((prev) => ({ ...prev, [position.id]: false }));
      console.error("Liquidation failed:", error.message);
      toast.add({
        primary: error.message,
        state: "failure",
        duration: 4000,
      });
    }
  };

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

  const [sortDirection, setSortDirection] = useState<OrderDirection>(
    OrderDirection.DESC
  );

  const { data: allPositionsData, loading: allPositionsLoading } =
    usePositionsQuery({
      variables: {
        skip: (currentPositionsPage - 1) * POSITIONS_PER_PAGE,
        first: POSITIONS_PER_PAGE,
        orderDirection: sortDirection,
      },
      context: {
        endpoint: ApolloContext.MAIN,
      },
    });
  const { data: myPositionsData, loading: myPositionsLoading } =
    useMyPositionsQuery({
      variables: {
        account: address ?? "",
        skip: (currentPositionsPage - 1) * POSITIONS_PER_PAGE,
        first: POSITIONS_PER_PAGE,
        orderDirection: sortDirection,
      },
      skip: !address || positionsToggle === "All",
      context: {
        endpoint: ApolloContext.MAIN,
      },
    });

  const { data: allPositionsCount } = usePositionsCountQuery({
    context: {
      endpoint: ApolloContext.MAIN,
    },
  });
  const { data: myPositionsCount } = useMyPositionsCountQuery({
    variables: { account: address ?? "" },
    skip: !address || positionsToggle === "All",
    context: {
      endpoint: ApolloContext.MAIN,
    },
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

  const [healthFactors, setHealthFactors] = useState<Record<string, number>>(
    {}
  );

  const [accountLiquidities, setAccountLiquidities] = useState<Record<string, AccountLiquidityData>>({});


  useEffect(() => {
    const calculateHealthFactors = async () => {
      const newHealthFactors: Record<string, number> = {};

      for (const position of paginatedPositions) {
        if (position.account.tokens) {
          try {
            const hf = await calculateHealthFactor(position.account.tokens);
            newHealthFactors[position.id] = hf;
          } catch (error) {
            console.error("Error calculating health factor:", error);
            newHealthFactors[position.id] = 0;
          }
        }
      }

      setHealthFactors(newHealthFactors);
    };

    calculateHealthFactors();
  }, [paginatedPositions]);

  useEffect(() => {
    const fetchAccountLiquidities = async () => {
      const newAccountLiquidities: any = {};

      await Promise.all(
        paginatedPositions.map(async (position) => {
          const accountId = position.account.id.toLowerCase();
          const liquidityData = await getAccountLiquidity(accountId as `0x${string}`);

          newAccountLiquidities[position.id] = liquidityData;
        })
      );

      setAccountLiquidities(newAccountLiquidities);
    };

    if (paginatedPositions.length > 0) {
      fetchAccountLiquidities();
    }
  }, [paginatedPositions]);

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
              value: "Market",
              ratio: isMobile ? 1 : 3,
            },
            {
              value: (
                <Container
                  direction="row"
                  className={styles.headerWithSort}
                  onClick={() =>
                    setSortDirection(
                      sortDirection === OrderDirection.ASC
                        ? OrderDirection.DESC
                        : OrderDirection.ASC
                    )
                  }
                >
                  <Text>Borrowed Amount</Text>
                  <span
                    className={clsx(styles.sortIcon, styles[sortDirection])}
                  />
                </Container>
              ),
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
                      <Text
                        font="proto_mono"
                        size={isMobile ? "sm" : "md"}
                        onClick={() =>
                          window.open(
                            `https://tuber.build/address/${position.account.id}`,
                            "_blank"
                          )
                        }
                        className={styles.clickableAddress}
                      >
                        {`${position.account.id.slice(
                          0,
                          4
                        )}...${position.account.id.slice(-5)}`}
                        <Icon
                          icon={{
                            url: "/arrow.svg",
                            size: 20,
                          }}
                          themed
                        />
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
                          {displayAmount(position.storedBorrowBalance, 0, {
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
                              0,
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
                          ? healthFactors[position.id] === undefined
                            ? "Loading..."
                            : healthFactors[position.id] === Infinity
                              ? "N/A"
                              : healthFactors[position.id] > 2
                                ? "2.00"
                                : healthFactors[position.id].toFixed(2)
                          : "Loading..."}
                      </Text>
                      {position.account.tokens &&
                        healthFactors[position.id] !== undefined &&
                        healthFactors[position.id] !== Infinity && (
                          <HealthBar value={healthFactors[position.id]} />
                        )}
                    </Container>,
                    <Container
                      key={`manage-${index}`}
                      width="100%"
                      direction="row"
                      gap={10}
                      center={{ horizontal: true }}
                    >
                      {accountLiquidities[position.id] &&
                        BigInt(accountLiquidities[position.id].shortfall) >
                          0n && (
                          <button
                            className={styles.liquidateButton}
                            onClick={() => handleLiquidate(position)}
                            disabled={!address || loadingPositions[position.id]}
                            style={{
                              opacity: address ? 1 : 0.5,
                              cursor: address ? "pointer" : "not-allowed",
                            }}
                          >
                            {loadingPositions[position.id]
                              ? "Loading..."
                              : "Liquidate"}
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
                    {!address ? (
                      <>
                        <Text font="proto_mono" size={isMobile ? "md" : "lg"}>
                          PLEASE CONNECT YOUR WALLET
                        </Text>
                        <Spacer height="20px" />
                        <ConnectButton />
                      </>
                    ) : (
                      <Text font="proto_mono" size={isMobile ? "md" : "lg"}>
                        NO POSITIONS FOUND
                      </Text>
                    )}
                  </Container>,
                ]
          }
        />
      </div>
    </div>
  );
}
