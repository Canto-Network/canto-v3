import type { Address } from "viem";
import {
  wCantoAddress as WCANTO,
  noteAddress as NOTE,
  atomAddress as ATOM,
  ethAddress as ETH,
  usdcAddress as USDC,
  usdtAddress as USDT,
} from "./addresses";

export interface RouteLeg {
  from: Address;
  to: Address;
  stable: boolean;
}

export const ROUTE_CANTO_NOTE: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
];
export const ROUTE_CANTO_ATOM: RouteLeg[] = [
  { from: WCANTO, to: ATOM, stable: false },
];
export const ROUTE_CANTO_ETH: RouteLeg[] = [
  { from: WCANTO, to: ETH, stable: false },
];

export const ROUTE_ATOM_CANTO: RouteLeg[] = [
  { from: ATOM, to: WCANTO, stable: false },
];
export const ROUTE_NOTE_CANTO: RouteLeg[] = [
  { from: NOTE, to: WCANTO, stable: false },
];
export const ROUTE_ETH_CANTO: RouteLeg[] = [
  { from: ETH, to: WCANTO, stable: false },
];

export const ROUTE_WCANTO_NOTE: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
];
export const ROUTE_NOTE_WCANTO = ROUTE_WCANTO_NOTE.map(
  ({ from, to, stable }) => ({
    from: to,
    to: from,
    stable,
  })
);

export const ROUTE_WCANTO_ATOM: RouteLeg[] = [
  { from: WCANTO, to: ATOM, stable: false },
];
export const ROUTE_ATOM_WCANTO = ROUTE_WCANTO_ATOM.map(
  ({ from, to, stable }) => ({
    from: to,
    to: from,
    stable,
  })
);

export const ROUTE_WCANTO_ETH: RouteLeg[] = [
  { from: WCANTO, to: ETH, stable: false },
];
export const ROUTE_ETH_WCANTO = ROUTE_WCANTO_ETH.map(
  ({ from, to, stable }) => ({
    from: to,
    to: from,
    stable,
  })
);

export const ROUTE_WCANTO_USDC: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
  { from: NOTE, to: USDC, stable: true },
];
export const ROUTE_USDC_WCANTO = ROUTE_WCANTO_USDC.slice()
  .reverse()
  .map(({ from, to, stable }) => ({
    from: to,
    to: from,
    stable,
  }));

export const ROUTE_WCANTO_USDT: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
  { from: NOTE, to: USDT, stable: true },
];
export const ROUTE_USDT_WCANTO = ROUTE_WCANTO_USDT.slice()
  .reverse()
  .map(({ from, to, stable }) => ({
    from: to,
    to: from,
    stable,
  }));

export const ROUTE_CANTO_USDC: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
  { from: NOTE, to: USDC, stable: true },
];

export const ROUTE_CANTO_USDT: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false },
  { from: NOTE, to: USDT, stable: true },
];

export const ROUTE_USDC_CANTO = [...ROUTE_CANTO_USDC]
  .reverse()
  .map(({ from, to, stable }) => ({ from: to, to: from, stable }));
export const ROUTE_USDT_CANTO = [...ROUTE_CANTO_USDT]
  .reverse()
  .map(({ from, to, stable }) => ({ from: to, to: from, stable }));

const viaWcanto = (src: Address, dst: Address): RouteLeg[] => [
  { from: src, to: WCANTO, stable: false },
  { from: WCANTO, to: dst, stable: false },
];

const stableToNon = (stable: Address, non: Address): RouteLeg[] => [
  { from: stable, to: NOTE, stable: true },
  { from: NOTE, to: WCANTO, stable: false },
  { from: WCANTO, to: non, stable: false },
];

const nonToStable = (non: Address, stable: Address): RouteLeg[] => [
  { from: non, to: WCANTO, stable: false },
  { from: WCANTO, to: NOTE, stable: false },
  { from: NOTE, to: stable, stable: true },
];

export const HARD_CODED_ROUTES: Record<string, RouteLeg[]> = {
  /* ---- CANTO versus tokens ---- */
  "canto-usdc": ROUTE_CANTO_USDC,
  "usdc-canto": ROUTE_USDC_CANTO,
  "canto-usdt": ROUTE_CANTO_USDT,
  "usdt-canto": ROUTE_USDT_CANTO,
  "canto-atom": ROUTE_CANTO_ATOM,
  "atom-canto": ROUTE_ATOM_CANTO,
  "canto-note": ROUTE_CANTO_NOTE,
  "note-canto": ROUTE_NOTE_CANTO,
  "canto-eth": ROUTE_CANTO_ETH,
  "eth-canto": ROUTE_ETH_CANTO,

  "wcanto-note": ROUTE_WCANTO_NOTE,
  "note-wcanto": ROUTE_NOTE_WCANTO,
  "wcanto-atom": ROUTE_WCANTO_ATOM,
  "atom-wcanto": ROUTE_ATOM_WCANTO,
  "wcanto-eth": ROUTE_WCANTO_ETH,
  "eth-wcanto": ROUTE_ETH_WCANTO,
  "wcanto-usdc": ROUTE_WCANTO_USDC,
  "usdc-wcanto": ROUTE_USDC_WCANTO,
  "wcanto-usdt": ROUTE_WCANTO_USDT,
  "usdt-wcanto": ROUTE_USDT_WCANTO,
};

HARD_CODED_ROUTES["note-usdc"] = [{ from: NOTE, to: USDC, stable: true }];
HARD_CODED_ROUTES["usdc-note"] = [{ from: USDC, to: NOTE, stable: true }];

HARD_CODED_ROUTES["note-usdt"] = [{ from: NOTE, to: USDT, stable: true }];
HARD_CODED_ROUTES["usdt-note"] = [{ from: USDT, to: NOTE, stable: true }];

HARD_CODED_ROUTES["note-atom"] = viaWcanto(NOTE, ATOM);
HARD_CODED_ROUTES["atom-note"] = viaWcanto(ATOM, NOTE);

HARD_CODED_ROUTES["note-eth"] = viaWcanto(NOTE, ETH);
HARD_CODED_ROUTES["eth-note"] = viaWcanto(ETH, NOTE);

HARD_CODED_ROUTES["atom-eth"] = viaWcanto(ATOM, ETH);
HARD_CODED_ROUTES["eth-atom"] = viaWcanto(ETH, ATOM);

HARD_CODED_ROUTES["usdc-atom"] = stableToNon(USDC, ATOM);
HARD_CODED_ROUTES["atom-usdc"] = nonToStable(ATOM, USDC);

HARD_CODED_ROUTES["usdt-atom"] = stableToNon(USDT, ATOM);
HARD_CODED_ROUTES["atom-usdt"] = nonToStable(ATOM, USDT);

HARD_CODED_ROUTES["usdc-eth"] = stableToNon(USDC, ETH);
HARD_CODED_ROUTES["eth-usdc"] = nonToStable(ETH, USDC);

HARD_CODED_ROUTES["usdt-eth"] = stableToNon(USDT, ETH);
HARD_CODED_ROUTES["eth-usdt"] = nonToStable(ETH, USDT);

HARD_CODED_ROUTES["usdc-usdt"] = [
  { from: USDC, to: NOTE, stable: true },
  { from: NOTE, to: USDT, stable: true },
];
HARD_CODED_ROUTES["usdt-usdc"] = [
  { from: USDT, to: NOTE, stable: true },
  { from: NOTE, to: USDC, stable: true },
];
