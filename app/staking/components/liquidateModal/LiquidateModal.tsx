import Button from "@/components/button/button";
import Container from "@/components/container/container";
import Spacer from "@/components/layout/spacer";
import Modal from "@/components/modal/modal";
import Text from "@/components/text";
import { CLM_TOKENS } from "@/config/consts/addresses";
import { displayAmount, formatBalance } from "@/utils/formatting";
import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { readContract } from "wagmi/actions";
import { ERC20_ABI } from "@/config/abis";
import { parseUnits } from "viem";

interface Props {
  open: boolean;
  onClose: () => void;
  position: any;
  onClick: any;
  loading: boolean;
}

const LiquidateModal = ({
  open,
  onClose,
  position,
  onClick,
  loading,
}: Props) => {
  const [percentage, setPercentage] = useState(0); // Slider percentage (0-100)
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  // Memoized value for token decimals
  const tokenDecimals = useMemo(() => {
    return (
      CLM_TOKENS.find(
        (token) =>
          token.id.toLowerCase() === position?.market?.id?.toLowerCase()
      )?.decimals ?? 18
    );
  }, [position?.market?.id]);

  // Memoized value for maxRepayAmount
  const maxRepayAmount = useMemo(() => {
    const borrowed = position?.totalUnderlyingBorrowed ?? "0";
    const borrowedAmount = formatBalance(borrowed, tokenDecimals);
    // Max repay amount is 90% of borrowed amount
    return (Number(borrowedAmount) * 90) / 100;
  }, [position?.totalUnderlyingBorrowed, tokenDecimals]);

  // Selected amount based on slider percentage
  const selectedAmount = useMemo(() => {
    return (maxRepayAmount * Number(percentage)) / 100;
  }, [maxRepayAmount, percentage]);

  const fetchBalance = async () => {
    const tokenAddress = position?.market?.id?.toLowerCase() as `0x${string}`;
    const tokenDecimals =
      CLM_TOKENS.find(
        (token) => token.id.toLowerCase() === position.market.id.toLowerCase()
      )?.decimals ?? 18;

    const balance = await readContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    });
    setBalance(Number(balance) / 10 ** tokenDecimals);
  };

  useEffect(() => {
    if (position?.market?.id) {
      fetchBalance();
    }
  }, [position]);

  return (
    <Modal open={open} onClose={onClose}>
      <Container
        width="100%"
        center={{ horizontal: true }}
        style={{ margin: "30px 0", alignItems: "center", padding: "0 20px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            width: "100%",
            marginTop: "-10px",
          }}
        >
          <Text font="proto_mono" size="lg">
            LIQUIDATE POSITION
          </Text>
        </div>
        <Spacer height="20px" />
        <div
          style={{
            background: "#1E1E1E",
            height: "170px",
            width: "100%",
            borderTop: "2px solid #969696",
          }}
        >
          <Spacer height="20px" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <Text font="proto_mono" size="sm">
              BORROWER ADDRESS
            </Text>
            <Text font="proto_mono" size="sm">
              {`${position?.account?.id?.slice(
                0,
                4
              )}...${position?.account?.id?.slice(-5)}`}
            </Text>
          </div>
          <Spacer height="10px" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <Text font="proto_mono" size="sm">
              MARKET
            </Text>
            <Text font="proto_mono" size="sm">
              {position?.market?.name}
            </Text>
          </div>
          <Spacer height="10px" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <Text font="proto_mono" size="sm">
              BORROWED AMOUNT
            </Text>
            <Text font="proto_mono" size="sm">
              {displayAmount(position?.storedBorrowBalance, tokenDecimals, {
                precision: 2,
              })}
            </Text>
          </div>
          <Spacer height="10px" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
          >
            <Text font="proto_mono" size="sm">
              YOUR BALANCE
            </Text>
            <Text font="proto_mono" size="sm">
              {balance > 0 ? balance?.toFixed(3) : balance}
            </Text>
          </div>
        </div>
        <Spacer height="20px" />
        <div
          style={{
            width: "100%",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
        >
          <div style={{ paddingBottom: "10px" }}>
            <Text font="proto_mono" size="sm">
              SELECT LIQUIDATION AMOUNT
            </Text>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            style={{
              width: "100%",
              background: `linear-gradient(to right, #06FC99 0%, #06FC99 ${percentage}%, #727272 ${percentage}%, #727272 100%)`,
              WebkitAppearance: "none",
              height: "5px",
              borderRadius: "5px",
              outline: "none",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "5px",
            }}
          >
            <Text font="proto_mono" size="x-sm">
              0%
            </Text>
            <Text font="proto_mono" size="x-sm">
              50%
            </Text>
            <Text font="proto_mono" size="x-sm">
              Max
            </Text>
          </div>
        </div>
        <Spacer height="20px" />
        <div
          style={{
            background: "#1E1E1E",
            height: "55px",
            width: "100%",
            borderTop: "2px solid #969696",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "20px",
              paddingLeft: "20px",
              marginTop: "13px",
            }}
          >
            <Text font="proto_mono" size="sm">
              SELECTED AMOUNT
            </Text>
            <Text font="proto_mono" size="sm">
              {displayAmount(String(selectedAmount), tokenDecimals, {
                precision: 12,
              })}
            </Text>
          </div>
        </div>
        <Spacer height="20px" />
        <div style={{ width: "100%" }}>
          <Button
            disabled={
              selectedAmount === 0 ||
              Number(selectedAmount) / 10 ** tokenDecimals > balance
            }
            onClick={() =>
              onClick(
                position,
                parseUnits(
                  selectedAmount.toLocaleString("fullwide", {
                    useGrouping: false,
                  }),
                  tokenDecimals
                )
              )
            }
            width="fill"
          >
            {loading ? "LOADING..." : "LIQUIDATE"}
          </Button>
        </div>
      </Container>

      {/* Custom styles for the input slider */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          background: #06fc99;
          cursor: pointer;
          border-radius: 50%;
          margin-top: -2px; /* Centers the thumb vertically */
        }
        input[type="range"]::-moz-range-thumb {
          width: 15px;
          height: 15px;
          background: #06fc99;
          cursor: pointer;
          border-radius: 50%;
        }
        input[type="range"]::-ms-thumb {
          width: 15px;
          height: 15px;
          background: #06fc99;
          cursor: pointer;
          border-radius: 50%;
        }
        /* Hide the default track */
        input[type="range"]::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
        }
        input[type="range"]::-ms-track {
          background: transparent;
        }
      `}</style>
    </Modal>
  );
};

export default LiquidateModal;
