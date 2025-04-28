// routes.ts
import type { Address } from "viem";
import {
  atomAddress as ATOM,
  ethAddress as ETH,
  noteAddress as NOTE,
  usdcAddress as USDC,
  usdtAddress as USDT,
  wCantoAddress as WCANTO,
} from "./addresses";

export interface RouteLeg {
  from: Address;
  to: Address;
  stable: boolean;
}

/* ------------------------------------------------------------------ */
/* 1-hop routes (direct pools)                                         */
/* ------------------------------------------------------------------ */
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
export const ROUTE_WCANTO_CANTO: RouteLeg[] = []; // unwrap
export const ROUTE_CANTO_WCANTO: RouteLeg[] = []; // wrap

/* ------------------------------------------------------------------ */
/* 2-hop routes via NOTE (stable pool on the second leg)               */
/* ------------------------------------------------------------------ */
export const ROUTE_CANTO_USDC: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false }, // WCANTO/NOTE volatile
  { from: NOTE, to: USDC, stable: true }, // NOTE/USDC  stable
];

export const ROUTE_CANTO_USDT: RouteLeg[] = [
  { from: WCANTO, to: NOTE, stable: false }, // WCANTO/NOTE volatile
  { from: NOTE, to: USDT, stable: true }, // NOTE/USDT  stable
];

/* reverse 2-hop paths */
export const ROUTE_USDC_CANTO: RouteLeg[] = [...ROUTE_CANTO_USDC]
  .reverse()
  .map((l) => {
    return {
      from: l.to,
      to: l.from,
      stable: l.stable,
    };
  });

export const ROUTE_USDT_CANTO: RouteLeg[] = [...ROUTE_CANTO_USDT]
  .reverse()
  .map((l) => {
    return {
      from: l.to,
      to: l.from,
      stable: l.stable,
    };
  });

/* ------------------------------------------------------------------ */
/* Export table -- keys are lower-case “from-to”                       */
/* ------------------------------------------------------------------ */
export const HARD_CODED_ROUTES: Record<string, RouteLeg[]> = {
  /* ---- USDC ---- */
  "canto-usdc": ROUTE_CANTO_USDC,
  "usdc-canto": ROUTE_USDC_CANTO,

  /* ---- USDT ---- */
  "canto-usdt": ROUTE_CANTO_USDT,
  "usdt-canto": ROUTE_USDT_CANTO,

  /* ---- ATOM ---- */
  "canto-atom": ROUTE_CANTO_ATOM,
  "atom-canto": ROUTE_ATOM_CANTO,

  /* ---- NOTE ---- */
  "canto-note": ROUTE_CANTO_NOTE,
  "note-canto": ROUTE_NOTE_CANTO,

  /* ---- ETH ---- */
  "canto-eth": ROUTE_CANTO_ETH,
  "eth-canto": ROUTE_ETH_CANTO,

  "canto-wcanto": ROUTE_CANTO_WCANTO, // wrap (deposit)
  "wcanto-canto": ROUTE_WCANTO_CANTO,
};
