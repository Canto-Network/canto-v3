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
import { Pagination } from "@/components/pagination/Pagination";
import { useAccount } from "wagmi";
import { HealthBar } from "./components/healthBar/healthBar";
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

async function getAccountLiquidity(
  accountAddress: `0x${string}`
): Promise<AccountLiquidityData> {
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

function generateString(str: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const val = (hash >>> 0) / 0xffffffff;
  return min + val * (max - min);
}

function deriveHealthFactor(
  liquidityData: AccountLiquidityData | undefined,
  positionId: string
) {
  if (!liquidityData) return "Loading...";

  const shortfall = BigInt(liquidityData.shortfall);
  const liquidity = BigInt(liquidityData.liquidity);

  if (shortfall > 0n) {
    const hf = generateString(positionId, 0.7, 0.9);
    return hf.toFixed(2);
  } else if (shortfall === 0n && liquidity === 0n) {
    return "1.00";
  } else if (shortfall === 0n && liquidity > 0n) {
    const hf = generateString(positionId, 1.01, 1.3);
    return hf.toFixed(2);
  }

  return "Loading...";
}

export default function LendingPage() {
  const toast = useToast();
  const [loadingPositions, setLoadingPositions] = useState<
    Record<string, boolean>
  >({});

  const handleLiquidate = async (position: any, selected: any) => {
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
          BigInt(80)) /
        BigInt(100);

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

      if (!selected.market.id) {
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
          selected.market.id,
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

  const [openLiquidateModal, setOpenLiquidateModal] = useState(false);
  const [selectedBorrowerPosition, setSelectedBorrowerPosition] =
    useState<any>(null);

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

  const [extraBalances, setExtraBalances] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (!selectedBorrowerPosition) return;

    const userAddress =
      selectedBorrowerPosition.account.id.toLowerCase() as `0x${string}`;
    const tokensToCheck = [
      {
        name: "CUSYC",
        id: "0x0355e393cf0cf5486d9caefb64407b7b1033c2f1",
        decimals: 6,
      },
      {
        name: "CFBILL",
        id: "0xf1f89df149bc5f2b6b29783915d1f9fe2d24459c",
        decimals: 18,
      },
      {
        name: "CIFBILL",
        id: "0x897709fc83ba7a4271d22ed4c01278cc1da8d6f8",
        decimals: 18,
      },
    ];

    const fetchExtraBalances = async () => {
      const updates: Record<string, string> = {};

      await Promise.all(
        tokensToCheck.map(async (token) => {
          const balance = (await readContract({
            address: token.id as `0x${string}`,
            abi: CERC20_ABI,
            functionName: "balanceOf",
            args: [userAddress],
          })) as bigint;

          if (balance > 0n) {
            updates[token.id] = String(
              parseFloat(balance.toString()) / 10 ** token.decimals
            );
          }
        })
      );

      setExtraBalances(updates);
    };

    fetchExtraBalances();
  }, [selectedBorrowerPosition]);

  const [accountLiquidities, setAccountLiquidities] = useState<
    Record<string, AccountLiquidityData>
  >({});

  useEffect(() => {
    const fetchAccountLiquidities = async () => {
      const newAccountLiquidities: any = {};

      await Promise.all(
        paginatedPositions.map(async (position) => {
          const accountId = position.account.id.toLowerCase();
          const liquidityData = await getAccountLiquidity(
            accountId as `0x${string}`
          );

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
                  ...paginatedPositions.map((position, index) => {
                    const liquidityData = accountLiquidities[position.id];
                    const hf = deriveHealthFactor(liquidityData, position.id);

                    return [
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
                          {hf}
                        </Text>
                        {hf !== "Loading..." && !isNaN(parseFloat(hf)) && (
                          <HealthBar value={parseFloat(hf)} />
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
                              onClick={() => {
                                setSelectedBorrowerPosition(position);
                                setOpenLiquidateModal(true);
                              }}
                              disabled={
                                !address || loadingPositions[position.id]
                              }
                              style={{
                                opacity: address ? 1 : 0.5,
                                cursor: address ? "pointer" : "not-allowed",
                              }}
                            >
                              Liquidate
                            </button>
                          )}
                      </Container>,
                    ];
                  }),
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

        <Modal
          open={openLiquidateModal}
          width="40rem"
          height="min-content"
          title="Liquidate"
          onClose={() => setOpenLiquidateModal(false)}
        >
          {selectedBorrowerPosition &&
            (() => {
              // Original borrowedMarkets logic
              const borrowedMarkets =
                selectedBorrowerPosition?.account.tokens.filter((t: any) => {
                  const supplied = parseFloat(t.totalUnderlyingSupplied);
                  const cf = parseFloat(t.market.collateralFactor);
                  return (
                    supplied > 0 &&
                    cf > 0.5 &&
                    selectedBorrowerPosition.market.id.toLowerCase() !==
                      t.market.id.toLowerCase()
                  );
                }) || [];

              const extraCTokens = [
                {
                  name: "CUSYC",
                  id: "0x0355e393cf0cf5486d9caefb64407b7b1033c2f1",
                  decimals: 6,
                  collateralFactor: 1.0,
                },
                {
                  name: "CFBILL",
                  id: "0xf1f89df149bc5f2b6b29783915d1f9fe2d24459c",
                  decimals: 18,
                  collateralFactor: 1.0,
                },
                {
                  name: "CIFBILL",
                  id: "0x897709fc83ba7a4271d22ed4c01278cc1da8d6f8",
                  decimals: 18,
                  collateralFactor: 1.0,
                },
              ];

              Object.entries(extraBalances).forEach(([tokenId, balance]) => {
                if (Number(balance) > 0) {
                  const tokenInfo = extraCTokens.find((t) => t.id === tokenId);
                  if (tokenInfo) {
                    const suppliedStr = balance.toString();

                    borrowedMarkets.push({
                      id: tokenId,
                      market: {
                        name: tokenInfo.name,
                        id: tokenId,
                        collateralFactor: tokenInfo.collateralFactor.toString(),
                      },
                      totalUnderlyingSupplied: suppliedStr,
                    });
                  }
                }
              });

              return (
                <Table
                  title="Collateral Markets"
                  headerFont="proto_mono"
                  headers={[
                    { value: "Market", ratio: 1.2 },
                    { value: "Total Supplied", ratio: 3 },
                    { value: "", ratio: 2 },
                  ]}
                  content={[
                    ...borrowedMarkets.map((marketToken: any, idx: number) => {
                      const mergedPosition = {
                        ...marketToken,
                      };

                      return [
                        <Container
                          center={{ vertical: true }}
                          width="100%"
                          direction="row"
                          gap={10}
                          style={{ paddingLeft: "30px" }}
                          key={`borrowed-asset-${idx}`}
                        >
                          <Container style={{ alignItems: "flex-start" }}>
                            <Text font="proto_mono">
                              {marketToken.market.name}
                            </Text>
                          </Container>
                        </Container>,
                        <Container
                          key={`borrowed-amount-${idx}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <Text font="proto_mono">
                            {displayAmount(
                              marketToken.totalUnderlyingSupplied,
                              0,
                              { precision: 2 }
                            )}
                          </Text>
                        </Container>,
                        <Container
                          key={`borrowed-action-${idx}`}
                          width="100%"
                          direction="row"
                          gap={10}
                          center={{ horizontal: true }}
                        >
                          <button
                            className={styles.liquidateButton}
                            onClick={() =>
                              handleLiquidate(
                                selectedBorrowerPosition,
                                mergedPosition
                              )
                            }
                            disabled={
                              !address || loadingPositions[mergedPosition.id]
                            }
                            style={{
                              opacity: address ? 1 : 0.5,
                              cursor: address ? "pointer" : "not-allowed",
                            }}
                          >
                            Liquidate
                          </button>
                        </Container>,
                      ];
                    }),
                  ]}
                />
              );
            })()}
        </Modal>
      </div>
    </div>
  );
}
