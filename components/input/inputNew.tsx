import styles from "./inputNew.module.scss";
import Text from "../text";
import clsx from "clsx";
import Icon from "../icon/icon";
import { displayAmount, formatBalance } from "@/utils/formatting";
import Button from "../button/button";
import Container from "../container/container";
import { Validation } from "@/config/interfaces";
import { validateNonWeiUserInputTokenAmount } from "@/utils/math";

type InputProps = {
  children?: React.ReactNode;
  category?: "bridge" | "pools" | "lending";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
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
);

const InputNew = (props: InputProps) => {
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
      <Container direction="row" center={{ vertical: true }} gap={16}>
        {props.children ? (
          <div className={styles["selector"]}>{props.children}</div>
        ) : (
          <></>
        )}

        <section>
          <input
            type={props.type}
            value={props.value}
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
            onClick={() => {
              props.onChange({
                target: {
                  value: formatBalance(props.tokenMax, props.decimals, {
                    precision: props.decimals,
                  }),
                },
              } as any);
            }}
            height={32}
            color="secondary"
            shadow="none"
          >
            MAX
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
