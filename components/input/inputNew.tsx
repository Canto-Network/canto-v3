import styles from "./inputNew.module.scss";
import Text from "../text";
import clsx from "clsx";
import Icon from "../icon/icon";
import { displayAmount, formatBalance } from "@/utils/formatting";
import Button from "../button/button";
import Container from "../container/container";
import { Validation } from "@/config/interfaces";
import { validateNonWeiUserInputTokenAmount } from "@/utils/math";
import { useState } from "react";
import Analytics from "@/provider/analytics";

type InputProps = {
  children?: React.ReactNode;
  category?: "bridge" | "pools" | "lending";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, max?: boolean) => void;
  backgroundColor?: string;
  height?: "sm" | "md" | "lg" | number;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  name?: string;
  id?: string;
  maxLength?: number;
  min?: string;
  max?: string;
  step?: number;
  required?: boolean;
  maxWidth?: number;
} & (
  | {
      type: "amount";
      balance: string;
      decimals: number;
      tokenMin: string;
      tokenMax: string;
    }
  | {
      type: "text" | "search" | "number";
    }
) &
  (
    | {
        category: "bridge";
      }
    | {
        category: "pools";
        IconURL: string;
        name: string;
        limit?: {
          limitName: string;
          limit: string;
        };
      }
    | {
        category: "lending";
        IconURL: string;
        name: string;
        limit?: {
          limitName: string;
          limit: string;
        };
      }
  );

const InputNew = (props: InputProps) => {
  const [focused, setFocused] = useState(false);

  function commify(str: string) {
    const parts = str.split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "")
    );
  }
  function formatAmount(amount: string, decimals: number) {
    const parts = amount.split(".");
    if (parts.length === 1) {
      return amount;
    }
    const decimalsPart = parts[1];
    if (decimalsPart.length > decimals) {
      return `${parts[0]}.${decimalsPart.slice(0, decimals)}~`;
    }
    return amount;
  }
  function displayAmountUptoDecimals(amount: string, decimals: number) {
    return formatAmount(commify(amount), decimals);
  }
  function commify2(str: string) {
    if (str[0] == ".") {
      return (str = "" + str);
    }
    if (str[str.length - 1] == ".") {
      return commify(str.slice(0, str.length - 1)) + ".";
    }

    const parts = str.split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "")
    );
  }
  const inputError: Validation =
    props.type === "amount" && props.value
      ? validateNonWeiUserInputTokenAmount(
          props.value,
          props.tokenMin,
          props.tokenMax,
          "",
          props.decimals
        )
      : { error: false };
  return (
    <div
      className={styles["input-container"]}
      style={{
        height: 64,
        maxWidth: props.maxWidth ?? undefined,
      }}
    >
      <div className={styles["label2"]}>
        <label
          htmlFor={props.id}
          className={props.labelClassName}
          style={props.labelStyle}
        >
          <Text font="rm_mono" size="sm">
            {props.label}
            {props.type === "amount" && (
              <span className={styles["balance"]}>
                BAL: {displayAmount(props.balance, props.decimals)}
              </span>
            )}
          </Text>
        </label>
      </div>
      {props.category == "pools" && (
        <Container
          direction="row"
          gap={8}
          center={{
            vertical: true,
          }}
          className={styles["selector"]}
        >
          <Icon
            icon={{
              url: props.IconURL,
              size: 32,
            }}
          />
          <Text font="proto_mono">{props.name}</Text>
        </Container>
      )}
      <Container direction="row" center={{ vertical: true }} gap={16}>
        {props.children ? (
          <div className={styles["selector"]}>{props.children}</div>
        ) : (
          <></>
        )}

        <section>
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            type={props.type}
            value={
              props.category == "bridge"
                ? props.value
                : focused
                  ? commify2(props.value)
                  : displayAmountUptoDecimals(props.value, 4)
            }
            onChange={
              props.type === "amount"
                ? (e) => {
                    if (
                      e.target.value === "" ||
                      e.target.value.match(/^\d*\.?\d*$/)
                    ) {
                      props.onChange(e);
                    }
                  }
                : props.onChange
            }
            placeholder={props.placeholder}
            className={clsx(props.className)}
            disabled={props.disabled}
            name={props.name}
            id={props.id}
            maxLength={props.maxLength}
            min={props.min}
            max={props.max}
            step={props.step}
            required={props.required}
            autoComplete="off"
            style={{
              textAlign: "left",
              height: props.height ? props.height : 64,
              backgroundColor: props.error
                ? " #ff000017"
                : props.backgroundColor ?? "",
              border: props.error
                ? "1px solid var(--extra-failure-color, #ff0000)"
                : "",
              ...props.style,
              fontFamily: "var(--rm-mono)",
              fontSize: props.type === "amount" ? "1.5rem" : "1rem",
            }}
          />
          {props.type === "search" && (
            <Icon
              icon={{
                url: "/search.svg",
              }}
              className={styles["search-icon"]}
            />
          )}
        </section>
      </Container>
      {props.type === "amount" && (
        <div className={styles["max-button"]}>
          <Button
            borderRadius={4}
            onClick={
              props.category == "bridge"
                ? () => {
                    props.onChange({
                      target: {
                        value: formatBalance(props.tokenMax, props.decimals, {
                          precision: props.decimals,
                        }),
                      },
                    } as any);
                  }
                : () => {
                    Analytics.actions.events.maxClicked("Max Button");
                    props.onChange(
                      {
                        target: {
                          value: formatBalance(
                            props.limit?.limit ?? props.max ?? "0",
                            props.decimals,
                            {
                              precision: props.decimals,
                            }
                          ),
                        },
                      } as any,
                      true
                    );
                  }
            }
            height={32}
            color="secondary"
            shadow="none"
            padding={8}
          >
            <Text size="xx-sm">&nbsp; MAX &nbsp;</Text>
          </Button>
        </div>
      )}
      <span
        className={styles["error-message"]}
        style={{
          opacity: props.error || inputError.error ? 1 : 0,
        }}
      >
        {inputError.error ? inputError.reason : props.errorMessage}
      </span>
    </div>
  );
};

export default InputNew;
